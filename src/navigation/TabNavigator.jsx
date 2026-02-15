import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import{Ionicons } from "@expo/vector-icons"
import AddNavigator from "./AddNavigator";
import UserNavigator from "./userNavigator";

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
            name="Add"
            component={AddNavigator}
            options={{
                title:"Add Product",
                tabBarIcon:({color,size})=><Ionicons name='add' size={size} color={color}/>,
                headerShown:false
            }}/>
            <Tabs.Screen
            name="User"
            component={UserNavigator}
            options={{
                title:"User",
                tabBarIcon:({color,size})=><Ionicons name='person-circle-outline' size={size} color={color}/>,
                headerShown:false
            }}/>
        
        </Tabs.Navigator>
    )
}