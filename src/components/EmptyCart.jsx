import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyCart({ theme, onStartShopping }) {
    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color={theme.colors.text} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                Your Cart is Empty
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.text }]}>
                Looks like you haven't added anything to your cart yet
            </Text>
            <TouchableOpacity
                style={[styles.shopButton, { backgroundColor: theme.colors.primary }]}
                onPress={onStartShopping}
            >
                <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 40,
    },
    shopButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    shopButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});