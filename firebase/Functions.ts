import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth';
import { 
    getFirestore, 
    doc,
    setDoc,
    getDoc,
    updateDoc,
    increment,
    Timestamp 
} from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { MsgProvider } from '../helpers/Alerts';
import { DB_Mode, regemail } from '../helpers/Constants';
import { Gyms, User } from './Schemas/userSchema';
import { RState } from '../types/RState';
import { RRelationshipOptions } from '../types/RUser';
import useGyms from './useGyms';
import { onLogout, UserDetails } from '../redux/Actions';
import { getPersonalRecords } from '../utils/liftingCalculations';

const useFunctions = () => {
    const { fcm } = useSelector(({ platform }: RState) => platform);
    const { handleGymChatRoom } = useGyms();
    const dispatch = useDispatch();
    
    const auth = getAuth();
    const db = getFirestore();

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: 'YOUR_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        // Remove webClientId if not using web
    });

    const handleSignUp = useCallback(async (profilePicture: string|null, name: string, username: string, email: string, relationStatus: RRelationshipOptions, password: string, confirm: string, isGoogleSignIn: boolean, setLoading: any) => {
        const showError = (message: string) => {
            MsgProvider.showError(message);
            return true;
        };
        
        if (!isGoogleSignIn) {
            const validations = [
                { condition: name === '', message: 'Please enter your name.' },
                { condition: username === '', message: 'Please enter your username.' },
                { condition: email === '', message: 'Please enter your email.' },
                { condition: !regemail.test(email), message: 'Invalid email address.' },
                { condition: password === '', message: 'Please enter your password.' },
                { condition: password.length < 8, message: 'Password should be minimum 8 characters.' },
                { condition: confirm === '', message: 'Please confirm your password.' },
                { condition: password !== confirm, message: `Password doesn't match.` },
            ];

            for (const { condition, message } of validations) {
                if (condition && showError(message)) return false;
            }
        }
        
        try {
            setLoading(true);
            
            let userCredential;
            if (!isGoogleSignIn) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = { user: auth.currentUser };
            }

            if (!userCredential.user) throw new Error('No user created');

            const newUser = new User({
                Created: new Date(),
                userInfo: {
                    userId: userCredential.user.uid,
                    userName: `@${username}`,
                    name: name,
                    email: userCredential.user.email || '',
                    emailVerified: userCredential.user.emailVerified,
                    phoneNumber: userCredential.user.phoneNumber || '',
                    profilePhoto: profilePicture,
                    coverPhoto: '',
                    about: '',
                    fcm: fcm,
                    isAccountDel: false,
                    reportedBy: [],
                    isReported: 0,
                    followers: [],
                    following: [],
                    blockedBy: [],
                    blockedTo: [],
                    gyms: [],
                    relationStatus: relationStatus,
                    seenStories: [],
                    tokens: 3,
                    isPrivate: false,
                    isGymOwner: false
                }
            });

            await setDoc(
                doc(db, `${DB_Mode}_Users`, userCredential.user.uid),
                newUser
            );

            MsgProvider.showSuccess('Account created Successfully 🎉');

            if (!isGoogleSignIn) {
                await handleSignIn(email, password, setLoading);
            } else {
                dispatch(UserDetails(newUser.UserDetails));
                router.replace('/dashboard');
            }
        } catch (error: any) {
            setLoading(false);
            console.log('Error signing up:', error?.message);
            MsgProvider.showError(error?.message);
        }
    }, []);

    const handleGoogleSignIn = useCallback(async (setLoading: (loading: boolean) => void) => {
        try {
            setLoading(true);
            
            const result = await promptAsync();
            if (result?.type !== 'success') {
                throw new Error('Google sign in was cancelled or failed');
            }
            
            const { id_token } = result.params;
            const credential = GoogleAuthProvider.credential(id_token);
            const userCredential = await signInWithCredential(auth, credential);
            
            const userDoc = await getDoc(doc(db, `${DB_Mode}_Users`, userCredential.user.uid));
            
            if (!userDoc.exists()) {
                router.push({
                    pathname: '/registration-continued',
                    params: {
                        name: userCredential.user.displayName || '',
                        email: userCredential.user.email || '',
                        password: id_token,
                        isGoogleSignIn: true,
                        photoUrl: userCredential.user.photoURL
                    }
                });
                return { success: true };
            }
            
            await updateDoc(doc(db, `${DB_Mode}_Users`, userCredential.user.uid), {
                'UserDetails.userInfo.fcm': fcm
            });
            
            dispatch(UserDetails(userDoc.data()?.UserDetails));
            router.replace('/dashboard');
            
            return { success: true };
        } catch (error: any) {
            console.error('Google sign-in error:', error);
            MsgProvider.showError(error?.message || 'Failed to sign in with Google');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [fcm]);

    const handleSignIn = useCallback(async (email: string, password: string, setLoading: any) => {
        if (!email) {
            MsgProvider.showError('Please enter your email.');
            return false;
        }

        if (!regemail.test(email)) {
            MsgProvider.showError('Invalid email address.');
            return false;
        }

        if (!password) {
            MsgProvider.showError('Please enter your password.');
            return false;
        }

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, `${DB_Mode}_Users`, userCredential.user.uid));

            if (!userDoc.exists()) {
                await handleCreateNewUser(userCredential);
            } else {
                await updateDoc(doc(db, `${DB_Mode}_Users`, userCredential.user.uid), {
                    'UserDetails.userInfo.fcm': fcm
                });
            }

            dispatch(UserDetails(userDoc.data()?.UserDetails));
            router.replace('/dashboard');
            
        } catch (error: any) {
            setLoading(false);
            if (error.code === 'auth/wrong-password') {
                MsgProvider.showError('Invalid Credentials');
            } else if (error.code === 'auth/user-not-found') {
                MsgProvider.showError('No account found with this email.');
            } else {
                MsgProvider.showError('Sign in failed. Please try again.');
            }
        }
    }, []);

    const handleCreateNewUser = async (userCredential: any) => {
        const username = userCredential.user.email.split('@')[0];
        const newUser = new User({
            Created: new Date(),
            userInfo: {
                userId: userCredential.user.uid,
                userName: `@${username}`,
                name: username,
                email: userCredential.user.email,
                emailVerified: userCredential.user.emailVerified,
                phoneNumber: userCredential.user.phoneNumber || '',
                profilePhoto: '',
                coverPhoto: '',
                about: '',
                fcm: fcm,
                isAccountDel: false,
                reportedBy: [],
                isReported: 0,
                followers: [],
                following: [],
                gyms: [],
                blockedBy: [],
                blockedTo: [],
                isPrivate: false,
                relationStatus: 'single',
                seenStories: [],
                isGymOwner: false,
                tokens: 3
            }
        });

        await setDoc(doc(db, `${DB_Mode}_Users`, userCredential.user.uid), newUser);
        return newUser;
    };

    const handleLogout = useCallback(async (setLoading: any) => {
        setLoading(true);
        try {
            await signOut(auth);
            dispatch(onLogout(null));
            setTimeout(() => {
                setLoading(false);
                router.replace('/');
            }, 1500);
        } catch (error) {
            console.error("Error logging out:", error);
            setLoading(false);
        }
    }, []);

    const handleResetPassword = useCallback(async (email: string, setLoading: any) => {
        if (!email) {
            MsgProvider.showError('Please enter your email.');
            return false;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            MsgProvider.showSuccess('Please check your inbox or spam folder to reset your password.');
            router.replace('/login');
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                MsgProvider.showError('No account is registered with this email!');
            } else {
                MsgProvider.showError('Failed to send reset email');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDeleteAccount = useCallback(async (setLoading: any) => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            if (user) {
                await user.delete();
                await updateDoc(doc(db, `${DB_Mode}_Users`, user.uid), {
                    'UserDetails.userInfo.isAccountDel': true,
                });
                await signOut(auth);
                dispatch(onLogout(null));
                MsgProvider.showSuccess('Your account has been deleted.');
                setTimeout(() => {
                    router.replace('/');
                }, 1000);
            }
        } catch (error: any) {
            MsgProvider.showError('Error deleting account');
            console.error('Error deleting account:', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEditProfile = useCallback(async (userId: string | undefined, name: string | undefined, userName: string | undefined, email: string | undefined, about: string | undefined, relationStatus: RRelationshipOptions | undefined, setLoading: any) => {
        if (!userId) {
            MsgProvider.showError('Something went wrong, please try later');
            return false;
        }

        if (!name || !userName || !email) {
            MsgProvider.showError('Please fill in all required fields');
            return false;
        }

        try {
            setLoading(true);
            await updateDoc(doc(db, `${DB_Mode}_Users`, userId), {
                'UserDetails.userInfo.email': email,
                'UserDetails.userInfo.name': name,
                'UserDetails.userInfo.userName': `@${userName}`,
                'UserDetails.userInfo.about': about,
                'UserDetails.userInfo.relationStatus': relationStatus
            });
            MsgProvider.showSuccess('Account details updated successfully!');
        } catch (error: any) {
            console.log('edit details error', error);
            MsgProvider.showError(error?.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGetUserContent = useCallback(async (userId: string | undefined | null) => {
        try {
            if (!userId) return null;
            const userDoc = await getDoc(doc(db, `${DB_Mode}_Users`, userId));
            return userDoc.exists() ? userDoc.data()?.UserDetails as IUser : null;
        } catch (error) {
            console.error('Error getting profile:', error);
            throw error;
        }
    }, []);

    const handleUpdateUserWorkoutStats = useCallback(async (
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        workoutId: string,
        volumeIncrement: number,
        workoutDetails: UseWorkoutPropsAdd
    ) => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, `${DB_Mode}_Users`, user.uid);
                const userDoc = await getDoc(userDocRef);
                const currentWorkoutLogDetails = userDoc.data()?.UserDetails?.userInfo?.workoutLogDetails || {};

                const { updatedRecords, newPRCount } = getPersonalRecords(
                    currentWorkoutLogDetails,
                    workoutDetails.sets
                );

                await updateDoc(userDocRef, {
                    'UserDetails.userInfo.workoutLogDetails.workoutsCompleted': increment(1),
                    'UserDetails.userInfo.workoutLogDetails.totalVolumeCompleted': increment(volumeIncrement),
                    'UserDetails.userInfo.workoutLogDetails.workoutIds': {
                        ...currentWorkoutLogDetails.workoutIds,
                        [workoutId]: workoutId
                    },
                    'UserDetails.userInfo.workoutLogDetails.workoutPersonalRecords': updatedRecords
                });

                if (newPRCount > 0) {
                    MsgProvider.showSuccess(`🎉 Congratulations! You set ${newPRCount} new personal record${newPRCount > 1 ? 's' : ''}!`);
                }
            }
        } catch (error: any) {
            MsgProvider.showError('Error updating workout stats');
            console.error('Error updating workout stats:', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGymOwnerSignup = useCallback(async (
        userDetails: {
            profilePicture: string | null;
            name: string;
            username: string;
            email: string;
            password: string;
        },
        gymDetails: {
            name: string;
            fullAddress: string;
            placeId: string;
            lat: number;
            long: number;
            city: string;
            state: string;
            streetAddress: string;
            zipCode: string;
        },
        setLoading: (loading: boolean) => void
    ) => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
            const userId = userCredential.user.uid;

            const gymDoc = {
                name: gymDetails.name,
                address: gymDetails.fullAddress,
                placeId: gymDetails.placeId,
                lat: gymDetails.lat,
                long: gymDetails.long,
                owners: [userId],
                is_verified: false,
                Created: Timestamp.now(),
                city: gymDetails.city,
                state: gymDetails.state,
                streetAddress: gymDetails.streetAddress,
                zipCode: gymDetails.zipCode
            };

            await setDoc(doc(db, `${DB_Mode}_Gyms`, gymDetails.placeId), gymDoc);

            const gymReference = new Gyms({
                Created: Timestamp.now(),
                placeId: gymDetails.placeId,
                userid: userId,
                title: gymDetails.name,
                address: gymDetails.fullAddress,
                lat: gymDetails.lat,
                long: gymDetails.long,
                id: gymDetails.placeId
            });

            const newUser = new User({
                Created: Timestamp.now(),
                userInfo: {
                    userId,
                    userName: `@${userDetails.username}`,
                    name: userDetails.name,
                    email: userDetails.email,
                    emailVerified: userCredential.user.emailVerified,
                    phoneNumber: '',
                    profilePhoto: userDetails.profilePicture || '',
                    coverPhoto: '',
                    about: '',
                    fcm: fcm || '',
                    isAccountDel: false,
                    reportedBy: [],
                    isReported: 0,
                    followers: [],
                    following: [],
                    blockedBy: [],
                    blockedTo: [],
                    gyms: [gymReference.gym],
                    ownedGyms: [gymDetails.placeId],
                    relationStatus: 'single',
                    seenStories: [],
                    tokens: 3,
                    isPrivate: false,
                    isGymOwner: true
                }
            });

            await setDoc(doc(db, `${DB_Mode}_Users`, userId), newUser);
            await handleGymChatRoom(gymDetails.placeId, gymDetails.name, userId);

            MsgProvider.showSuccess('Gym registered successfully 🎉');
            await handleSignIn(userDetails.email, userDetails.password, setLoading);

        } catch (error: any) {
            console.error('Error in gym owner signup:', error);
            MsgProvider.showError(error?.message || 'Registration failed');
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, [fcm]);


    const handleMockFunction = async () => {

        const newUser = new User({
            Created: new Date(),
            userInfo: {
                userId: '',
                userName: `@`,
                name: '',
                email: '',
                emailVerified: true,
                phoneNumber: '',
                profilePhoto: '',
                coverPhoto: '',
                about: '',
                fcm: fcm,
                isAccountDel: false,
                reportedBy: [],
                isReported: 0,
                followers: [],
                following: [],
                gyms: [],
                blockedBy: [],
                blockedTo: [],
                isPrivate: false,
                relationStatus: 'single',
                seenStories: [],
                isGymOwner: false,
                tokens: 3
            }
        });

        const testString = '';
        await setDoc(doc(db, `${DB_Mode}_TestFunction`, testString), newUser);
    }

    return {
        handleSignUp,
        handleGymOwnerSignup,
        handleSignIn,
        handleResetPassword,
        handleDeleteAccount,
        handleEditProfile,
        handleGetUserContent,
        handleLogout,
        handleUpdateUserWorkoutStats,
        handleGoogleSignIn,
        handleMockFunction
    };
};

export default useFunctions;