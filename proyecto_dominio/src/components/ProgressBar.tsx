import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface ProgressBarProps {
  /** Valor de progreso entre 0 y 1 */
  progress: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  style,
  backgroundColor = "rgba(0,0,0,0.1)",
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Limitamos el progreso entre 0 y 1
    const clampedProgress = Math.max(0, Math.min(1, progress));

    Animated.timing(animatedValue, {
      toValue: clampedProgress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const colorInterpolated = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#ef4444", "#facc15", "#22c55e"], // Rojo -> Amarillo -> Verde
  });

  return (
    <View style={[styles.track, { height, backgroundColor }, style]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: widthInterpolated,
            backgroundColor: colorInterpolated,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});

export default ProgressBar;