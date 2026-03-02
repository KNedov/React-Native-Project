
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/auth/useAuth';
import { useTheme } from "../hooks/useTheme";
import ProfileInfoCard from '../components/ProfileInfoCard';
import MenuItemCard from '../components/MenuItemCard';
import { useCart } from '../contexts/cart/useCart';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({ navigation }) {
    const { theme } = useTheme();
    const { user, logout } = useAuth();
    const { cartItems, completedOrders } = useCart()




    const defaultImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    const handleLogout = () => {
        Toast.show({
            type: 'confirm',
            text1: `Are you sure you want to logout?`,
            position: 'top',
            autoHide: false,
            topOffset: 450,
            props: {
                onConfirm: () => {
                    logout();
                },
                onCancel: () => { }
            }
        });
    };



    const navigateToCart = () => {
        navigation.navigate('Cart');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { justifyContent: 'flex-start' }, { gap: 80 }, { marginBottom: 15 }, { marginStart: 20 }, { marginTop: 20 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                            User Profile
                        </Text>
                    </View>
                </View>
                <ProfileInfoCard
                    defaultImage={defaultImage}
                    user={user}
                />
                <View style={styles.menuContainer}>
                    <MenuItemCard
                        cardLogo={'cart-outline'}
                        cardName={'Shoping Cart'}
                        context={'View and manage your items'}
                        onPress={navigateToCart}
                        counter={cartItems?.length}
                    />
                    <MenuItemCard
                        cardLogo={'receipt-outline'}
                        cardName={'My Orders'}
                        context={'Track and view your orders'}
                        onPress={() => navigation.navigate('Orders')}
                        counter={completedOrders?.length}
                    />
                    <TouchableOpacity
                        style={[styles.logoutButton, { backgroundColor: theme.colors.backgroundCard }]}
                        onPress={handleLogout}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.backgroundContent }]}>
                                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                            </View>
                            <Text style={[styles.logoutText, { color: '#FF3B30' }]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    menuIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 16,
    },



    menuContainer: {
        marginHorizontal: 20,
        gap: 12,
    },






    logoutButton: {
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '500',
    },
    version: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 24,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        minHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBody: {
        gap: 16,
    },
    inputContainer: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
    },
    inputHint: {
        fontSize: 12,
        marginTop: 4,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#333333',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: 0.7,
    },
});



