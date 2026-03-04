
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../hooks/useTheme";
import { useCart } from '../contexts/cart/useCart';
import Toast from 'react-native-toast-message';
import { OrderUtils } from '../utils/orderUtils'
import CustomHeader from '../components/CustomHeader';

export default function OrderDetailsScreen({ navigation, route }) {
    const { theme } = useTheme();
    const { orderId } = route.params;
    const { getOrderById } = useCart();

    const order = getOrderById(orderId);

    const handleResetToUserTab = () => {
    navigation.reset({
        index: 0,
        routes: [
            {
                name: 'UserTab'
            }
        ],
    });
    
};

if (!order) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
                    <Text style={[styles.errorText, { color: theme.colors.text }]}>
                        Order not found
                    </Text>
                    <TouchableOpacity
                        style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
           
            <CustomHeader
            theme={theme}
            navigation={navigation}
            title={'Order Details'}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <View style={styles.orderHeader}>
                        <View>
                            <Text style={[styles.orderNumber, { color: theme.colors.primary }]}>
                                {order.orderNumber}
                            </Text>
                            <Text style={[styles.orderDate, { color: theme.colors.text }]}>
                                {OrderUtils.formatDate(order.date)}
                            </Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: OrderUtils.getStatusColor(order.status) + '20' }]}>
                            <Ionicons name={OrderUtils.getStatusIcon(order.status)} size={16} color={OrderUtils.getStatusColor(order.status)} />
                            <Text style={[styles.statusText, { color: OrderUtils.getStatusColor(order.status) }]}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        <Ionicons name="person-outline" size={18} color={theme.colors.primary} /> Customer Information
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Full Name</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{order.customerInfo.fullName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Email</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{order.customerInfo.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Phone</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{order.customerInfo.phone}</Text>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        <Ionicons name="cube-outline" size={18} color={theme.colors.primary} /> Delivery Information
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Address</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                            {order.customerInfo.address}, {order.customerInfo.city} {order.customerInfo.postalCode}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Country</Text>
                        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{order.customerInfo.country}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Delivery Method</Text>
                        <View style={styles.deliveryMethod}>
                            <Ionicons
                                name={order.deliveryMethod === 'express' ? 'rocket-outline' :
                                    order.deliveryMethod === 'pickup' ? 'storefront-outline' : 'cube-outline'}
                                size={16}
                                color={theme.colors.primary}
                            />
                            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                {OrderUtils.getDeliveryName(order.deliveryMethod)}
                                {order.deliveryPrice > 0 && ` (+$${order.deliveryPrice.toFixed(2)})`}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        <Ionicons name="card-outline" size={18} color={theme.colors.primary} /> Payment Information
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Payment Method</Text>
                        <View style={styles.paymentMethod}>
                            <Ionicons name={OrderUtils.getPaymentIcon(order.paymentMethod)} size={16} color={theme.colors.primary} />
                            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                {OrderUtils.getPaymentName(order.paymentMethod)}
                            </Text>
                        </View>
                    </View>
                    {order.paymentMethod === 'card' && order.paymentDetails?.cardNumber && (
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Card</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                {order.paymentDetails.cardNumber}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        <Ionicons name="basket-outline" size={18} color={theme.colors.primary} />
                        Order Items ({order.items.length})
                    </Text>

                    {order.items.map((item, index) => (
                        <View key={`${item.id}-${index}`} style={styles.orderItem}>
                            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={[styles.itemName, { color: theme.colors.text }]}>
                                    {item.name}
                                </Text>
                                {item.color && (
                                    <Text style={[styles.itemColor, { color: theme.colors.text }]}>
                                        Color: {item.color}
                                    </Text>
                                )}
                                <View style={styles.itemPriceRow}>
                                    <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
                                        ${item.price?.toFixed(2)}
                                    </Text>
                                    <Text style={[styles.itemQuantity, { color: theme.colors.text }]}>
                                        x {item.quantity}
                                    </Text>
                                </View>
                            </View>
                            <Text style={[styles.itemTotal, { color: theme.colors.text }]}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        <Ionicons name="calculator-outline" size={18} color={theme.colors.primary} /> Order Summary
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>Subtotal</Text>
                        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                            ${order.subtotal?.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>Tax (20%)</Text>
                        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                            ${order.tax?.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>Delivery</Text>
                        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                            ${order.deliveryPrice?.toFixed(2)}
                        </Text>
                    </View>

                    <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
                        <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total</Text>
                        <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                            ${order.total?.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={styles.resetButtonContainer}>
                    <TouchableOpacity
                        style={[styles.resetButton, { backgroundColor: theme.colors.card }]}
                        onPress={handleResetToUserTab}
                    >
                        <Ionicons name="person-circle-outline" size={20} color={theme.colors.primary} />
                        <Text style={[styles.resetButtonText, { color: theme.colors.primary }]}>
                            Back to Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 30,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 12,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    infoRow: {
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    deliveryMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
    },
    itemColor: {
        fontSize: 12,
        marginBottom: 4,
    },
    itemPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    itemPrice: {
        fontSize: 13,
        fontWeight: '600',
    },
    itemQuantity: {
        fontSize: 12,
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: 'bold',
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 12,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 20,
    },
    backButton: {
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 12,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetButtonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        marginTop: 8,
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});