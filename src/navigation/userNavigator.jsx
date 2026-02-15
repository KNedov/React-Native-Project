import { createNativeStackNavigator } from "@react-navigation/native-stack"
import UserScreen from "../screens/UserScreen"

export default function UserNavigator() {
    

 const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="User" component={UserScreen}/>
        </Stack.Navigator>
    )
}