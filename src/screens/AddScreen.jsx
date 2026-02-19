

import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Picker } from '@react-native-picker/picker';
import { itemsApi } from '../api';


export default function AddScreen({ navigation }) {
    const { theme } = useTheme()

    const [formData, setFormData] = useState({
        name: '',
        color: '',
        description: '',
        price: '',
        discount: "0",
        featured: false,
        imageUrl: '',
        categoryId: 'cat-1',

    });

    const categories = [
        { categoryId: 'cat-1', title: 'Phones', icon: 'phone-portrait-outline' },
        { categoryId: 'cat-2', title: 'Tablets', icon: 'tablet-landscape-outline' },
        { categoryId: 'cat-3', title: 'Monitors', icon: 'tv-outline' },
        { categoryId: 'cat-4', title: 'Laptops', icon: 'laptop-outline' },
        { categoryId: 'cat-5', title: 'Computers', icon: 'journal-outline' },
        { categoryId: 'cat-6', title: 'TVs', icon: 'tv-sharp' },
    ];



    const handleCreate = async () => {

        if (!formData.name || !formData.color || !formData.description || !formData.price) {
            Alert.alert('Грешка', 'Моля попълнете всички задължителни полета');
            return;
        }


        const newProduct = {
            ...formData,
            price: parseFloat(formData.price),
            discount: parseInt(formData.discount) || 0,
        };

         await itemsApi.create(newProduct)
        setFormData({
            name: '',
            color: '',
            description: '',
            price: '',
            discount: "0",
            featured: false,
            imageUrl: '',
            categoryId: '',

        })
        Alert.alert('Успех', 'Продуктът е създаден', [
            {
                text: 'OK', onPress: () => navigation.navigate('HomeTab', {
                    screen: 'Home',
                    params: { refresh: true, timestamp: Date.now() }
                })
            }
        ]);
    };



    return (

        <View style={[styles.container, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                 keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 110}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={[styles.title, { color: theme.colors.textCard }]}>Create New Product</Text>


                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>Name <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }]}
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                            placeholder=" iPhone 17 Pro Max" a
                            placeholderTextColor={theme.colors.textCreate}
                        />
                    </View>


                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>Image <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }]}
                            value={formData.imageUrl}
                            onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
                            placeholder="Image URL"
                            placeholderTextColor={theme.colors.textCreate}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>Color <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }]}
                            value={formData.color}
                            onChangeText={(text) => setFormData({ ...formData, color: text })}
                            placeholder="Gold, Black, Silver..."
                            placeholderTextColor={theme.colors.textCreate}
                        />
                    </View>


                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>Description <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }, styles.textArea]}
                            value={formData.description}
                            onChangeText={(text) => setFormData({ ...formData, description: text })}
                            placeholder="Detailed product description..."
                            placeholderTextColor={theme.colors.textCreate}
                            multiline
                            numberOfLines={4}
                        />
                    </View>


                  

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>Category <Text style={styles.required}>*</Text></Text>
                        <View style={[styles.pickerContainer, theme.colors.backgroundColor]}>
                            <Picker
                                selectedValue={formData.categoryId}
                                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                                style={[styles.picker,{color:theme.colors.textCard,backgroundColor:theme.colors.backgroundColor}]}
                                dropdownIconColor={theme.colors.text}
                            >
                                {categories.map((category) => (
                                    <Picker.Item
                                        key={category.id}
                                        label={category.title}
                                        value={category.categoryId}
                                        color="#000000"

                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>Featured <Text style={styles.required}>*</Text></Text>
                        <View style={[styles.pickerContainer,{backgroundColor: theme.colors.backgroundColor}]}>
                            <Picker
                                selectedValue={formData.featured}
                                onValueChange={(value) => setFormData({ ...formData, featured: value })}
                                style={[styles.picker,{color:theme.colors.textCard}]}
                                dropdownIconColor={theme.colors.text}
                            >
                                <Picker.Item
                                    key={1}
                                    label={'false'}
                                    value={false}
                                    color="#000000"

                                />
                                <Picker.Item
                                    key={2}
                                    label={'true'}
                                    value={true}
                                    color="#000000"

                                />
                            </Picker>
                        </View>
                    </View>

                      <View style={styles.row}>
                        <View style={[styles.field, styles.halfWidth]}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>Price ($) <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }]}
                                value={formData.price}
                                onChangeText={(text) => setFormData({ ...formData, price: text })}
                                placeholder="1449.00"
                                placeholderTextColor={theme.colors.textCreate}
                                keyboardType="decimal-pad"
                            />
                        </View>

                        <View style={[styles.field, styles.halfWidth]}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>Discount (%)</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.colors.backgroundColor }, { color: theme.colors.text }]}
                                value={formData.discount}
                                onChangeText={(text) => setFormData({ ...formData, discount: text })}
                                placeholder="20"
                                placeholderTextColor={theme.colors.textCreate}
                                keyboardType="number-pad"
                            />
                        </View>
                    </View>


                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={handleCreate}
                        >
                            <Text style={styles.createText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    field: {
        marginBottom: 16,
    },
    label: {

        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    required: {
        color: '#FF3B30',
    },
    input: {
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333333',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 12,
    },
    createButton: {
        flex: 2,
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    createText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#333333',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelText: {
        color: '#E0E0E0',
        fontSize: 16,
    },
    pickerContainer: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333333',
        overflow: 'hidden',
    }, picker: {
       
        height: 50,
    },
});
