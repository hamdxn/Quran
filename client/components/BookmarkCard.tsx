import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
  FadeIn,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, QuranColors } from "@/constants/theme";
import { Bookmark } from "@/lib/quranStorage";
import { getSurahNumber } from "@/data/surahs";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onPress: () => void;
  onDelete: () => void;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function BookmarkCard({ bookmark, onPress, onDelete }: BookmarkCardProps) {
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

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete();
  };

  const surahNumber = getSurahNumber(bookmark.surahIndex);

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
    >
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
        testID={`bookmark-card-${bookmark.id}`}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.surahInfo}>
              <View
                style={[
                  styles.numberBadge,
                  { backgroundColor: QuranColors.accent + "20" },
                ]}
              >
                <ThemedText
                  style={[styles.numberText, { color: QuranColors.primary }]}
                >
                  {surahNumber}
                </ThemedText>
              </View>
              <View>
                <ThemedText style={styles.surahTitle}>
                  {bookmark.surahTitle}
                </ThemedText>
                <ThemedText
                  style={[styles.ayahNumber, { color: theme.textSecondary }]}
                >
                  Ayah {bookmark.ayahNumber}
                </ThemedText>
              </View>
            </View>
            <ThemedText
              style={[styles.arabicTitle, { color: QuranColors.primary }]}
            >
              {bookmark.surahTitleAr}
            </ThemedText>
          </View>
          <ThemedText
            style={[styles.ayahPreview, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {bookmark.ayahText}...
          </ThemedText>
        </View>
        <Pressable
          onPress={handleDelete}
          hitSlop={8}
          style={({ pressed }) => [
            styles.deleteButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          testID={`delete-bookmark-${bookmark.id}`}
        >
          <Feather name="trash-2" size={18} color={theme.textSecondary} />
        </Pressable>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  surahInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 14,
    fontWeight: "600",
  },
  surahTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  ayahNumber: {
    fontSize: 12,
  },
  arabicTitle: {
    fontSize: 20,
    fontFamily: "Amiri_400Regular",
  },
  ayahPreview: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Amiri_400Regular",
    textAlign: "right",
  },
  deleteButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
});
