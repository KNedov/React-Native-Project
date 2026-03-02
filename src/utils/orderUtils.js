
export const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getStatusColor = (status) => {
    switch(status) {
        case 'completed': return '#4CAF50';
        case 'processing': return '#FFA500';
        case 'cancelled': return '#FF3B30';
        case 'delivered': return '#007AFF';
        default: return '#A0A0A0';
    }
};


export const getStatusIcon = (status) => {
    switch(status) {
        case 'completed': return 'checkmark-circle';
        case 'processing': return 'time';
        case 'cancelled': return 'close-circle';
        case 'delivered': return 'checkmark-done-circle';
        default: return 'help-circle';
    }
};

export const getPaymentIcon = (method) => {
    switch(method) {
        case 'card': return 'card-outline';
        case 'paypal': return 'logo-paypal';
        case 'applepay': return 'logo-apple';
        case 'cash': return 'cash-outline';
        default: return 'card-outline';
    }
};


export const getPaymentName = (method) => {
    switch(method) {
        case 'card': return 'Credit/Debit Card';
        case 'paypal': return 'PayPal';
        case 'applepay': return 'Apple Pay';
        case 'cash': return 'Cash on Delivery';
        default: return 'Unknown';
    }
};

export const getDeliveryName = (method) => {
    switch(method) {
        case 'express': return 'Express Delivery';
        case 'pickup': return 'Store Pickup';
        case 'standard': return 'Standard Delivery';
        default: return 'Unknown';
    }
};

export const OrderUtils = {
    formatDate: formatOrderDate,
    getStatusColor,
    getStatusIcon,
    getPaymentIcon,
    getPaymentName,
    getDeliveryName,
};