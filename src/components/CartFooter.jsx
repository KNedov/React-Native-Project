import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartFooter({
    theme,
    subtotal,
    tax,
    total,
    onCheckout,
    updating = false,
    taxRate = 20,
    isCartModal
}) {
    if(isCartModal){
     return(
         <SafeAreaView edges={['right', 'bottom', 'left']} style={[styles.footer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.summaryContainer}>

                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Subtotal
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>


                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Tax ({taxRate}%)
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${tax.toFixed(2)}
                    </Text>
                </View>


                <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
                    <Text style={[styles.totalLabel, { color: theme.colors.text }]}>
                        Total
                    </Text>
                    <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                        ${total.toFixed(2)}
                    </Text>
                </View>
            </View>

            {!isCartModal
                &&
                <TouchableOpacity
                    style={[styles.checkoutButton, { backgroundColor: theme.colors.primary }]}
                    onPress={onCheckout}
                    disabled={updating}
                    activeOpacity={0.8}
                >
                    {updating ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                        </>
                    )}
                </TouchableOpacity>}

        </SafeAreaView>
     )   
    }
    return (
        <View style={[styles.footer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.summaryContainer}>

                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Subtotal
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>


                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Tax ({taxRate}%)
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${tax.toFixed(2)}
                    </Text>
                </View>


                <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
                    <Text style={[styles.totalLabel, { color: theme.colors.text }]}>
                        Total
                    </Text>
                    <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                        ${total.toFixed(2)}
                    </Text>
                </View>
            </View>

            {!isCartModal
                &&
                <TouchableOpacity
                    style={[styles.checkoutButton, { backgroundColor: theme.colors.primary }]}
                    onPress={onCheckout}
                    disabled={updating}
                    activeOpacity={0.8}
                >
                    {updating ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                        </>
                    )}
                </TouchableOpacity>}

        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginTop: 'auto',
    },
    summaryContainer: {
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});