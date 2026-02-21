import { FlatList, View, StyleSheet,Text } from "react-native";
import { useEffect, useState } from 'react'
import { getAllByCategoryId, deleteItem } from "../api/itemsApi"
import ItemCardWithGesture from "../components/ItemCardWithGesture"
import { useTheme } from "../hooks/useTheme";

export default function CategoryScreen({ route, navigation }) {
    
    const [items, setItems] = useState([])
    const { categoryId } = route.params;
    const { theme } = useTheme();


    async function deleteItemHandler(itemId) {
        try {

            const data = await deleteItem(itemId)
            setItems((oldItems) => oldItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getCategoryItems(categoryId) {
            try {
                const data = await getAllByCategoryId(categoryId)
                setItems(data.data)
            } catch (error) {
                console.error('Error: ' + error)
            }
        }
        getCategoryItems(categoryId)
    }, [categoryId])

    return (

        <View style={{ flex: 1 }}>
            {items.length === 0
                ? <View style={[styles.emptyBox,{backgroundColor:theme.colors.backgroundCard}]}>
                    <Text style={[styles.emptyText,{color:theme.colors.text}]}>No products</Text>
                </View>
                :
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) =>
                        <ItemCardWithGesture
                            item={item}
                            index={index}
                            onPress={() => navigation.navigate('Details', { itemId: item.id })}
                            onDelete={() => deleteItemHandler(item.id)}
                        />
                    }
                />
            }

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
    }
})
