import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useRoute } from "@react-navigation/native";

import { AyahCard } from "@/components/AyahCard";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, QuranColors } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { getSurahDetail, getAudioUrl, saveLastRead } from "@/lib/quranStorage";
import { SurahDetail, getSurahNumber } from "@/data/surahs";

type RouteType = RouteProp<RootStackParamList, "SurahDetail">;

interface AyahItem {
  number: number;
  text: string;
}

export default function SurahDetailScreen() {
  const route = useRoute<RouteType>();
  const { surah } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);

  const surahNumber = getSurahNumber(surah.index);
  const audioUrl = getAudioUrl(surahNumber);
  const showBismillah = surahNumber !== 9 && surahNumber !== 1;

  const surahDetail = useMemo(() => getSurahDetail(surah.index), [surah.index]);

  useEffect(() => {
    if (surahDetail) {
      saveLastRead(surah.index, 1);
    }
  }, [surah.index, surahDetail]);

  const ayahs = useMemo<AyahItem[]>(() => {
    if (!surahDetail?.verse) return [];
    return Object.entries(surahDetail.verse).map(([key, text]) => ({
      number: parseInt(key.replace("verse_", ""), 10),
      text: text as string,
    }));
  }, [surahDetail]);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const renderAyah = useCallback(
    ({ item }: { item: AyahItem }) => (
      <AyahCard
        surahIndex={surah.index}
        surahTitle={surah.title}
        surahTitleAr={surah.titleAr}
        ayahNumber={item.number}
        arabicText={item.text}
        isPlaying={false}
      />
    ),
    [surah]
  );

  const ListHeaderComponent = useMemo(
    () => (
      <View style={styles.header}>
        <View
          style={[
            styles.surahHeader,
            {
              backgroundColor: QuranColors.primary + "08",
              borderColor: QuranColors.primary + "20",
            },
          ]}
        >
          <ThemedText
            style={[styles.surahArabicName, { color: QuranColors.primary }]}
          >
            {surah.titleAr}
          </ThemedText>
          <ThemedText style={[styles.surahEnglishName, { color: theme.text }]}>
            {surah.title}
          </ThemedText>
          <View style={styles.metaRow}>
            <ThemedText
              style={[styles.metaText, { color: theme.textSecondary }]}
            >
              {surah.place} • {surah.count} Ayahs
            </ThemedText>
          </View>
          {showBismillah ? (
            <ThemedText
              style={[styles.bismillah, { color: QuranColors.primary }]}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </ThemedText>
          ) : null}
        </View>
      </View>
    ),
    [surah, showBismillah, theme]
  );

  if (!surahDetail) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.backgroundRoot },
        ]}
      >
        <ActivityIndicator size="large" color={QuranColors.primary} />
        <ThemedText
          style={[styles.loadingText, { color: theme.textSecondary }]}
        >
          Loading surah...
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={ayahs}
        renderItem={renderAyah}
        keyExtractor={(item) => `ayah-${item.number}`}
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: headerHeight + Spacing.md,
            paddingBottom: Spacing.audioPlayerHeight + Spacing["3xl"] + insets.bottom,
          },
        ]}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
      <View style={[styles.audioContainer, { paddingBottom: insets.bottom }]}>
        <AudioPlayer
          audioUrl={audioUrl}
          surahTitle={surah.title}
          onPlayStateChange={handlePlayStateChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: 14,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  surahHeader: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: "center",
  },
  surahArabicName: {
    fontSize: 36,
    fontFamily: "Amiri_400Regular",
    marginBottom: Spacing.sm,
  },
  surahEnglishName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  metaRow: {
    marginBottom: Spacing.lg,
  },
  metaText: {
    fontSize: 14,
  },
  bismillah: {
    fontSize: 24,
    fontFamily: "Amiri_400Regular",
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  audioContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
