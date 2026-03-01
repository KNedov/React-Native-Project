// hooks/useImagePicker.js
import { useState } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import { 
    launchImageLibraryAsync, 
    launchCameraAsync,
    requestMediaLibraryPermissionsAsync,
    requestCameraPermissionsAsync,
} from 'expo-image-picker';

export const useImagePick = () => {
    const [image, setImage] = useState(null);
    const [loadingPick, setLoadingPick] = useState(false);
    const [error, setError] = useState(null);

    const requestGalleryPermission = async () => {
        const { status } = await requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please grant gallery access to select images',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                        text: 'Open Settings', 
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:');
                            } else {
                                Linking.openSettings();
                            }
                        }
                    }
                ]
            );
            return false;
        }
        return true;
    };

    const requestCameraPermission = async () => {
        const { status } = await requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please grant camera access to take photos',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                        text: 'Open Settings', 
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:');
                            } else {
                                Linking.openSettings();
                            }
                        }
                    }
                ]
            );
            return false;
        }
        return true;
    };

    const pickFromGallery = async (options = {}) => {
        setLoadingPick(true);
        setError(null);
        
        try {
            const hasPermission = await requestGalleryPermission();
            if (!hasPermission) {
                setLoadingPick(false);
                return null;
            }

            const result = await launchImageLibraryAsync({
                mediaTypes: 'images',
                quality: 0.7,
                ...options,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImage = {
                    uri: result.assets[0].uri,
                    name: result.assets[0].fileName || `image_${Date.now()}.jpg`,
                    type: result.assets[0].type || 'image/jpeg',
                };
                setImage(selectedImage);
                setLoadingPick(false);
                return selectedImage;
            }
            
            setLoadingPick(false);
            return null;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            Alert.alert('Error', 'Failed to pick image from gallery');
            return null;
        }
    };

    const takePhoto = async (options = {}) => {
        setLoadingPick(true);
        setError(null);
        
        try {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
                setLoadingPick(false);
                return null;
            }

            const result = await launchCameraAsync({
                quality: 0.7,
                ...options,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const photo = {
                    uri: result.assets[0].uri,
                    name: `photo_${Date.now()}.jpg`,
                    type: 'image/jpeg',
                };
                setImage(photo);
                setLoadingPick(false);
                return photo;
            }
            
            setLoadingPick(false);
            return null;
        } catch (err) {
            setError(err.message);
            setLoadingPick(false);
            Alert.alert('Error', 'Failed to take photo');
            return null;
        }
    };

    const resetImage = () => {
        setImage(null);
        setError(null);
    };

    return {
        image,
        loadingPick,
        error,
        pickFromGallery,
        takePhoto,
        resetImage,
    };
};