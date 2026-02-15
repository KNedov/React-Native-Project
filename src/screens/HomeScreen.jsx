import { useEffect, useState } from "react";
import { ScrollView, Text, View, RefreshControl, StyleSheet } from "react-native";
import { categoryApi, itemsApi } from "../api";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import NewCard from "../components/NewCard";
import { useTheme } from "../hooks/useTheme";


export default function HomeScreen({navigation}) {
    const [categories, setCategories] = useState([])
    const [lastItem, setLastItem] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const [featured, setFeatured] = useState([])
    const [toggleRefresh, setToggleRefresh] = useState(true)
    const { theme } = useTheme();


    useEffect(() => {
        async function fetchData() {
            setRefreshing(true);
            try {
                const categoryData = await categoryApi.getAll();
                setCategories(categoryData.data);



                const featuredData = await itemsApi.getFeatured();
                setFeatured(featuredData.data)
                const data = await itemsApi.getLast();
                setLastItem(data);

            } catch (error) {
                alert('Cannot load data')
            } finally {
                setRefreshing(false)
            }
        }

        fetchData()
    }, [toggleRefresh])
    const refreshHandler = () => {
        setToggleRefresh(state => !state);
    };
    const categoryPressHandler = (categoryId) => {

        navigation.navigate('Category',{categoryId})
    };
    const itemPressHandler = (itemId) => {



        navigation.navigate('Details',{itemId})
    };



    return (

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />} >
            <NewCard lastItem={lastItem} onPress={itemPressHandler} />

            <View style={styles.section}>
                <Text style={[styles.title,{color:theme.colors.text}]}>Categories</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}  >

                    <View style={{ gap: 12, flexDirection: 'row' }}>
                        {categories.map((category) => {
                            return (
                                <CategoryCard
                                    key={category.id}
                                    {...category}
                                    onPress={categoryPressHandler}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.section}>
                <Text style={[styles.title,{color:theme.colors.text}]}>Featured Items</Text>
                <ScrollView horizontal style={styles.featuredList}>

                    <View style={{ gap: 12, flexDirection: 'row' }}>
                        {featured.map((item) => (
                            <View key={item.id} style={styles.featuredCard}>
                                <ProductCard
                                    {...item}
                                    onPress={itemPressHandler}
                                />
                            </View>
                        ))}
                    </View>

                </ScrollView>
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
})