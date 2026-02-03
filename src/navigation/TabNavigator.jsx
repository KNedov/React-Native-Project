import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import{Ionicons } from "@expo/vector-icons"

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

           

        
        </Tabs.Navigator>
    )
}