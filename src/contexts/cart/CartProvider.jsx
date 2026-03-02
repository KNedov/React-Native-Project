
import { createContext, useState } from "react";
import { useAsyncState } from '../../hooks/useAsyncState';
import { showToast } from '../../utils/toast';
import * as Crypto from "expo-crypto";

export const CartContext = createContext({
    cartItems: [],
    completedOrders: [],
    addToCart: (product) => { },
    removeFromCart: (productId) => { },
    clearCart: () => { },
    updateQuantity: (productId, newQuantity) => { },
    completeOrder: (orderDetails) => { },
    getCompletedOrders: () => [],
    getOrderById: (orderId) => { },
    clearAllOrders: () => { },
    refreshOrders: () => { },
    refreshingOrders: false,
    loading: false
});

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useAsyncState('cart', []);
    const [loading, setLoading] = useState(false);
    const [completedOrders, setCompletedOrders] = useAsyncState('completedOrders', []);
    const [refreshingOrders, setRefreshingOrders] = useState(false);

    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                showToast.success('Quantity updated', `${product.name} quantity increased`);
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            showToast.success('Added to cart', product.name);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, productName) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        showToast.success('Removed from cart', productName);
    };

    const clearCart = () => {
        const count = cartItems.length;
        setCartItems([]);
        showToast.success('Cart cleared', `${count} items removed`);
    };

    const updateQuantity = async (productId, newQuantity, productName) => {
        if (newQuantity < 1) {
            removeFromCart(productId, productName);
            return;
        }

        setLoading(true);
        try {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

        } catch (error) {
            showToast.error('Update failed', 'Could not update quantity');
        } finally {
            setLoading(false);
        }
    };

    const completeOrder = (orderDetails) => {

        const newOrder = {
            id: `order_${Crypto.randomUUID()}`,
            orderNumber: `ORD-${Date.now().toString().slice(-8)}`,


            customerInfo: {
                fullName: orderDetails.fullName,
                email: orderDetails.email,
                phone: orderDetails.phone,
                address: orderDetails.address,
                city: orderDetails.city,
                postalCode: orderDetails.postalCode,
                country: orderDetails.country,
            },


            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                color: item.color
            })),


            paymentMethod: orderDetails.selectedPayment,
            deliveryMethod: orderDetails.selectedDelivery,
            deliveryPrice: orderDetails.deliveryPrice,


            subtotal: orderDetails.subtotal,
            tax: orderDetails.tax,
            total: orderDetails.total,


            status: 'completed',
            date: new Date().toISOString(),
        };


        setCompletedOrders(prev => [newOrder, ...prev]);


        setCartItems([]);


        showToast.success('Order Placed!', `Order #${newOrder.orderNumber}`);

        return newOrder;
    };

    const getCompletedOrders = () => {
        return completedOrders;
    };

    const getOrderById = (orderId) => {
        return completedOrders.find(order => order.id === orderId);
    };
    const clearAllOrders = () => {
        if (completedOrders.length === 0) return;

        try {
            setCompletedOrders([]);
            showToast.success('Orders Cleared', 'All orders have been removed');
        } catch {
            showToast.error('Error', 'Please try again later')
        }
    };
    const refreshOrders = async () => {
    setRefreshingOrders(true);
    
    try {
      
        setCompletedOrders(prev => [...prev]); 
        showToast.success('Refreshed', 'Orders updated');
    } catch (error) {
        showToast.error('Refresh failed', 'Could not refresh orders');
    } finally {
        setRefreshingOrders(false);
    }
};



    const value = {
        cartItems,
        completedOrders,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        completeOrder,
        getCompletedOrders,
        getOrderById,
        clearAllOrders,
        refreshOrders,        
        refreshingOrders,
        loading
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}