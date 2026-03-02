import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../screens/ProfileScreen"
import CartScreen from "../screens/CartScreen"
import CheckOutScreen from "../screens/CheckOutScreen"
import OrderScreen from "../screens/OrderScreen"
import OrderDetailsScreen from "../screens/OrderDetailsScreen"




export default function UserNavigator() {
    

 const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Profile" options={{headerShown:false}} component={ProfileScreen}/>
            <Stack.Screen name="Cart" options={{headerShown:false}} component={CartScreen}/>
            <Stack.Screen name="Checkout" options={{headerShown:false}} component={CheckOutScreen}/>
            <Stack.Screen name="Orders" options={{headerShown:false}} component={OrderScreen}/>
            <Stack.Screen name="OrderDetails" options={{headerShown:false}} component={OrderDetailsScreen}/>
        </Stack.Navigator>
    )
}