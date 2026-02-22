import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useAuth} from "../contexts/auth/useAuth"
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";
import {ActivityIndicator} from "react-native"

export default function RootNavigator() {
    const Stack = createNativeStackNavigator();
    const {theme}=useTheme()
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        );
    }

    return (
        <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAuthenticated
                    ?<Stack.Screen name='TabNavigator' component={TabNavigator} />
                    :<Stack.Screen name='Auth' component={AuthNavigator} />
                    }
                </Stack.Navigator>
        </NavigationContainer>
    )
}