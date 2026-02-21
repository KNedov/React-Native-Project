import { Image, Text, View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';


export default function ItemCard({
    discount,
    price,
    imageUrl,
    featured,
    name,
    color,
    description,
    created_at,
    categoryId

    }) {
    const { theme } = useTheme();

    const finalPrice = discount > 0
        ? price - (price * discount / 100)
        : price;

    return (
        <Animated.View
            entering={FadeInDown.duration(400).springify()}
            style={[styles.card, { backgroundColor: theme.colors.backgroundCard }]}
        >

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri:imageUrl }}
                    style={[styles.image,{backgroundColor:theme.colors.backgroundCard}]}
                    resizeMode='center'
                />

                {discount > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{discount}%</Text>
                    </View>
                )}

                {featured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>★</Text>
                    </View>
                )}
            </View>

            
            <View style={[styles.content,{backgroundColor:theme.colors.backgroundContent}]}>
            
                <View style={styles.header}>
                    <Text style={[styles.name, { color: theme.colors.textCard }]} numberOfLines={1}>
                        {name}
                    </Text>
                    {color && (
                        <View style={styles.colorContainer}>
                           
                            <Text style={[styles.colorText, { color: theme.colors.textSecondary }]}>
                                {color}
                            </Text>
                        </View>
                    )}
                </View>

               
                {description && (
                    <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
                        {description}
                    </Text>
                )}

                <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: theme.colors.primary }]}>
                        ${finalPrice.toFixed(2)}
                    </Text>
                    {discount > 0 && (
                        <Text style={[styles.originalPrice, { color: theme.colors.textDisabled }]}>
                            ${price.toFixed(2)}
                        </Text>
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.category, { color: theme.colors.textSecondary }]}>
                        {categoryId?.replace('cat-', 'Category ')}
                    </Text>
                    <Text style={[styles.date, { color: theme.colors.textDisabled }]}>
                        {new Date(created_at).toLocaleDateString()}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: 8,
        marginVertical: 6,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    imageContainer: {
        marginTop:10,
        margin:'auto',
        position: 'relative',
        resizeMode:'contain',
        width: '90%',
        height: 280,
       
    },
    image: {
        width: '100%',
        height:'100%',
         
    },
    discountBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#FF3B30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    featuredBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#FFD700',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        padding: 12,
        gap: 6,
         
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        marginRight: 8,
    },
    colorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    colorText: {
        fontSize: 12,
        fontWeight:'bold'
    },
    description: {
        fontSize: 13,
        lineHeight: 18,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#33333333',
    },
    category: {
        fontSize: 11,
        textTransform: 'uppercase',
    },
    date: {
        fontSize: 11,
    },
});