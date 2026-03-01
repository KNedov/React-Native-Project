import { FlatList, View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import { useEffect, useMemo, useState } from 'react'
import { getAllByCategoryId, deleteItem } from "../api/itemsApi"
import ItemCardWithGesture from "../components/ItemCardWithGesture"
import { useTheme } from "../hooks/useTheme";
import { useProducts } from "../contexts/products/useProducts";

export default function CategoryScreen({ route, navigation }) {

    const { categoryId } = route.params;
    const { theme } = useTheme();
    const {
        deleteProduct,
        getProductsByCategory,
        loading
    } = useProducts()


    async function deleteProductHandler(itemId, imageUrl) {
        deleteProduct(itemId, imageUrl)
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
                            onDelete={() => deleteProductHandler(item.id, item.imageUrl)}
                            onEdit={() => editProductHandler(item.id, item.imageUrl)}
                            loading={loading}
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
