
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import ThemeProvider from './contexts/theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts/auth/AuthProvider';
import Toast from 'react-native-toast-message';

export default function App() {

    return (
        <SafeAreaProvider>
                <GestureHandlerRootView>
                <ThemeProvider>
                    <StatusBar style='auto' />
                    <AuthProvider>
                        <RootNavigator />
                    </AuthProvider>
                </ThemeProvider>
                <Toast />
        </GestureHandlerRootView>
            </SafeAreaProvider>
    );
}


