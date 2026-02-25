import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function ImagePickerButtons({
    onGalleryPress,
    onCameraPress,
    loading = false,
    error = null, 
    onClearError   
}) {
    const { theme } = useTheme();

    const handleGalleryPress = async () => {
        if (onGalleryPress) {
            await onGalleryPress();
          
            if (onClearError) onClearError();
        }
    };

    const handleCameraPress = async () => {
        if (onCameraPress) {
            await onCameraPress();
            if (onClearError) onClearError();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={[styles.label, { color: theme.colors.textCard }]}>
                    Image *
                </Text>
                {error && (
                    <View style={styles.errorBadge}>
                        <Text style={styles.errorBadgeText}>!</Text>
                    </View>
                )}
            </View>

            <View style={[
                styles.imageButtons,
                error && styles.imageButtonsError 
            ]}>
                <TouchableOpacity
                    style={[
                        styles.imageButton,
                        { backgroundColor: theme.colors.primary },
                        loading && styles.disabledButton
                    ]}
                    onPress={handleGalleryPress}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>Gallery</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.imageButton,
                        { backgroundColor: theme.colors.primary },
                        loading && styles.disabledButton
                    ]}
                    onPress={handleCameraPress}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>Camera</Text>
                    )}
                </TouchableOpacity>
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    errorBadge: {
        backgroundColor: '#FF3B30',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    imageButtons: {
        flexDirection: 'row',
        gap: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 10,
        padding: 2,
    },
    imageButtonsError: {
        borderColor: '#FF3B30',
        backgroundColor: 'rgba(255, 59, 48, 0.05)',
    },
    imageButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.5,
    },
    errorContainer: {
        marginTop: 8,
        padding: 8,
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        fontWeight: '500',
    },
});

