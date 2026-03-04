import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function NewCard({ lastProduct, onPress, }) {
    const { theme } = useTheme()
    return (
        <TouchableOpacity onPress={() => onPress(lastProduct.categoryId)} style={[styles.card, { backgroundColor: theme.colors.backgroundCard }]}>
            <View style={{ alignItems: 'flex-end', position: 'absolute', top: 5, right: '5' }}>
                <Text style={styles.newLabel} >New</Text>
            </View>


            <Image source={{ uri: lastProduct.imageUrl }}
                style={styles.image}
                resizeMode='contain' />
            <View >

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%', paddingTop: 6 }}>



                    <View style={{ paddingBottom: 30, gap: 2 }}>
                        <Text style={{ fontSize: 12, color: theme.colors.textCard }}>Introducing</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.textCard }}>{lastProduct.name}</Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'relative',
        height: 180,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '180',
        height: '100%',
        marginTop: 5,
        margin: 10
    },
    newLabel: {
        backgroundColor: 'rgba(255, 12, 3, 0.53)',
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 8,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 5,
        right: 5
    },

})