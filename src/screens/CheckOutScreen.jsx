import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/auth/useAuth';
import { useTheme } from "../hooks/useTheme";
import { useCart } from '../contexts/cart/useCart';
import { showToast } from '../utils/toast';
import { CARD_FIELDS, DELIVERY_FIELDS, deliveryMethods } from '../utils/constantUtil';
import { validateCheckoutForm } from '../utils/validation';
import { formatField, getDeliveryPrice } from '../utils/cartUtils';
import DeliverySection from '../components/DeliverySection';
import PaymentSection from '../components/PaymentSection';
import OrderSummary from '../components/OrderSummary';
import CheckoutInput from '../components/CheckoutInput';
import CustomHeader from '../components/CustomHeader';

export default function CheckOutScreen({ navigation, route }) {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { completeOrder } = useCart();
    const { items, total, subtotal, tax } = route.params || {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
    };

    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [selectedDelivery, setSelectedDelivery] = useState('standard');
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Bulgaria',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: '',
    });
    const [errors, setErrors] = useState({});

    const handlePlaceOrder = async () => {
        const validationErrors = validateCheckoutForm(formData, selectedPayment);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            showToast.error('Please fill in all required fields correctly')
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                ...formData,
                selectedPayment,
                selectedDelivery,
                deliveryPrice: getDeliveryPrice(selectedDelivery, deliveryMethods),
                subtotal,
                tax,
                total: finalTotal,
            };

            completeOrder(orderData);

            navigation.reset({
                index: 0,
                routes: [{ name: 'UserTab' }],
            });

            showToast.success('Order placed successfully!');
        } catch {
            showToast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    const finalTotal = total + getDeliveryPrice(selectedDelivery, deliveryMethods);

    const updateField = (field, text) => {
        const formattedText = formatField(field, text);
        setFormData(prev => ({ ...prev, [field]: formattedText }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const renderSection = (title, children) => (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
            {children}
        </View>
    );


    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <CustomHeader
            theme={theme}
            navigation={navigation}
            title={'Checkout'}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 100}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                

                    {renderSection('Delivery Information', (
                        <>
                            {DELIVERY_FIELDS.map(({ field, label, placeholder, keyboardType }) => (
                                <CheckoutInput
                                    key={field}
                                    field={field}
                                    label={label}
                                    placeholder={placeholder}
                                    value={formData[field]}
                                    error={errors[field]}
                                    onChangeText={(text) => updateField(field, text)}
                                    theme={theme}
                                    loading={loading}
                                    keyboardType={keyboardType}
                                />
                            ))}
                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <CheckoutInput
                                        key={'city'}
                                        field={'city'}
                                        label={'City'}
                                        placeholder={'Sofia'}
                                        value={formData['city']}
                                        error={errors['city']}
                                        onChangeText={(text) => updateField('city', text)}
                                        theme={theme}
                                        loading={loading}



                                    />

                                </View>
                                <View style={styles.halfWidth}>
                                    <CheckoutInput
                                        key={'postalCode'}
                                        field={'postalCode'}
                                        label={'Postal Code'}
                                        placeholder={'1000'}
                                        value={formData['postalCode']}
                                        error={errors['postalCode']}
                                        onChangeText={(text) => updateField('postalCode', text)}
                                        theme={theme}
                                        loading={loading}
                                        keyboardType={'numeric'}



                                    />

                                </View>
                            </View>
                        </>
                    ))}


                    <DeliverySection
                        deliveryMethods={deliveryMethods}
                        selectedDelivery={selectedDelivery}
                        onSelectDelivery={setSelectedDelivery}
                        theme={theme}
                    />

                    <PaymentSection
                        selectedPayment={selectedPayment}
                        onSelectPayment={setSelectedPayment}
                        theme={theme}
                    />

                    {selectedPayment === 'card' && renderSection('Card Details', (
                        <>
                            {CARD_FIELDS.map(({ field, label, placeholder, keyboardType, maxLength }) => (
                                <CheckoutInput
                                    key={field}
                                    field={field}
                                    label={label}
                                    placeholder={placeholder}
                                    value={formData[field]}
                                    error={errors[field]}
                                    onChangeText={(text) => updateField(field, text)}
                                    theme={theme}
                                    loading={loading}
                                    keyboardType={keyboardType}
                                    maxLength={maxLength}
                                />
                            ))}
                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <CheckoutInput
                                        key={'cardExpiry'}
                                        field={'cardExpiry'}
                                        label={'Expiry (MM/YY)'}
                                        placeholder={'12/25'}
                                        value={formData['cardExpiry']}
                                        error={errors['cardExpiry']}
                                        onChangeText={(text) => updateField('cardExpiry', text)}
                                        theme={theme}
                                        loading={loading}
                                        keyboardType={'numeric'}
                                        maxLength={5}
                                    />

                                </View>
                                <View style={styles.halfWidth}>
                                    <CheckoutInput
                                        key={'cardCvv'}
                                        field={'cardCvv'}
                                        label={'CVV'}
                                        placeholder={'123'}
                                        value={formData['cardCvv']}
                                        error={errors['cardCvv']}
                                        onChangeText={(text) => updateField('cardCvv', text)}
                                        theme={theme}
                                        loading={loading}
                                        keyboardType={'numeric'}
                                        maxLength={4}
                                        secureTextEntry={true}
                                    />

                                </View>
                            </View>
                        </>
                    ))}


                    <OrderSummary
                        items={items}
                        subtotal={subtotal}
                        tax={tax}
                        deliveryPrice={getDeliveryPrice(selectedDelivery, deliveryMethods)}
                        total={finalTotal}
                        theme={theme}
                    />


                    <TouchableOpacity
                        style={[styles.placeOrderButton, { backgroundColor: theme.colors.primary }]}
                        onPress={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.placeOrderButtonText}>Place Order</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={[styles.secureText, { color: theme.colors.text }]}>
                        <Ionicons name="lock-closed" size={14} /> Your payment info is secure
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
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
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    halfWidth: {
        flex: 1,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
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
    placeOrderButton: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    placeOrderButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secureText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
});
