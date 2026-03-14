import { useState } from "react";
import { ScrollView, Text, View, RefreshControl, StyleSheet, ActivityIndicator } from "react-native";

import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import NewCard from "../components/NewCard";
import { useTheme } from "../hooks/useTheme";

import { useProducts } from "../contexts/products/useProducts";
import { Ionicons } from "@expo/vector-icons"
import { CATEGORIES } from "../utils/constantUtil"
import CustomHeader from "../components/CustomHeader";
export default function HomeScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false)
    const { theme } = useTheme();
    const {
        featuredItems,
        lastProduct,
        loading,
        refreshProducts,
    } = useProducts()

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshProducts();
        setRefreshing(false);
    };

    const categoryPressHandler = (categoryId) => {
        navigation.navigate('Category', { categoryId })
    };
    
    const productPressHandler = (productId) => {
        navigation.navigate('Details', { productId })
    };

    return (
        loading && !refreshing && !featuredItems?.length
            ?
            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' },{backgroundColor:theme.colors.background}]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <CustomHeader
                title={'Home'}
                theme={theme}
                />
                {lastProduct && <NewCard lastProduct={lastProduct} onPress={() => navigation.navigate('Details', { productId: lastProduct.id })} />}

                <View style={styles.section}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Categories</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}  >

                        <View style={{ gap: 12, flexDirection: 'row' }}>
                            {CATEGORIES.map((category) => {
                                return (
                                    <CategoryCard
                                        key={category.categoryId}
                                        {...category}
                                        onPress={categoryPressHandler}
                                    />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Featured Items</Text>

                    {featuredItems?.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ gap: 12, flexDirection: 'row' }}>
                                {featuredItems?.map((item) => (
                                    <View key={item.id} style={styles.featuredCard}>
                                        <ProductCard {...item} onPress={productPressHandler} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={[styles.emptyContainer, { backgroundColor: theme.colors.backgroundCard }]}>
                            <Ionicons name="heart-outline" size={60} color={theme.colors.textSecondary} />
                            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                                No Featured Items
                            </Text>
                            <Text style={[styles.emptyDescription, { color: theme.colors.textSecondary }]}>
                                Check back later for new featured products
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>


    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold'
    },
    section: {

        paddingBottom: 8,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    featuredCard: {
        width: 200,
        margin: 'auto',

    },
    featuredList: {
        paddingBottom: 8
    },
    image: {
        width: '40%',
        height: '100%',
        marginTop: 5,
        position: 'center',
        margin: 10
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'relative',
        height: 180,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 240,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    emptyImage: {
        width: 140,
        height: 140,
        marginBottom: 16,
        opacity: 0.9,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.7,
        maxWidth: 200,
        lineHeight: 20,
    },

})