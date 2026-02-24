import { Image, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useTheme } from '../hooks/useTheme'
import { Ionicons } from '@expo/vector-icons';

export default function ProfileInfoCard({ defaultImage, user }) {
    const { theme } = useTheme()

    return (
        <View style={[styles.profileCard, { backgroundColor: theme.colors.backgroundCard }]}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: user?.image || defaultImage }}
                    style={styles.profileImage}
                />
                <TouchableOpacity
                    style={[styles.editImageButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => Alert.alert('Coming Soon', 'Image upload will be available soon')}
                >
                    <Ionicons name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <Text style={[styles.profileName, { color: theme.colors.text }]}>
                {user?.name || 'User Name'}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.colors.textCard }]}>
                {user?.email || 'email@example.com'}
            </Text>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>0</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.textCard }]}>Orders</Text>
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#007AFF',
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333333',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#333333',
    },
})