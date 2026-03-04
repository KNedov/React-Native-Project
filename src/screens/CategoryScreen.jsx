import { FlatList, View, StyleSheet, Text, } from "react-native";
import { useMemo, useState } from 'react'
import ItemCardWithGesture from "../components/ItemCardWithGesture"
import { useTheme } from "../hooks/useTheme";
import { useProducts } from "../contexts/products/useProducts";
import { useCart } from "../contexts/cart/useCart";
import Toast from "react-native-toast-message";
import { showToast } from "../utils/toast";

export default function CategoryScreen({ route, navigation }) {
    const { addToCart } = useCart();
    const { categoryId } = route.params;
    const { theme } = useTheme();
    const [deletingId, setDeletingId] = useState(null);
    const {
        deleteProduct,
        getProductsByCategory,
        loading
    } = useProducts()


    async function deleteProductHandler(itemId, imageUrl) {
        setDeletingId(itemId);
        Toast.show({
            type: 'confirm',
            text1: 'Are you sure you want to delete this product?',
            position: 'top',
            autoHide: false,
            topOffset: 450,
            props: {
                onConfirm: async () => {
                    try {
                        await deleteProduct(itemId, imageUrl);

                        showToast.success('Product deleted successfully');
                    } catch (error) {
                        showToast.error('Delete Products Failed', error.message || 'Please try again')
                    } finally {
                        setDeletingId(null);
                    }

                },
                onCancel: () => {
                    setDeletingId(null);
                }
            }
        });
    }

    async function cartHandler(product) {
        try {
            addToCart(product);
            showToast.success('Added to Cart', `${product.name} has been added to your cart`)

        } catch {

            showToast.error('Failed to add item to cart')
        }
    }

    async function editProductHandler(itemId, imageUrl) {
        navigation.navigate(
            'Edit',
            {
                mode: 'edit',
                productId: itemId,
                imageUrl
            }
        );
    }

    const categoryProducts = useMemo(() => {
        const products = getProductsByCategory(categoryId);
        return [...products].sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );
    }, [getProductsByCategory, categoryId]);

    return (


        <View style={{ flex: 1 }}>
            {categoryProducts?.length === 0 ? (
                <View style={[styles.emptyBox, { backgroundColor: theme.colors.backgroundCard }]}>
                    <Text style={[styles.emptyText, { color: theme.colors.text }]}>No products</Text>
                </View>
            ) : (
                <FlatList
                    data={categoryProducts}
                    keyExtractor={(product) => product.id}
                    renderItem={({ item, index }) => (
                        <ItemCardWithGesture
                            item={item}
                            index={index}
                            onPress={() => navigation.navigate('Details', { productId: item.id })}
                            onPressDelete={() => deleteProductHandler(item.id, item.imageUrl)}
                            isDeleting={deletingId === item.id}
                            onPressEdit={() => editProductHandler(item.id, item.imageUrl)}
                            loading={loading}
                            onPressCart={cartHandler}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>


    )
}

const styles = StyleSheet.create({
    emptyBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    centered: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
