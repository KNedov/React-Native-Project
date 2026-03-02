import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default function OrderSummary ({
    items,
    subtotal,
    tax,
    deliveryPrice,
    total,
    theme,
}) {
    return (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Order Summary
            </Text>
            <View>
                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Subtotal ({items.length} items)
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Tax (20%)
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${tax.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>
                        Delivery
                    </Text>
                    <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                        ${deliveryPrice.toFixed(2)}
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
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
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
});
