//import messaging from "@react-native-firebase/messaging";

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { RState } from "../../types/RState";
//import { setFCM } from "../../Redux/Actions";

const useHelpers = () => {

    // const { loggedInUserDetails, followers, following } = useSelector(({ auth }: RState) => auth)
    // const { fcm } = useSelector(({ platform }: RState) => platform)

    // const dispatch = useDispatch()

    // const requestNotificationPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     console.log("Notifications status:", authStatus);
    // };

    // const getFcmToken = useCallback(async () => {
    //     const fcmToken = await messaging().getToken();
    //     if (fcmToken) {
    //         console.log({ fcmToken });

    //         dispatch(setFCM(fcmToken))
    //     } else {
    //         dispatch(setFCM(null))
    //     }
    // }, [fcm]);

    // return {
    //     requestNotificationPermission,
    //     getFcmToken
    // }
}


export default useHelpers;