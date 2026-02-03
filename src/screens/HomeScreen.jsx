import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { categoryApi,itemsApi } from "../api";
export default function HomeScreen() {
    const [categories,setCategories]=useState([])
    const [refreshing,setRefreshing]=useState(true)
    const [featured,setFeatured]=useState([])
    const [toggleRefresh,SetToggleRefresh]=useState(true)


    useEffect(() => {
        async function fetchData() {
            setRefreshing(true);
            try {
                const categoryData=await categoryApi.getAll();
                setCategories(categoryData.data);

                const featuredData= await itemsApi.getFeatured();
                setFeatured(featuredData.data)

            } catch (error) {
                alert('Cannot load data')
            } finally{
                setRefreshing(false)
            }
        }

        fetchData()
    },[toggleRefresh])

    return (
        <ScrollView>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                {
                    categories.map((category)=>{
                        console.log(category);
                        
                        return(
                            <Text key={category.id}>{category.title}</Text>
                        )
                    })
                }
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        backgroundColor: '#007AFF',
        padding: 24,
        paddingTop: 16,
        paddingBottom: 28,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    restaurantName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    infoDot: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.6,
        marginHorizontal: 8,
    },
    tagline: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
    },
    section: {
        padding: 16,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    featuredList: {
        paddingRight: 16,
        flexDirection: 'row',
    },
    featuredCard: {
        width: 200,
        marginRight: 12,
    },
    bottomPadding: {
        height: 24,
    },
});