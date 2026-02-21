import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from 'react-native-worklets';
import { Ionicons } from '@expo/vector-icons';
import ItemCard from "./ItemCard";

export default function ItemCardWithGesture({ 
    item,
    onPress,
    onDelete,
}) {
    const positionX = useSharedValue(0);
    const scale = useSharedValue(1);

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
        const opacity = Math.min(Math.max((-positionX.value - 50) / 150, 0), 1);
        
        return {
            opacity,
            transform: [
                { scale: opacity * 0.5 + 0.5 }
            ],
        };
    });
    
  const deleteGesture = Gesture.Pan()
        .activeOffsetX(-20)
        .onUpdate((event) => {
            positionX.value = event.translationX;
        })
        .onEnd((event) => {
            if (event.translationX < -300) {
               
                return scheduleOnRN(onDelete, item.id);
            }

            positionX.value = 0;
        });
    
    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            scheduleOnRN(onPress, item.id);
        });
    
    const combinedGesture = Gesture.Race(deleteGesture, tapGesture);
    
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
                        right: 20, 
                        top: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 0,
                        pointerEvents: 'none',
                    }
                ]}
            >
                <View style={{ 
                    backgroundColor: '#fee2e2', 
                    borderRadius: 20, 
                    padding: 8,
                    width: 80,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Ionicons name="trash-outline" size={60} color="#b40000" />
                </View>
            </Animated.View>
        </View>
    );
}