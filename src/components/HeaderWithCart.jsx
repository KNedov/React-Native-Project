import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/cart/useCart';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HeaderWithCart({ title }) {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { cartItems } = useCart();

  const handleCartPress = () => {
    navigation.navigate('CartModal');
  };

  return (
    <SafeAreaView 
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <View style={styles.container}>
        <View style={styles.leftSection} />
        
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>

        <View style={styles.rightSection}>
          <TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
            <View>
              <Ionicons name="cart-outline" size={24} color={theme.colors.text} />
              {cartItems?.length > 0 && (
                <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  leftSection: {
    minWidth: 40,
  },
  rightSection: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  cartButton: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});