import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";





export default function RootNavigator() {
    const Stack = createNativeStackNavigator();
    const { theme } = useTheme()

    return (
        <NavigationContainer theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='TabNavigator' component={TabNavigator} />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    )
}