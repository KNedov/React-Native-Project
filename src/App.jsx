
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import ThemeProvider from './contexts/theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts/auth/AuthProvider';
import Toast from 'react-native-toast-message';
import { ProductProvider } from './contexts/products/productProvider';
import { CartProvider } from './contexts/cart/CartProvider'
import { toastConfig } from '../toastConfig';

export default function App() {

    return (
        
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <ThemeProvider>
                        <StatusBar style='auto' />
                        <AuthProvider>
                            <CartProvider>
                                <ProductProvider>
                                    <RootNavigator />
                                </ProductProvider>
                            </CartProvider>
                        </AuthProvider>
                        <Toast config={toastConfig} />
                    </ThemeProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
       

    );
}


