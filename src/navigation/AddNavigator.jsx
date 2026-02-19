
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "../screens/AddScreen";

export default function AddNavigator() {
    const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen  name="Add" component={AddScreen}/>
        </Stack.Navigator>
    )
}