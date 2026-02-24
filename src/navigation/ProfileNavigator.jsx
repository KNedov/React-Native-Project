import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../screens/ProfileScreen"




export default function UserNavigator() {
    

 const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    )
}