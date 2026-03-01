
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductFormScreen from "../screens/ProductFormScreen";

export default function ProductFormNavigator() {
    const Stack= createNativeStackNavigator()

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen  name="ProductForm" component={ProductFormScreen}/>
        </Stack.Navigator>
    )
}