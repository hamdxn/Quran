import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, QuranColors } from "@/constants/theme";
import { Surah, getSurahNumber } from "@/data/surahs";

interface SurahCardProps {
  surah: Surah;
  onPress: () => void;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SurahCard({ surah, onPress }: SurahCardProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const surahNumber = getSurahNumber(surah.index);
  const isMakkah = surah.place === "Mecca";

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
        animatedStyle,
      ]}
      testID={`surah-card-${surah.index}`}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.numberContainer,
            { backgroundColor: QuranColors.primary + "15" },
          ]}
        >
          <ThemedText
            style={[styles.number, { color: QuranColors.primary }]}
          >
            {surahNumber}
          </ThemedText>
        </View>
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{surah.title}</ThemedText>
          <View style={styles.metaRow}>
            <View
              style={[
                styles.placeBadge,
                {
                  backgroundColor: isMakkah
                    ? theme.makkah + "15"
                    : theme.madinah + "15",
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.placeText,
                  { color: isMakkah ? theme.makkah : theme.madinah },
                ]}
              >
                {surah.place}
              </ThemedText>
            </View>
            <ThemedText style={[styles.ayahCount, { color: theme.textSecondary }]}>
              {surah.count} Ayahs
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.rightSection}>
        <ThemedText style={[styles.arabicTitle, { color: QuranColors.primary }]}>
          {surah.titleAr}
        </ThemedText>
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  numberContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  number: {
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  placeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  placeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  ayahCount: {
    fontSize: 12,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  arabicTitle: {
    fontSize: 22,
    fontFamily: "Amiri_400Regular",
  },
});
