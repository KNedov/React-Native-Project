export const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateTax = (cartItems) => {
    return calculateSubtotal(cartItems) * 0.2;
};

export const calculateTotal = (cartItems) => {
    return calculateSubtotal(cartItems) + calculateTax(cartItems);
};

export const getDeliveryPrice = (selectedDelivery, deliveryMethods) => {
    const method = deliveryMethods?.find(m => m.id === selectedDelivery);
    return method?.price || 0;
};

export const formatCardNumber = (text) => {
    if (!text) return '';
    const cleaned = text.replace(/\s/g, '');
    const parts = [];
    for (let i = 0; i < cleaned.length && i < 16; i += 4) {
        parts.push(cleaned.substring(i, i + 4));
    }
    return parts.join(' ');
};

export const formatExpiry = (text) => {
    if (!text) return '';
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
        return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
};

export const formatField = (field, text) => {
    if (field === 'cardNumber') return formatCardNumber(text);
    if (field === 'cardExpiry') return formatExpiry(text);
    return text;
};

export const CartUtils = {
   
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    getDeliveryPrice,
    formatField
};