
export const validateCheckoutForm = (formData, selectedPayment) => {
    const newErrors = {};

    if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.email) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
    }

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    if (!formData.city?.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';

    if (selectedPayment === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.cardName?.trim()) newErrors.cardName = 'Name on card is required';
        if (!formData.cardExpiry) {
            newErrors.cardExpiry = 'Expiry date is required';
        } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.cardExpiry)) {
            newErrors.cardExpiry = 'Invalid expiry date (MM/YY)';
        }
        if (!formData.cardCvv) {
            newErrors.cardCvv = 'CVV is required';
        } else if (!/^[0-9]{3,4}$/.test(formData.cardCvv)) {
            newErrors.cardCvv = 'Invalid CVV';
        }
    }

    return newErrors;
};