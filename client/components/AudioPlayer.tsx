import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Slider from "@react-native-community/slider";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, QuranColors } from "@/constants/theme";

interface AudioPlayerProps {
  audioUrl: string;
  surahTitle: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function AudioPlayer({
  audioUrl,
  surahTitle,
  onPlayStateChange,
}: AudioPlayerProps) {
  const { theme } = useTheme();
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  const player = useAudioPlayer(audioUrl);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status.playing;
  const isLoading = status.isLoading;
  const duration = status.duration || 0;
  const position = isSeeking ? seekPosition : (status.currentTime || 0);

  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [isPlaying, player]);

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (value: number) => {
    setSeekPosition(value);
  };

  const handleSeekComplete = (value: number) => {
    player.seekTo(value);
    setIsSeeking(false);
  };

  const handleSpeedChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackSpeed(newSpeed);
    player.setPlaybackRate(newSpeed);
  };

  const handleRewind = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newPosition = Math.max(0, position - 10);
    player.seekTo(newPosition);
  };

  const handleForward = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newPosition = Math.min(duration, position + 10);
    player.seekTo(newPosition);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderTopColor: theme.border,
        },
      ]}
    >
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingStart={handleSeekStart}
          onValueChange={handleSeekChange}
          onSlidingComplete={handleSeekComplete}
          minimumTrackTintColor={QuranColors.primary}
          maximumTrackTintColor={theme.border}
          thumbTintColor={QuranColors.primary}
        />
        <View style={styles.timeContainer}>
          <ThemedText style={[styles.timeText, { color: theme.textSecondary }]}>
            {formatTime(position)}
          </ThemedText>
          <ThemedText style={[styles.timeText, { color: theme.textSecondary }]}>
            {formatTime(duration)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={handleSpeedChange}
          style={({ pressed }) => [
            styles.speedButton,
            {
              backgroundColor: QuranColors.primary + "15",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          testID="speed-button"
        >
          <ThemedText
            style={[styles.speedText, { color: QuranColors.primary }]}
          >
            {playbackSpeed}x
          </ThemedText>
        </Pressable>

        <View style={styles.mainControls}>
          <Pressable
            onPress={handleRewind}
            style={({ pressed }) => [
              styles.controlButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            testID="rewind-button"
          >
            <Feather name="rotate-ccw" size={24} color={theme.text} />
          </Pressable>

          <Pressable
            onPress={handlePlayPause}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.playButton,
              {
                backgroundColor: QuranColors.primary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            testID="play-pause-button"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Feather
                name={isPlaying ? "pause" : "play"}
                size={28}
                color="#FFFFFF"
                style={isPlaying ? undefined : { marginLeft: 3 }}
              />
            )}
          </Pressable>

          <Pressable
            onPress={handleForward}
            style={({ pressed }) => [
              styles.controlButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            testID="forward-button"
          >
            <Feather name="rotate-cw" size={24} color={theme.text} />
          </Pressable>
        </View>

        <View style={styles.spacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    ...Shadows.lg,
  },
  progressContainer: {
    marginBottom: Spacing.sm,
  },
  slider: {
    width: "100%",
    height: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xs,
  },
  timeText: {
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  speedButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  speedText: {
    fontSize: 14,
    fontWeight: "600",
  },
  mainControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xl,
  },
  controlButton: {
    padding: Spacing.sm,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    width: 60,
  },
});
