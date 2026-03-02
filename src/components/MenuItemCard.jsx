import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../hooks/useTheme"
import { Ionicons } from '@expo/vector-icons';

export default function MenuItemCard({
    cardLogo,
    cardName,
    context,
    onPress,
    counter=0

}) {
    const { theme } = useTheme()
    return (
        <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.colors.backgroundCard }]}
            onPress={onPress}
        >
            <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.text + '20' }]}>
                    <Ionicons name={cardLogo} size={24} color={theme.colors.primary} />
                </View>
                <View>
                    <Text style={[styles.menuItemTitle, { color: theme.colors.textCard }]}>
                        {cardName}
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: theme.colors.textCard }]}>
                        {context}
                    </Text>
                </View>
            </View>
            <View style={styles.menuItemRight}>
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{counter}</Text>
                    </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textCard} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 16,
    },
    menuIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuItemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    menuItemSubtitle: {
        fontSize: 12,
        marginTop: 2,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cartBadge: {
        backgroundColor: '#FF3B30',
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },

})