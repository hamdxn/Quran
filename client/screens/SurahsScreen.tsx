import React, { useState, useMemo, useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, { FadeInDown } from "react-native-reanimated";

import { SurahCard } from "@/components/SurahCard";
import { SearchBar } from "@/components/SearchBar";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { surahs, Surah } from "@/data/surahs";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SurahsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = useMemo(() => {
    if (!searchQuery.trim()) return surahs;
    const query = searchQuery.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.title.toLowerCase().includes(query) ||
        surah.titleAr.includes(searchQuery) ||
        surah.index.includes(query)
    );
  }, [searchQuery]);

  const handleSurahPress = useCallback(
    (surah: Surah) => {
      navigation.navigate("SurahDetail", { surah });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Surah; index: number }) => (
      <Animated.View entering={FadeInDown.delay(index * 30).duration(300)}>
        <SurahCard surah={item} onPress={() => handleSurahPress(item)} />
      </Animated.View>
    ),
    [handleSurahPress]
  );

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyState
        image={require("../../assets/images/empty-search.png")}
        title="No surahs found"
        message="Try searching with a different keyword or surah number"
      />
    ),
    []
  );

  const ListHeaderComponent = useMemo(
    () => (
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search surahs..."
      />
    ),
    [searchQuery]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={filteredSurahs}
        renderItem={renderItem}
        keyExtractor={(item) => item.index}
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: headerHeight + Spacing.md,
            paddingBottom: tabBarHeight + Spacing.xl,
          },
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
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
});
