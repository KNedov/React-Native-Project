import { createNativeStackNavigator } from "@react-navigation/native-stack";


export default function RootNavigator() {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
        </Stack.Navigator>
    )
}