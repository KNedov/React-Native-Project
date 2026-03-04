
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function CartItem({ 
    item, 
    theme,
    onUpdateQuantity, 
    onRemove,
    updating 
}) {
   
    return (
        <View style={[styles.cartItem, { backgroundColor: theme.colors.backgroundCard }]}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.itemImage}
            />
            
            <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>
                    {item.name}
                </Text>
                
                {item.color && (
                    <View style={styles.itemColor}>
                        <Text style={[styles.itemColorText, { color: theme.colors.text }]}>
                            Color: {item.color}
                        </Text>
                    </View>
                )}
                
                <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
                    ${item.price?.toFixed(2)}
                </Text>
                
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={[styles.quantityButton, { backgroundColor: theme.colors.background }]}
                        onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={updating || item.quantity <= 1}
                    >
                        <Ionicons name="remove" size={18} color={theme.colors.text} />
                    </TouchableOpacity>
                    
                    <Text style={[styles.quantity, { color: theme.colors.text }]}>
                        {item.quantity}
                    </Text>
                    
                    <TouchableOpacity
                        style={[styles.quantityButton, { backgroundColor: theme.colors.background }]}
                        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updating}
                    >
                        <Ionicons name="add" size={18} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(item)}
            >
                <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
        resizeMode:'contain'
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    itemColor: {
        marginBottom: 4,
    },
    itemColorText: {
        fontSize: 13,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '500',
        minWidth: 30,
        textAlign: 'center',
    },
    removeButton: {
        padding: 8,
    },
});