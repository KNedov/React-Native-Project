
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import ThemeProvider from './contexts/theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts/auth/AuthProvider';
import Toast from 'react-native-toast-message';
import { ProductProvider } from './contexts/products/productProvider';
import { StrictMode } from 'react';
import React from 'react';

export default function App() {

    return (
        // <React.StrictMode>
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <ThemeProvider>
                    <StatusBar style='auto' />
                    <AuthProvider>
                        <ProductProvider>
                            <RootNavigator />
                        </ProductProvider>
                    </AuthProvider>
                </ThemeProvider>
                <Toast />
            </GestureHandlerRootView>
        </SafeAreaProvider>
    //    </React.StrictMode>
       
    );
}


