
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentSection({
    selectedPayment,
    onSelectPayment,
    theme,
}) {
    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
        { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
        { id: 'cash', name: 'Cash on Delivery', icon: 'cash-outline' },
    ];

    return (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Payment Method
            </Text>
            <View style={styles.optionsContainer}>
                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.optionItem,
                            {
                                backgroundColor: theme.colors.background,
                                borderColor: selectedPayment === method.id
                                    ? theme.colors.primary
                                    : theme.colors.border,
                                borderWidth: selectedPayment === method.id ? 2 : 1,
                            }
                        ]}
                        onPress={() => onSelectPayment(method.id)}
                    >
                        <Ionicons
                            name={method.icon}
                            size={24}
                            color={selectedPayment === method.id
                                ? theme.colors.primary
                                : theme.colors.text}
                        />
                        <Text style={[styles.optionName, { color: theme.colors.text }]}>
                            {method.name}
                        </Text>
                    </TouchableOpacity>
                ))}
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
    optionsContainer: {
        gap: 12,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 12,
        gap: 12,
    },
    optionName: {
        fontSize: 16,
        fontWeight: '500',
    },
});

