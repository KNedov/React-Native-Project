
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    RefreshControl,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../hooks/useTheme";
import { useCart } from '../contexts/cart/useCart';
import Toast from 'react-native-toast-message';

export default function OrderScreen({ navigation }) {
    const { theme } = useTheme();
    const { completedOrders,clearAllOrders } = useCart();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        setRefreshing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#4CAF50';
            case 'processing': return '#FFA500';
            case 'cancelled': return '#FF3B30';
            case 'delivered': return '#007AFF';
            default: return '#A0A0A0';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return 'checkmark-circle';
            case 'processing': return 'time';
            case 'cancelled': return 'close-circle';
            case 'delivered': return 'checkmark-done-circle';
            default: return 'help-circle';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleStartShopping = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'HomeTab'

                }
            ],
        });
    };

 



    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.orderCard, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
            activeOpacity={0.7}
        >


            <View style={styles.orderHeader}>
                <View style={styles.orderHeaderLeft}>
                    <Text style={[styles.orderNumber, { color: theme.colors.primary }]}>
                        {item.orderNumber}
                    </Text>
                    <Text style={[styles.orderDate, { color: theme.colors.text }]}>
                        {formatDate(item.date)}
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Ionicons
                        name={getStatusIcon(item.status)}
                        size={14}
                        color={getStatusColor(item.status)}
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                </View>
            </View>

            <View style={styles.orderItemsPreview}>
                {item.items.slice(0, 3).map((product, index) => (
                    <Image
                        key={`${item.id}-${product.id}-${index}`}
                        source={{ uri: product.imageUrl }}
                        style={styles.previewImage}
                    />
                ))}
                {item.items.length > 3 && (
                    <View style={[styles.moreItemsBadge, { backgroundColor: theme.colors.background }]}>
                        <Text style={[styles.moreItemsText, { color: theme.colors.text }]}>
                            +{item.items.length - 3}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.orderFooter}>
                <View style={styles.orderFooterLeft}>
                    <Text style={[styles.itemsCount, { color: theme.colors.text }]}>
                        {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
                    </Text>
                    <Text style={[styles.deliveryMethod, { color: theme.colors.text }]}>
                        {item.deliveryMethod === 'express' ? '🚀 Express' :
                            item.deliveryMethod === 'pickup' ? '🏪 Pickup' : '📦 Standard'}
                    </Text>
                </View>
                <View style={styles.orderFooterRight}>
                    <Text style={[styles.orderTotal, { color: theme.colors.text }]}>
                        ${item.total?.toFixed(2)}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyOrders = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={100} color={theme.colors.text} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                No Orders Yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.text }]}>
                Looks like you haven't placed any orders yet
            </Text>
            <TouchableOpacity
                style={[styles.shopButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleStartShopping}
            >
                <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
        </View>
    );




    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                    My Orders
                </Text>
                <View style={{ width: 24 }} />
                {completedOrders.length > 0 && (
                    <View style={styles.actionsHeader}>
                        <TouchableOpacity
                            style={[styles.clearButton, { backgroundColor: theme.colors.card }]}
                            onPress={() => {
                                Toast.show({
                                            type: 'confirm',
                                            text1: 'Remove Item',
                                            text2: `Are you sure you want to remove All orders?`,
                                            position: 'top',
                                            autoHide: false,
                                            props: {
                                                onConfirm: () => {
                                                    clearAllOrders()
                                                    Toast.show({
                                                        type: 'success',
                                                        text1: 'Orders are Removed',
                                                        position: 'top',
                                                        bottomOffset:100,
                                                        visibilityTime: 1500,
                                                    });
                                                },
                                                onCancel: () => {}
                                            }
                                        });
                            }}
                        >
                            <Ionicons name="trash-bin-outline" size={20} color="#FF3B30" />
                            <Text style={[styles.clearButtonText, { color: '#FF3B30' }]}>
                                Clear All Orders
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>


            <FlatList
                data={completedOrders}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.primary}
                    />
                }
                ListEmptyComponent={renderEmptyOrders}
            />

            {completedOrders.length > 0 && (
                <View style={[styles.summaryBar, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.summaryText, { color: theme.colors.text }]}>
                        Total Orders: {completedOrders.length}
                    </Text>
                    <Text style={[styles.summaryText, { color: theme.colors.primary }]}>
                        Total Spent: ${completedOrders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}
                    </Text>
                </View>
            )}
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
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    orderCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
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
        marginBottom: 12,
    },
    orderHeaderLeft: {
        flex: 1,
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
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    orderItemsPreview: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 8,
    },
    previewImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    moreItemsBadge: {
        width: 60,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    moreItemsText: {
        fontSize: 14,
        fontWeight: '600',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#333333',
    },
    orderFooterLeft: {
        gap: 4,
    },
    itemsCount: {
        fontSize: 13,
    },
    deliveryMethod: {
        fontSize: 12,
    },
    orderFooterRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    orderTotal: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 40,
    },
    shopButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    shopButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    summaryBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#333333',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    summaryText: {
        fontSize: 14,
        fontWeight: '600',
    },
     actionsHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 8,
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    clearButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});