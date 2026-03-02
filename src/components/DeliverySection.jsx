import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeliverySection({
    deliveryMethods,
    selectedDelivery,
    onSelectDelivery,
    theme,
}) {
    return (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Delivery Method
            </Text>
            <View style={styles.optionsContainer}>
                {deliveryMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.optionItem,
                            {
                                backgroundColor: theme.colors.background,
                                borderColor: selectedDelivery === method.id
                                    ? theme.colors.primary
                                    : theme.colors.border,
                                borderWidth: selectedDelivery === method.id ? 2 : 1,
                            }
                        ]}
                        onPress={() => onSelectDelivery(method.id)}
                    >
                        <Ionicons
                            name={method.icon}
                            size={24}
                            color={selectedDelivery === method.id
                                ? theme.colors.primary
                                : theme.colors.text}
                        />
                        <View style={styles.optionContent}>
                            <Text style={[styles.optionName, { color: theme.colors.text }]}>
                                {method.name}
                            </Text>
                            <Text style={[styles.optionDetails, { color: theme.colors.text }]}>
                                {method.estimatedDays}
                            </Text>
                        </View>
                        <Text style={[styles.optionPrice, { color: theme.colors.text }]}>
                            ${method.price.toFixed(2)}
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
    optionContent: {
        flex: 1,
    },
    optionName: {
        fontSize: 16,
        fontWeight: '500',
    },
    optionDetails: {
        fontSize: 12,
        marginTop: 2,
    },
    optionPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

