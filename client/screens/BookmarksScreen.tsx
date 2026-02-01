import React, { useState, useCallback, useEffect } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BookmarkCard } from "@/components/BookmarkCard";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, QuranColors } from "@/constants/theme";
import { getBookmarks, removeBookmark, Bookmark } from "@/lib/quranStorage";
import { getSurahByIndex } from "@/data/surahs";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BookmarksScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookmarks = useCallback(async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [loadBookmarks])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookmarks();
    setRefreshing(false);
  };

  const handleBookmarkPress = useCallback(
    (bookmark: Bookmark) => {
      const surah = getSurahByIndex(bookmark.surahIndex);
      if (surah) {
        navigation.navigate("SurahDetail", { surah });
      }
    },
    [navigation]
  );

  const handleDeleteBookmark = useCallback(
    async (id: string) => {
      await removeBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Bookmark }) => (
      <BookmarkCard
        bookmark={item}
        onPress={() => handleBookmarkPress(item)}
        onDelete={() => handleDeleteBookmark(item.id)}
      />
    ),
    [handleBookmarkPress, handleDeleteBookmark]
  );

  const ListEmptyComponent = (
    <EmptyState
      image={require("../../assets/images/empty-bookmarks.png")}
      title="No bookmarks yet"
      message="Long press on any ayah to bookmark it for quick access later"
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: headerHeight + Spacing.xl,
            paddingBottom: tabBarHeight + Spacing.xl,
          },
          bookmarks.length === 0 && styles.emptyList,
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={QuranColors.primary}
            colors={[QuranColors.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
  emptyList: {
    flex: 1,
  },
});
