import { FlatList, View, StyleSheet, Text, } from "react-native";
import { useMemo } from 'react'
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
    const {
        deleteProduct,
        getProductsByCategory,
        loading
    } = useProducts()


    async function deleteProductHandler(itemId, imageUrl) {
          Toast.show({
                    type: 'confirm',
                    text1: `Are you sure you want to delete item?`,
                    position: 'top',
                    autoHide: false,
                    topOffset:450,
                    props: {
                        onConfirm: () => {
                            deleteProduct(itemId, imageUrl)
                        },
                        onCancel: () => {}
                    }
                });
        
    }

    async function cartHandler(product) {
    try {
        
        addToCart(product);
        
       showToast.success('Added to Cart',`${product.name} has been added to your cart`)
    
        
    } catch (error) {
       
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
        return getProductsByCategory(categoryId);
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
