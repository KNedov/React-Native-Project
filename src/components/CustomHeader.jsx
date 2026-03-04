import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/cart/useCart';

export default function CustomHeader({ 
  navigation, 
  title, 
  theme,
  onClearAll 
}) {
  const { cartItems } = useCart();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.leftContainer}>
        {navigation && (
          <TouchableOpacity
           onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
           >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>

      <Text 
        style={[styles.headerTitle, { color: theme.colors.text }]}
        numberOfLines={1}
      >
        {title || 'Category'}
      </Text>

      <View style={styles.rightContainer}>
        {onClearAll && cartItems?.length > 0 && ( 
          <TouchableOpacity onPress={onClearAll}>
            <Text style={[styles.clearText, { color: theme.colors.primary }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  leftContainer: {
    width: 60,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 60,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  clearText: {
    fontSize: 16,
    fontWeight: '500',
  },
});