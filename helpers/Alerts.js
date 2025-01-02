import { Alert } from "react-native";
import Toast from 'react-native-toast-message';
import { StatusbarHeight, windowHeight } from "./Constants";
class messageFunctionsProviders {
    showError = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Alert!',
            text2: message,
            position: 'top',
            topOffset: StatusbarHeight + windowHeight / 70

        });
    }

    showSuccess = (message, duration = 4000) => {
        Toast.show({
            type: 'success',
            text1: 'Congratulations!',
            text2: message,
            position: 'top',
            topOffset: StatusbarHeight + windowHeight / 70
        });
    }

    alert(title, message, callback) {
        if (callback === false) {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: 'OK',
                    },
                ],
                { cancelable: false },
            );
        } else {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: 'OK',
                        onPress: () => callback,
                    },
                ],
                { cancelable: false },
            );
        }
    }
}



export const MsgProvider = new messageFunctionsProviders();