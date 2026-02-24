import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../screens/ProfileScreen"
import CartScreen from "../screens/CartScreen"
import OrderScreen from "../screens/OrderScreen"




export default function UserNavigator() {
    

 const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/>
            <Stack.Screen name="Orders" component={OrderScreen}/>
        </Stack.Navigator>
    )
}