import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from 'react-native-worklets';
import { Ionicons } from '@expo/vector-icons';
import ItemCard from "./ItemCard";
import { selectionAsync } from 'expo-haptics';
import { useAuth } from '../contexts/auth/useAuth';

export default function ItemCardWithGesture({
    item,
    onPress,
    onPressDelete,
    isDeleting,
    onPressEdit,
    onPressCart,
}) {
    const { user } = useAuth();
    const isOwner = user?.id === item?.userId;

    const positionX = useSharedValue(0);
    const scale = useSharedValue(1);
    const isOpen = useSharedValue(false);

    const cardAnimatedStyle = useAnimatedStyle(() => {
        const isSelected = scale.value > 1;
        return {
            transform: [
                { translateX: positionX.value },
                { scale: scale.value }
            ],
            zIndex: isSelected ? 2 : 1,
        };
    });

    const trashAnimatedStyle = useAnimatedStyle(() => {
        const opacity = Math.min(Math.abs(positionX.value) / 150, 1);
        return {
            opacity,
            transform: [
                { scale: 0.5 + opacity * 0.5 },
                { translateX: 20 - opacity * 40 }
            ],
        };
    });

    const deleteGesture = Gesture.Pan()
        .activeOffsetX(-20)
        .onUpdate((event) => {
            if (!isOpen.value) {
                positionX.value = event.translationX;
                if (event.translationX < -100) {
                    scheduleOnRN(selectionAsync);
                }
            }
        })
        .onEnd((event) => {
            if (!isOpen.value) {
                if (event.translationX < -120) {
                    positionX.value = withSpring(-180);
                    isOpen.value = true;
                } else {
                    positionX.value = withSpring(0);
                }
            }
        });

    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            if (isOpen.value) {
                positionX.value = withSpring(0);
                isOpen.value = false;
            } else {
                scheduleOnRN(onPress, item.id);
            }
        });

    const combinedGesture = Gesture.Race(deleteGesture, tapGesture);

    const handleEdit = () => {
        scheduleOnRN(onPressEdit, item.id);
        positionX.value = withSpring(0);
        isOpen.value = false;
    };

    const handleDelete = () => {
        scheduleOnRN(onPressDelete, item.id);
        positionX.value = withSpring(0);
        isOpen.value = false;
    };

    const handleCart = () => {
    onPressCart(item);
    positionX.value = withSpring(0);
    isOpen.value = false;
};

    return (
       <View style={{ position: 'relative' }}>
    <GestureDetector gesture={combinedGesture}>
        <Animated.View style={cardAnimatedStyle}>
            <ItemCard {...item} />
        </Animated.View>
    </GestureDetector>

    <Animated.View
        style={[
            trashAnimatedStyle,
            {
                position: 'absolute',
                right: 10,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
                pointerEvents: 'auto',
            }
        ]}
    >
        {isOwner ? (
            <View style={styles.buttonsContainer}>
                {!isDeleting ? (  
                    <>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={handleDelete}
                            activeOpacity={0.7}
                            disabled={isDeleting} 
                        >
                            <Ionicons name="trash-outline" size={32} color="#FF3B30" />
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.editButton]}
                            onPress={handleEdit}
                            activeOpacity={0.7}
                            disabled={isDeleting}  // ← и тук
                        >
                            <Ionicons name="pencil-outline" size={32} color="#007AFF" />
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <ActivityIndicator size="large" color="#007AFF" />  // ← ТУК!
                )}
            </View>
        ) : (
            <TouchableOpacity
                style={[styles.button, styles.cartButton]}
                onPress={handleCart}
                activeOpacity={0.7}
            >
                <Ionicons name="cart-outline" size={32} color="#007AFF" />
                <Text style={styles.cartText}>Cart</Text>
            </TouchableOpacity>
        )}
    </Animated.View>
</View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        padding: 8,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#444',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        borderColor: 'rgba(255, 59, 48, 0.3)',
    },
    editButton: {
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderColor: 'rgba(0, 122, 255, 0.3)',
    },
    deleteText: {
        color: '#FF3B30',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    editText: {
        color: '#007AFF',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 165, 0, 0.3)',
    },
    infoText: {
        color: '#FFA500',
        fontSize: 13,
        fontWeight: '500',
    },
    cartButton: {
    backgroundColor: '#F0F8FF',
    borderColor: '#007AFF',
},

cartText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
},
});