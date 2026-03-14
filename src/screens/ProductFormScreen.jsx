import { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    Switch,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/auth/useAuth';
import { useProducts } from '../contexts/products/useProducts';
import { useInputRefs } from '../hooks/useInputRef';
import ImagePickerButtons from '../components/ImagePickerButtons';
import { useImagePick } from '../hooks/useImagePick';
import { useFormValidation } from '../hooks/useFormValidation';
import Toast from 'react-native-toast-message';
import { CATEGORIES } from '../utils/constantUtil';
import { useLoadProductForEdit } from '../hooks/useLoadProductForEdit';
import { showToast } from '../utils/toast';
import CustomHeader from '../components/CustomHeader';

export default function ProductFormScreen({ navigation, route }) {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { setRef, focusNextInput } = useInputRefs();
    const [useImagePicker, setUseImagePicker] = useState(false);
    

    const isTogglingRef = useRef(false);
    const isInitialLoadRef = useRef(true);
    const previousImageUrlRef = useRef('');
    
    const {
        loading,
        createProduct,
        updateProduct,
        getProductById
    } = useProducts();

    const {
        image,
        loadingPick,
        pickFromGallery,
        takePhoto,
        resetImage
    } = useImagePick();

    const {
        formData,
        handleFieldChange,
        errors,
        validateProductForm,
        clearError,
        clearAllErrors,
        loadProductForm
    } = useFormValidation();
    
    const isEditMode = route.params?.mode === 'edit';
    const productId = route.params?.productId;

    useLoadProductForEdit(
        productId,
        isEditMode,
        getProductById,
        loadProductForm
    );


    useEffect(() => {
        if (image && useImagePicker) {
            handleFieldChange('imageUrl', image.uri);
        }
    }, [image, useImagePicker]);

    useEffect(() => {
        if (isEditMode && formData.imageUrl && isInitialLoadRef.current) {
            const isFirebaseImage = formData.imageUrl.includes('firebasestorage');
            setUseImagePicker(isFirebaseImage);
            previousImageUrlRef.current = formData.imageUrl;
            isInitialLoadRef.current = false;
        }
    }, [isEditMode, formData.imageUrl]);

    const handleToggleChange = (value) => {
        isTogglingRef.current = true;
        
        setUseImagePicker(value);
        
        if (!value) {
            
            resetImage();
           
            handleFieldChange('imageUrl', formData.imageUrl);
        } else {
            handleFieldChange('imageUrl', '');
            resetImage();
        }
     
        if (errors.image) clearError('image');
        if (errors.imageUrl) clearError('imageUrl');
       
        setTimeout(() => {
            isTogglingRef.current = false;
        }, 100);
    };

    const handleUrlTextChange = (text) => {
        handleFieldChange('imageUrl', text);

        if (!isTogglingRef.current && image) {
            resetImage();
        }
    };

    const handleCreate = async () => {
        clearAllErrors();
        const isValid = validateProductForm(formData, image);

        if (!isValid) {
            return;
        }

        const newProduct = {
            ...formData,
            price: parseFloat(formData.price),
            discount: parseInt(formData.discount) || 0,
            userId: user.id,
            created_at: new Date().toISOString()
        };

        try {
            await createProduct(newProduct);
            resetImage();
            setUseImagePicker(false);
            isInitialLoadRef.current = true;

            Toast.show({
                type: 'success',
                text1: 'Product Added!',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                onShow: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeTab' }]
                    });
                }
            });
        } catch (error) { 
            showToast.error('Create Product Failed', error.message || 'Please try again');
        }
    };

    const handleEdit = async () => {
        const updatedData = {
            ...formData,
            price: parseFloat(formData.price),
            discount: parseInt(formData.discount) || 0,
            userId: user.id,
            updated_at: new Date().toISOString()
        };

        try {
            await updateProduct(productId, updatedData);
            
            Toast.show({
                type: 'success',
                text1: 'Product Updated!',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                onShow: () => {
                    navigation.goBack();
                }
            });
        } catch (error) {
            showToast.error('Update Products Failed', error.message || 'Please try again');
        } finally {
            resetImage();
            setUseImagePicker(false);
            isInitialLoadRef.current = true;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <CustomHeader
                        theme={theme}
                        title={`${isEditMode ? 'Edit' : 'Create New'} Product`}
                    />

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>
                            Name <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.backgroundColor },
                                { color: theme.colors.text },
                                errors.name && styles.inputError
                            ]}
                            value={formData.name}
                            onChangeText={(text) => handleFieldChange('name', text)}
                            placeholder="iPhone 17 Pro Max"
                            placeholderTextColor={theme.colors.textCreate}
                            returnKeyType="go"
                            ref={setRef("nameInput")}
                            onSubmitEditing={() => focusNextInput("colorInput")}
                        />
                        {errors.name && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>
                            Color <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.backgroundColor },
                                { color: theme.colors.text },
                                errors.color && styles.inputError
                            ]}
                            value={formData.color}
                            onChangeText={(text) => handleFieldChange('color', text)}
                            placeholder="Gold, Black, Silver..."
                            placeholderTextColor={theme.colors.textCreate}
                            returnKeyType="go"
                            ref={setRef("colorInput")}
                            onSubmitEditing={() => focusNextInput("priceInput")}
                        />
                        {errors.color && (
                            <Text style={styles.errorText}>{errors.color}</Text>
                        )}
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.field, styles.halfWidth]}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>
                                Price ($) <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    { backgroundColor: theme.colors.backgroundColor },
                                    { color: theme.colors.text },
                                    errors.price && styles.inputError
                                ]}
                                value={formData.price}
                                onChangeText={(text) => handleFieldChange('price', text)}
                                placeholder="1449.00"
                                placeholderTextColor={theme.colors.textCreate}
                                keyboardType="decimal-pad"
                                returnKeyType="next"
                                ref={setRef("priceInput")}
                                onSubmitEditing={() => focusNextInput("discountInput")}
                            />
                            {errors.price && (
                                <Text style={styles.errorText}>{errors.price}</Text>
                            )}
                        </View>

                        <View style={[styles.field, styles.halfWidth]}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>
                                Discount (%) <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    { backgroundColor: theme.colors.backgroundColor },
                                    { color: theme.colors.text },
                                    errors.discount && styles.inputError
                                ]}
                                value={formData.discount}
                                onChangeText={(text) => handleFieldChange('discount', text)}
                                placeholder="20"
                                placeholderTextColor={theme.colors.textCreate}
                                keyboardType="number-pad"
                                returnKeyType="go"
                                ref={setRef("discountInput")}
                                onSubmitEditing={() => focusNextInput("imageInput")}
                            />
                            {errors.discount && (
                                <Text style={styles.errorText}>{errors.discount}</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>
                            Image Source
                        </Text>
                        <View style={styles.toggleRow}>
                            <Text style={{ color: theme.colors.text }}>URL</Text>
                            <Switch
                                value={useImagePicker}
                                onValueChange={handleToggleChange}
                            />
                            <Text style={{ color: theme.colors.text }}>Camera/Gallery</Text>
                        </View>
                    </View>

                    {!useImagePicker && (
                        <View style={styles.field}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>
                                Image URL <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    { backgroundColor: theme.colors.backgroundColor },
                                    { color: theme.colors.text },
                                    errors.imageUrl && styles.inputError
                                ]}
                                value={formData.imageUrl}
                                onChangeText={handleUrlTextChange}
                                placeholder="https://example.com/image.jpg"
                                placeholderTextColor={theme.colors.textCreate}
                                ref={setRef("imageInput")}
                                returnKeyType="go"
                                onSubmitEditing={() => focusNextInput('descriptionInput')}
                            />
                            {errors.imageUrl && (
                                <Text style={styles.errorText}>{errors.imageUrl}</Text>
                            )}
                        </View>
                    )}

                    <View style={styles.field}>
                        {useImagePicker && (
                            <ImagePickerButtons
                                onGalleryPress={async () => {
                                    const selectedImage = await pickFromGallery();
                                    if (selectedImage) {
                                        if (errors.image) clearError('image');
                                        if (errors.imageSource) clearError('imageSource');
                                    }
                                }}
                                onCameraPress={async () => {
                                    const takenPhoto = await takePhoto();
                                    if (takenPhoto) {
                                        if (errors.image) clearError('image');
                                        if (errors.imageSource) clearError('imageSource');
                                    }
                                }}
                                loading={loadingPick}
                                error={errors.image}
                                onClearError={() => clearError('image')}
                            />
                        )}

                        {image && useImagePicker && (
                            <View style={styles.imagePreviewContainer}>
                                <Image
                                    source={{ uri: image.uri }}
                                    style={styles.preview}
                                />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => {
                                        resetImage();
                                        handleFieldChange('imageUrl', '');
                                        if (errors.image) clearError('image');
                                        if (errors.imageSource) clearError('imageSource');
                                    }}
                                >
                                    <Text style={styles.removeImageText}>✕ Remove</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>
                            Description <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            ref={setRef("descriptionInput")}
                            style={[
                                styles.input,
                                { backgroundColor: theme.colors.backgroundColor },
                                { color: theme.colors.text },
                                styles.textArea,
                                errors.description && styles.inputError
                            ]}
                            value={formData.description}
                            onChangeText={(text) => handleFieldChange('description', text)}
                            placeholder="Detailed product description..."
                            placeholderTextColor={theme.colors.textCreate}
                            multiline
                            numberOfLines={4}
                        />
                        {errors.description && (
                            <Text style={styles.errorText}>{errors.description}</Text>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>
                            Category <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={[styles.pickerContainer, { backgroundColor: theme.colors.backgroundColor, borderColor: theme.colors.border || '#333333' }]}>
                            <Picker
                                selectedValue={formData.categoryId}
                                onValueChange={(value) => handleFieldChange('categoryId', value)}
                                style={[styles.picker, { color: theme.colors.text }]}
                                dropdownIconColor={theme.colors.text}
                            >
                                {CATEGORIES.map((category) => (
                                    <Picker.Item
                                        key={category.categoryId}
                                        label={category.title}
                                        value={category.categoryId}
                                        color={theme.colors.text}
                                    />
                                ))}
                            </Picker>
                        </View>
                        {errors.categoryId && (
                            <Text style={styles.errorText}>{errors.categoryId}</Text>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: theme.colors.textCard }]}>
                            Featured <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={[styles.pickerContainer, { backgroundColor: theme.colors.backgroundColor, borderColor: theme.colors.border || '#333333' }]}>
                            <Picker
                                selectedValue={formData.featured}
                                onValueChange={(value) => handleFieldChange('featured', value)}
                                style={[styles.picker, { color: theme.colors.text }]}
                                dropdownIconColor={theme.colors.text}
                            >
                                <Picker.Item label="No" value={false} color={theme.colors.text} />
                                <Picker.Item label="Yes" value={true} color={theme.colors.text} />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.cancelButton, { backgroundColor: theme.colors.cancelButton || '#333333' }]}
                            onPress={() => navigation.goBack()}
                            disabled={loading}
                        >
                            <Text style={[styles.cancelText, { color: theme.colors.text }]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.createButton, loading && styles.createButtonDisabled]}
                            onPress={isEditMode ? handleEdit : handleCreate}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Text style={styles.createText}>
                                    {isEditMode ? 'Save Changes' : 'Create Product'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
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
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
    },
    pickerContainer: {
        borderRadius: 8,
        borderWidth: 1,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    preview: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    inputError: {
        borderColor: '#FF3B30',
        borderWidth: 1.5,
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
        justifyContent: 'center',
        minHeight: 50,
    },
    createButtonDisabled: {
        opacity: 0.6,
    },
    createText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    cancelText: {
        fontSize: 16,
    },
    imagePreviewContainer: {
        marginTop: 10,
    },
    removeImageButton: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 8,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    removeImageText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
});