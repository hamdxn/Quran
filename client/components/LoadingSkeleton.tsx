import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface LoadingSkeletonProps {
  count?: number;
}

function SkeletonItem() {
  const { theme } = useTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.7, 0.3]),
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.leftSection}>
        <View
          style={[styles.numberSkeleton, { backgroundColor: theme.border }]}
        />
        <View style={styles.textSection}>
          <View
            style={[styles.titleSkeleton, { backgroundColor: theme.border }]}
          />
          <View
            style={[styles.metaSkeleton, { backgroundColor: theme.border }]}
          />
        </View>
      </View>
      <View
        style={[styles.arabicSkeleton, { backgroundColor: theme.border }]}
      />
    </Animated.View>
  );
}

export function LoadingSkeleton({ count = 10 }: LoadingSkeletonProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  numberSkeleton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.xs,
    marginRight: Spacing.md,
  },
  textSection: {
    flex: 1,
  },
  titleSkeleton: {
    width: "60%",
    height: 16,
    borderRadius: 4,
    marginBottom: Spacing.xs,
  },
  metaSkeleton: {
    width: "40%",
    height: 12,
    borderRadius: 4,
  },
  arabicSkeleton: {
    width: 80,
    height: 28,
    borderRadius: 4,
  },
});
