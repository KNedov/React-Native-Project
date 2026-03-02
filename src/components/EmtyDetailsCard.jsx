
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function EmptyDetailsCard({ navigation }) {
    const { theme } = useTheme();

    return (
        <>
            <StatusBar backgroundColor={theme.colors.backgroundColor} />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>





                <View style={styles.messageContainer}>
                    <Ionicons name="sad-outline" size={60} color={theme.colors.text} />
                    <Text style={[styles.message, { color: theme.colors.text }]}>
                        Product Not Found
                    </Text>
                    <Text style={[styles.subMessage, { color: theme.colors.text }]}>
                        This product may have been removed or is no longer available
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.colors.primary }]}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    imagePlaceholder: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    titlePlaceholder: {
        width: '70%',
        height: 28,
        borderRadius: 6,
        marginBottom: 12,
    },
    colorPlaceholder: {
        width: '40%',
        height: 20,
        borderRadius: 4,
        marginBottom: 16,
    },
    priceContainer: {
        marginBottom: 20,
    },
    pricePlaceholder: {
        width: '30%',
        height: 32,
        borderRadius: 6,
    },
    descriptionContainer: {
        gap: 8,
    },
    descriptionLine: {
        width: '100%',
        height: 16,
        borderRadius: 4,
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    message: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    subMessage: {
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        marginTop: 'auto',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});