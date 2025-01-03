// app/onboard.tsx
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { SvgXml } from "react-native-svg";
import { useRouter } from 'expo-router'; // Changed from useNavigation
import useStyles from '../../hooks/useStyles';
import { LoginLogo, OnBoardBackground} from '../../assets/icons/Index';
import { windowWidth } from '../../helpers/Constants';
import useColors from '../../hooks/useColors';
import useFonts from '../../hooks/useFonts';
import ActionButton from '../../components/ActionButton';
import ActionButtonGradient from '../../components/ActionButtonGradient';
import useFunctions from '@/firebase/Functions';

const OnBoard = React.memo(() => {
    const router = useRouter(); // Changed from useNavigation
    const { styles, insets } = useStyles();
    const { colors } = useColors();
    const { Fonts, FontSize } = useFonts();

    const { handleMockFunction } = useFunctions();

    const handleFirebase = () => {

    }
    
    
    return (
        <View style={styles.Splash}>
            <SvgXml
                xml={OnBoardBackground}
                style={{
                    height: '100%',
                    width: '100%'
                }}
            />

            <View style={styles.onBoardContainer}>
                <SvgXml xml={LoginLogo} style={{ alignSelf: 'center', marginTop: (windowWidth / 4)}} />

                <View style={{ width: '100%', alignSelf: 'center', position: 'absolute', bottom: Platform.OS == 'android' ? (insets.bottom + windowWidth / 10) : insets.bottom }}>
                    <ActionButtonGradient
                        title={'SIGN IN'}
                        onPress={() => router.push({
                            pathname: '/login',
                            params: { isGymOwner: false }
                        })}
                        style={{
                            marginVertical: windowWidth / 22,
                        }}
                    />

                    <ActionButton
                        title={'GET STARTED'}
                        // onPress={() => router.push({
                        //     pathname: '/register',
                        //     params: { isGymOwner: false }
                        // })}
                        onPress={handleMockFunction}
                        titleStyle={{
                            color: colors.Black, 
                        }}
                        buttonColor={colors.White}
                    />
    
                    <TouchableOpacity 
                        style={{ marginTop: windowWidth / 12.25 }} 
                        onPress={() => router.push({
                            pathname: '/login',
                            params: { isGymOwner: true }
                        })}
                    >
                        <Text style={{ 
                            color: colors.Link, 
                            fontWeight: "bold", 
                            textAlign: 'center', 
                            fontSize: FontSize.medium, 
                            paddingBottom: 20
                        }}>
                            I'm a Gym Owner
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', alignSelf: 'center', position: 'absolute', bottom: (insets.bottom + windowWidth / 1.25) }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontSize: FontSize.xxxxLarge,
                            fontFamily: Fonts.GrotesqueBold,
                            color: colors.White,
                            alignSelf: 'center',
                            marginVertical: windowWidth / 12
                        }}>
                        {'Building Fitness Connections'}
                    </Text>

                    <Text
                        allowFontScaling={false}
                        style={{
                            fontSize: FontSize.xlarge,
                            fontFamily: Fonts.Light,
                            color: colors.White,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingHorizontal: '5%',
                            lineHeight: 18
                        }}>
                        {'Welcome to the all in one solution to connecting with your gym community.'}
                    </Text>
                </View>
            </View>
        </View>
    )
})

export default OnBoard;