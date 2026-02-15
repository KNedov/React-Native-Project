import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";


export default function RootNavigator() {
    const Stack = createNativeStackNavigator();
    const {theme}=useTheme()

    return(
        <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='TabNavigator' component={TabNavigator}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}