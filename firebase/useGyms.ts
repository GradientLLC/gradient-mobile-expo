import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { DB_Mode } from '../helpers/Constants';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RState } from '../types/RState';
import { MessageRoom } from './Schemas/MessageRoomSchema';
import moment from 'moment';
import { MsgProvider } from '../helpers/Alerts';
import { Gyms } from './Schemas/userSchema';
import { IGymDetails } from '../interfaces/IGym';
import { UserDetails } from '../redux/Actions';
import { userRole } from '../interfaces/IUser';

//Build a new notification system
//import NotificationController from './Notifications/NotificationController';

const useGyms = () => {
    const { loggedInUserDetails } = useSelector(({ auth }: RState) => auth);
    const dispatch = useDispatch();
    const db = getFirestore();

    const handleRegisterGym = useCallback(async (gymDetails: IGymDetails, userId: string, setLoading: any) => {
        try {
            setLoading(true);
            const gymRef = doc(db, `${DB_Mode}_Gyms`, gymDetails.placeId);
            const gymDoc = await getDoc(gymRef);
            const gymDocId = gymRef.id;

            if (!gymDoc.exists()) {
                await setDoc(gymRef, {
                    name: gymDetails.name,
                    address: gymDetails.address,
                    placeId: gymDetails.placeId,
                    lat: gymDetails.lat,
                    long: gymDetails.long,
                    owners: [userId],
                    is_verified: false,
                    Created: Timestamp.now()
                });
            } else {
                await updateDoc(gymRef, {
                    owners: arrayUnion(userId)
                });
            }

            const newGym = new Gyms({
                Created: Timestamp.now(),
                placeId: gymDetails.placeId,
                userId: userId,
                title: gymDetails.name,
                address: gymDetails.address,
                lat: String(gymDetails.lat),
                long: String(gymDetails.long),
                id: gymDocId
            });

            await updateDoc(doc(db, `${DB_Mode}_Users`, userId), {
                'UserDetails.userInfo.gyms': arrayUnion(newGym.gym),
                'UserDetails.userInfo.isGymOwner': true,
                'UserDetails.userInfo.ownedGyms': arrayUnion(gymDocId)
            });

            await handleGymChatRoom(gymDetails.placeId, gymDetails.name, userId);
            return true;
        } catch (error) {
            console.error('Error registering gym:', error);
            MsgProvider.showError('Failed to register gym');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGymChatRoom = useCallback(async (roomId: string, name: string, userId: string) => {
        const newRoom = {
            GeneralChat: new MessageRoom({
                Created: Timestamp.now(),
                Expired: false,
                LastOpened: Timestamp.now(),
                ID: roomId,
                Name: name,
                LastMessage: {
                    Milliseconds: moment().valueOf(),
                    SenderID: '',
                    isRead: false,
                    SYSTEM: false,
                    NumChars: 0,
                    Shown: false,
                    DateTime: Timestamp.now(),
                    Body: '',
                    ImagePaths: [],
                    DocPaths: [],
                    isMine: false
                },
                Messages: [],
                Members: [],
            }).MessageRoomDetails,
            AnnouncementsChat: new MessageRoom({
                Created: Timestamp.now(),
                Expired: false,
                LastOpened: Timestamp.now(),
                ID: roomId,
                Name: name,
                LastMessage: {
                    Milliseconds: moment().valueOf(),
                    SenderID: '',
                    isRead: false,
                    SYSTEM: false,
                    NumChars: 0,
                    Shown: false,
                    DateTime: Timestamp.now(),
                    Body: '',
                    ImagePaths: [],
                    DocPaths: [],
                    isMine: false
                },
                Messages: [],
                Members: [],
            }).MessageRoomDetails,
            Name: name,
            ID: roomId,
            Members: [],
            Owners: [userId],
            SubChats: [],
            Admins: [userId],
            Trainers: []
        };

        try {
            const chatRoomRef = doc(db, `${DB_Mode}_Gym_ChatRooms`, roomId);
            const possibleRoom = await getDoc(chatRoomRef);

            if (!possibleRoom.exists()) {
                await setDoc(chatRoomRef, newRoom);
                await updateDoc(chatRoomRef, {
                    Members: arrayUnion(loggedInUserDetails?.userInfo?.userId)
                });
            } else {
                await updateDoc(chatRoomRef, {
                    Members: arrayUnion(loggedInUserDetails?.userInfo?.userId)
                });
            }
        } catch (error) {
            console.error('Error checking room:', error);
        }
    }, [loggedInUserDetails]);

    const getGymChatRoom = useCallback(async (roomId: string) => {
        try {
            const roomRef = doc(db, `${DB_Mode}_Gym_ChatRooms`, roomId);
            const possibleRoom = await getDoc(roomRef);
            return possibleRoom.exists() ? possibleRoom : undefined;
        } catch (error) {
            console.error('Error getting gym room:', error);
        }
    }, []);

    const getGymChatRoomPassword = useCallback(async (roomId: string) => {
        try {
            const room = await getGymChatRoom(roomId);
            return room?.get('password');
        } catch (error) {
            console.error('Error getting gym password:', error);
        }
    }, []);

    const handleAddLocations = useCallback(async (location: any, setIsLoading: any, sheet: any) => {
        try {
            setIsLoading(true);

            const existingGym = loggedInUserDetails?.userInfo?.gyms?.find(
                gym => gym.placeId === location.placeId
            );

            if (existingGym) {
                MsgProvider.showError('You have already joined this gym');
                return;
            }

            const newGym = {
                Created: Timestamp.now(),
                placeId: location.placeId,
                userId: loggedInUserDetails?.userInfo?.userId,
                title: location.name,
                address: location.address || '',
                lat: String(location.lat),
                long: String(location.long)
            };

            await updateDoc(doc(db, `${DB_Mode}_Users`, loggedInUserDetails?.userInfo?.userId), {
                'UserDetails.userInfo.gyms': arrayUnion(newGym)
            });

            dispatch(UserDetails({
                ...loggedInUserDetails,
                userInfo: {
                    ...loggedInUserDetails.userInfo,
                    gyms: [...(loggedInUserDetails?.userInfo?.gyms || []), newGym]
                }
            }));

            await handleGymChatRoom(location.placeId, location.name, loggedInUserDetails?.userInfo.userId ?? '');
            
            //TODO Migrate this to a different controller service
            // await NotificationController.subscribeToTopic(
            //     `${FirebaseTopics.gym}_${location.placeId}`
            // );

            MsgProvider.showSuccess(`You have joined ${location.name} 🎉`);
            sheet?.current?.close();

        } catch (error) {
            console.error('Error adding gym:', error);
            MsgProvider.showError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [loggedInUserDetails, dispatch]);

    const leaveGymGroup = useCallback(async (roomId: string) => {
        try {
            if (!roomId || !loggedInUserDetails?.userInfo?.userId) {
                throw new Error('Missing required information');
            }

            const roomRef = doc(db, `${DB_Mode}_Gym_ChatRooms`, roomId);
            const roomSnapshot = await getDoc(roomRef);
            
            if (!roomSnapshot.exists()) {
                throw new Error('Gym group not found');
            }

            const roomData = roomSnapshot.data();
            const gymName = roomData?.Name;

            await updateDoc(roomRef, {
                Members: arrayUnion(loggedInUserDetails.userInfo.userId)
            });

            const updatedGyms = loggedInUserDetails.userInfo.gyms.filter(
                gym => gym.placeId !== roomId
            );

            await updateDoc(doc(db, `${DB_Mode}_Users`, loggedInUserDetails.userInfo.userId), {
                'UserDetails.userInfo.gyms': updatedGyms
            });

            dispatch(UserDetails({
                ...loggedInUserDetails,
                userInfo: {
                    ...loggedInUserDetails.userInfo,
                    gyms: updatedGyms
                }
            }));

            //TODO Migrate this to a different controller service
            // await NotificationController.unsubscribeFromTopic(
            //     `${FirebaseTopics.gym}_${roomId}`
            // );

            MsgProvider.showSuccess(`You have left ${gymName}`);
            return { success: true };

        } catch (error) {
            console.error('Error leaving gym:', error);
            MsgProvider.showError('Failed to leave gym');
            return { success: false, error: 'Failed to leave gym' };
        }
    }, [loggedInUserDetails, dispatch]);

    const getUserRole = useCallback(async (roomId: string): Promise<userRole> => {
        if (loggedInUserDetails?.userInfo.isGradientAdmin) {
            return 'GradientAdmin';
        }

        const roomRef = doc(db, `${DB_Mode}_Gym_ChatRooms`, roomId);
        const possibleRoom = await getDoc(roomRef);
        const userId = loggedInUserDetails?.userInfo.userId;
        
        if (!possibleRoom.exists() || !possibleRoom.data()) {
            return 'Member';
        }

        const roomData = possibleRoom.data();
        if (roomData.Admins.includes(userId)) {
            return 'Admin';
        }

        if (roomData.Trainers.includes(userId)) {
            return 'Trainer';
        }

        return 'Member';
    }, [loggedInUserDetails]);

    return {
        handleAddLocations,
        handleGymChatRoom,
        handleRegisterGym,
        getGymChatRoom,
        getGymChatRoomPassword,
        leaveGymGroup,
        getUserRole
    };
};

export default useGyms;