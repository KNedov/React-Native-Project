import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductCard({ id, name, description, price, imageUrl, onPress, discount }) {

    return (
        <TouchableOpacity
            onPress={() => onPress(id)}
            style={styles.cardContainer}
            activeOpacity={0.9}
        >
            <View style={styles.card}>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        resizeMode='contain'
                    />


                    {discount &&
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>-{discount}%</Text>
                        </View>}


                    
                </View>


                <View style={styles.content}>


                    <Text style={styles.title} numberOfLines={2}>{name}</Text>

                    {description && (
                        <Text style={styles.subtitle} numberOfLines={1}>{description}</Text>
                    )}

                    {discount ? <View style={styles.priceContainer}>
                        <Text style={styles.price}>${price.toFixed(2) - (price.toFixed(2) * discount / 100)}</Text>
                        <Text style={styles.originalPrice}>${(price).toFixed(2)}</Text>
                    </View> :
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>${price.toFixed(2)}</Text>

                        </View>}


                </View>



            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',


    },
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
    },
    imageContainer: {
        position: 'relative',
        width: '90%',
        margin: 'auto',
        height: 180,
    },
    image: {
        width: '100%',
        height: '100%',
        marginTop: '10'

    },
    badge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    content: {
        padding: 12,
    },
    category: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        lineHeight: 20,
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E86C1',
    },
    originalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
        marginLeft: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#333',
        marginLeft: 4,
        marginRight: 4,
    },
    reviews: {
        fontSize: 12,
        color: '#999',
    },
    addToCartButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#2E86C1',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});