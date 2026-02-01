import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, QuranColors } from "@/constants/theme";
import { addBookmark, removeBookmark, isBookmarked } from "@/lib/quranStorage";

interface AyahCardProps {
  surahIndex: string;
  surahTitle: string;
  surahTitleAr: string;
  ayahNumber: number;
  arabicText: string;
  isPlaying?: boolean;
  onLongPress?: () => void;
}

export function AyahCard({
  surahIndex,
  surahTitle,
  surahTitleAr,
  ayahNumber,
  arabicText,
  isPlaying = false,
  onLongPress,
}: AyahCardProps) {
  const { theme } = useTheme();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);

  React.useEffect(() => {
    checkBookmark();
  }, [surahIndex, ayahNumber]);

  const checkBookmark = async () => {
    const result = await isBookmarked(surahIndex, ayahNumber);
    setBookmarked(result);
  };

  const handleBookmarkPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (bookmarked && bookmarkId) {
      await removeBookmark(bookmarkId);
      setBookmarked(false);
      setBookmarkId(null);
    } else {
      const bookmark = await addBookmark({
        surahIndex,
        surahTitle,
        surahTitleAr,
        ayahNumber,
        ayahText: arabicText.substring(0, 100),
      });
      setBookmarked(true);
      setBookmarkId(bookmark.id);
    }
  };

  return (
    <Pressable
      onLongPress={onLongPress}
      style={[
        styles.container,
        {
          backgroundColor: isPlaying
            ? QuranColors.primary + "10"
            : theme.backgroundDefault,
          borderColor: isPlaying ? QuranColors.primary : theme.border,
        },
      ]}
      testID={`ayah-card-${ayahNumber}`}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.numberBadge,
            {
              backgroundColor: QuranColors.accent + "20",
            },
          ]}
        >
          <ThemedText
            style={[styles.numberText, { color: QuranColors.primary }]}
          >
            {ayahNumber}
          </ThemedText>
        </View>
        <Pressable
          onPress={handleBookmarkPress}
          hitSlop={8}
          style={({ pressed }) => [
            styles.bookmarkButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          testID={`bookmark-button-${ayahNumber}`}
        >
          <Feather
            name={bookmarked ? "bookmark" : "bookmark"}
            size={20}
            color={bookmarked ? QuranColors.accent : theme.textSecondary}
            style={bookmarked ? { transform: [{ scale: 1.1 }] } : undefined}
          />
        </Pressable>
      </View>
      <ThemedText
        style={[
          styles.arabicText,
          { color: theme.text },
        ]}
      >
        {arabicText}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
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
  bookmarkButton: {
    padding: Spacing.xs,
  },
  arabicText: {
    fontSize: 26,
    lineHeight: 52,
    textAlign: "right",
    fontFamily: "Amiri_400Regular",
  },
});
