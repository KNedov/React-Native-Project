import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function NewCard({lastItem,onPress,}) {
    return (
        <TouchableOpacity onPress={()=>onPress(lastItem.id)} style={styles.card}>

            <Image source={{ uri: lastItem.imageUrl }}
                style={styles.image}
                resizeMode='contain' />
            <View >
                <View style={{ justifyContent: 'space-between', height: '100%', paddingTop: 6 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.newLabel} >New</Text>
                    </View>

                    <View style={{ paddingBottom: 50,gap:2 }}>
                        <Text style={{ fontSize: 12, color: 'black' }}>Introducing</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{lastItem.name}</Text>
                        
                            <View style={{backgroundColor:'gray',width:80,alignItems:'center',justifyContent:'center',paddingTop:6,paddingBottom:6,borderRadius:6,marginTop:20}}>
                                <Text style={{fontSize:16,color:"white"}} >Buy Now!</Text>
                            </View>
                        
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
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
        width: '40%',
        height: '100%',
        marginTop: 5,
        position: 'center',
        margin: 10
    },
    newLabel: {
        backgroundColor: 'rgba(255, 12, 3, 0.53)',
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 8,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

})