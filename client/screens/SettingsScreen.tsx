import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Switch, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, QuranColors } from "@/constants/theme";
import { getSettings, saveSettings, Settings, clearAllData } from "@/lib/quranStorage";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [settings, setSettings] = useState<Settings>({
    arabicFontSize: 24,
    translationFontSize: 16,
    showTranslation: true,
    playbackSpeed: 1.0,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getSettings();
    setSettings(data);
  };

  const handleSettingChange = async (key: keyof Settings, value: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await saveSettings(updated);
  };

  const handleClearData = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    await clearAllData();
    await loadSettings();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
    >
      <View style={styles.appHeader}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.appIcon}
          resizeMode="contain"
        />
        <ThemedText style={styles.appName}>Al-Quran Al-Kareem</ThemedText>
        <ThemedText style={[styles.appVersion, { color: theme.textSecondary }]}>
          Version 1.0.0
        </ThemedText>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
        ]}
      >
        <ThemedText style={styles.sectionTitle}>Reading Settings</ThemedText>

        <View style={styles.settingRow}>
          <ThemedText style={styles.settingLabel}>
            Arabic Font Size: {settings.arabicFontSize}
          </ThemedText>
          <Slider
            style={styles.slider}
            minimumValue={18}
            maximumValue={36}
            step={2}
            value={settings.arabicFontSize}
            onSlidingComplete={(value) =>
              handleSettingChange("arabicFontSize", value)
            }
            minimumTrackTintColor={QuranColors.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={QuranColors.primary}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRowSwitch}>
          <ThemedText style={styles.settingLabel}>Show Translation</ThemedText>
          <Switch
            value={settings.showTranslation}
            onValueChange={(value) =>
              handleSettingChange("showTranslation", value)
            }
            trackColor={{ false: theme.border, true: QuranColors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
        ]}
      >
        <ThemedText style={styles.sectionTitle}>Audio Settings</ThemedText>

        <View style={styles.settingRow}>
          <ThemedText style={styles.settingLabel}>
            Default Playback Speed: {settings.playbackSpeed}x
          </ThemedText>
          <View style={styles.speedButtons}>
            {[0.75, 1.0, 1.25, 1.5].map((speed) => (
              <Pressable
                key={speed}
                onPress={() => handleSettingChange("playbackSpeed", speed)}
                style={({ pressed }) => [
                  styles.speedButton,
                  {
                    backgroundColor:
                      settings.playbackSpeed === speed
                        ? QuranColors.primary
                        : theme.backgroundSecondary,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.speedButtonText,
                    {
                      color:
                        settings.playbackSpeed === speed
                          ? "#FFFFFF"
                          : theme.text,
                    },
                  ]}
                >
                  {speed}x
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
        ]}
      >
        <ThemedText style={styles.sectionTitle}>About</ThemedText>

        <ThemedText style={[styles.aboutText, { color: theme.textSecondary }]}>
          This app provides access to the Holy Quran with Arabic text and audio
          recitation by Sheikh Mishary Al-Afasy. Data sourced from quranjson
          project.
        </ThemedText>

        <View style={styles.divider} />

        <Pressable
          onPress={handleClearData}
          style={({ pressed }) => [
            styles.dangerButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <ThemedText style={styles.dangerButtonText}>
            Clear Cached Data
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  appVersion: {
    fontSize: 14,
  },
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.lg,
  },
  settingRow: {
    marginBottom: Spacing.sm,
  },
  settingRowSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  speedButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  speedButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  speedButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: Spacing.lg,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  dangerButton: {
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  dangerButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
  },
});
