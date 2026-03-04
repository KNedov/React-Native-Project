import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from "../hooks/useTheme";
import { useCart } from '../contexts/cart/useCart';
import Toast from 'react-native-toast-message';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import CartFooter from '../components/CartFooter';
import { calculateSubtotal, calculateTotal, calculateTax } from '../utils/cartUtils'
import CustomHeader from '../components/CustomHeader';

export default function CartScreen({ navigation, route }) {
    const { theme } = useTheme();
    const {
        cartItems,
        removeFromCart,
        clearCart,
        updateQuantity,
    } = useCart();
    const isCartModal = route.name === "CartModal"
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (cartItems) {
            setLoading(false);
        }
    }, [cartItems]);

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        setUpdating(true);
        try {
            updateQuantity(itemId, newQuantity);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to update quantity',
                position: 'bottom',
                visibilityTime: 2000,
            });
        } finally {
            setUpdating(false);
        }
    };

    const handleRemoveItem = (item) => {
        Toast.show({
            type: 'confirm',
            text1: 'Remove Item',
            text2: `Are you sure you want to remove ${item.name}?`,
            position: 'top',
            autoHide: false,
            props: {
                onConfirm: () => {
                    removeFromCart(item.id);
                    Toast.show({
                        type: 'success',
                        text1: 'Item Removed',
                        text2: item.name,
                        position: 'top',
                        visibilityTime: 1500,
                    });
                },
                onCancel: () => { }
            }
        });
    };

    const handleClearCart = () => {
        if (cartItems.length === 0) return;

        Toast.show({
            type: 'confirm',
            text1: 'Clear Cart',
            text2: `Are you sure you want to remove all items?`,
            position: 'top',
            autoHide: false,
            props: {
                onConfirm: () => {
                    clearCart();
                    Toast.show({
                        type: 'success',
                        text1: 'Cart Cleared',
                        text2: 'All items have been removed',
                        position: 'top',
                        visibilityTime: 1500,
                    });
                },
                onCancel: () => { }
            }
        });
    };


    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Toast.show({
                type: 'info',
                text1: 'Empty Cart',
                text2: 'Your cart is empty',
                position: 'bottom',
                visibilityTime: 2000,
            });
            return;
        }

        navigation.navigate('Checkout', {
            items: cartItems,
            total: calculateTotal(cartItems),
            subtotal: calculateSubtotal(cartItems),
            tax: calculateTax(cartItems),
        });
    };

    const handleStartShopping = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'HomeTab',

                }
            ],
        });
    };

    if (loading) {
        return (
            
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
           
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {!isCartModal &&
                <CustomHeader
                    navigation={navigation}
                    theme={theme}
                    title={'Shopping Cart'}
                    onClearAll={handleClearCart}
                    isCartModal={isCartModal}
                />}


            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        theme={theme}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        updating={updating}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <EmptyCart
                        theme={theme}
                        onStartShopping={handleStartShopping}
                        isCartModal={isCartModal}
                    />
                }
            />


            {cartItems.length > 0 && (
                <CartFooter
                    theme={theme}
                    subtotal={calculateSubtotal(cartItems)}
                    tax={calculateTax(cartItems)}
                    total={calculateTotal(cartItems)}
                    onCheckout={handleCheckout}
                    updating={updating}
                    taxRate={20}
                    isCartModal={isCartModal}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'around',
        gap: 70,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,

    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    clearText: {
        fontSize: 16,
        fontWeight: '500',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop:5
    }
});