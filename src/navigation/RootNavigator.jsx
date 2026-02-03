import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";


export default function RootNavigator() {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='TabNavigator' component={TabNavigator}/>
        </Stack.Navigator>
    )
}