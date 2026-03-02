
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProductFormScreen from "../screens/ProductFormScreen";

export default function HomeNavigator() {
    const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home"  component={HomeScreen}/>
            <Stack.Screen name="Category" component={CategoryScreen}/>
            <Stack.Screen name="Details" component={DetailsScreen}/>
            <Stack.Screen name="Edit" options={{headerShown:false}}  component={ProductFormScreen}/>
        </Stack.Navigator>
    )
}