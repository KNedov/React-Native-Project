

import { Text, StyleSheet, StatusBar, ScrollView, View, Image } from "react-native";
import { Dimensions } from 'react-native';
import { useTheme } from "../hooks/useTheme";
import { useProducts } from "../contexts/products/useProducts";
import EmptyDetailsCard from "../components/EmtyDetailsCard";
const { width } = Dimensions.get('window');

export default function DetailsScreen({
    route,
    navigation
}) {
    const { theme } = useTheme()
    const { productId } = route.params;
    const { getProductById } = useProducts()
    const product = getProductById(productId)
    const originalPrice = product?.price;
    const discountPercentage = product.discount || 0;

    return (
        <>
            <StatusBar backgroundColor={theme.colors.backgroundColor} />
            {product ? <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.image}
                        resizeMode="stretch"
                    />
                    {discountPercentage > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{product.discount}%</Text>
                        </View>
                    )}
                </View>


                <View style={styles.detailsCard}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.colorContainer}>
                        <Text style={styles.colorText}>Color: {product.color}</Text>
                    </View>


                    <View style={styles.priceContainer}>
                        {discountPercentage > 0 ? (
                            <>
                                <Text style={styles.discountedPrice}>
                                    {(originalPrice * (1 - discountPercentage / 100))?.toFixed(2)} лв.
                                </Text>
                                <Text style={styles.originalPrice}>
                                    {(product.price)?.toFixed(2)} лв.
                                </Text>
                            </>
                        ) : (
                            <Text style={styles.price}>
                                {(product.price)?.toFixed(2)} лв.
                            </Text>
                        )}
                    </View>


                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>


                </View>
            </ScrollView>:<EmptyDetailsCard navigation={navigation} />}
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imageContainer: {
        width: width,
        height: width * 1.2,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'center',
    },
    discountBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FF3B30',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsCard: {
        backgroundColor: '#1E1E1E',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 32,
    },

    productName: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    colorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    colorText: {
        color: '#E0E0E0',
        fontSize: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#333333',
    },
    price: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    discountedPrice: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 12,
    },
    originalPrice: {
        color: '#6C6C6C',
        fontSize: 20,
        textDecorationLine: 'line-through',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    description: {
        color: '#E0E0E0',
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.87,
    },
});
