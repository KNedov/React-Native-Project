import { View,Text,StyleSheet,TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function CategoryCard({
    id,
    title,
    icon,
    onPress}) {



    return (
        
        
                <TouchableOpacity style={styles.categoryCard} onPress={()=>onPress(id)}>
                    <View style={styles.iconWrapper}>
                        <Ionicons
                            name={icon}
                            size={16}
                            color="#0890ff"
                        />
                    </View>

                    <Text style={styles.categoryText}>
                        {title}
                    </Text>
                </TouchableOpacity>
         
        
    );
}

const styles = StyleSheet.create({
    categoryCard: {
        backgroundColor: '#fff',
        width: 110,
        height: 40,
        
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,
        flexDirection:'row',
        

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        elevation: 4,
    },

    iconWrapper: {
        width: 22,
        height: 22,
        borderRadius: 28,
        backgroundColor: 'rgba(8, 144, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,

    },

    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    }
}
);