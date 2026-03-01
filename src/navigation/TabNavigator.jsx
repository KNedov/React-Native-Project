import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import{Ionicons } from "@expo/vector-icons"
import ProductFormNavigator from "./ProductFormNavigator";
import ProfileNavigator from "./ProfileNavigator";

export default function TabNavigator() {
    const Tabs=createBottomTabNavigator()

    return(
        <Tabs.Navigator>
            <Tabs.Screen
            name="HomeTab"
            component={HomeNavigator}
            options={{
                title:"Home",
                tabBarIcon:({color,size})=><Ionicons name='home' size={size} color={color}/>,
                headerShown:false
            }}/>
            <Tabs.Screen
            name="ProductFormTab"
            component={ProductFormNavigator}
            options={{
                title:"ProductForm",
                tabBarIcon:({color,size})=><Ionicons name='add' size={size} color={color}/>,
                headerShown:false
            }}/>
            <Tabs.Screen
            name="UserTab"
            component={ProfileNavigator}
            options={{
                title:"Profile",
                tabBarIcon:({color,size})=><Ionicons name='person-circle-outline' size={size} color={color}/>,
                headerShown:false
            }}/>
        
        </Tabs.Navigator>
    )
}