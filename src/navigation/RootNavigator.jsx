import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/auth/useAuth"
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";
import CartScreen from "../screens/CartScreen";
import HeaderWithCart from "../components/HeaderWithCart";


export default function RootNavigator() {
    const Stack = createNativeStackNavigator();
    const { theme } = useTheme()
    const { isAuthenticated } = useAuth();




    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated
                    ? <>
                        <Stack.Screen name='TabNavigator'
                            component={TabNavigator}
                            options={{
                                header: () => <HeaderWithCart title="Nexus Store"/>,
                                headerShown: true,
                            }}

                        />
                        <Stack.Screen
                            name="CartModal"
                            component={CartScreen}
                            options={{
                                presentation: 'modal',
                                headerShown: false,
                            }}
                        />

                    </>


                    : <Stack.Screen name='Auth' component={AuthNavigator} />
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}