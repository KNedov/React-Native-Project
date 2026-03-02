
import Toast from 'react-native-toast-message';

export const showToast = {
    success: (message, details) => {
        Toast.show({
            type: 'success',
            text1: message,
            text2: details,
            position: 'top',
            visibilityTime: 2000,
        });
    },
    error: (message, details) => {
        Toast.show({
            type: 'error',
            text1: message,
            text2: details,
            position: 'top',
            visibilityTime: 3000,
        });
    },
    info: (message, details) => {
        Toast.show({
            type: 'info',
            text1: message,
            text2: details,
            position: 'top',
            visibilityTime: 2000,
        });
    }
};