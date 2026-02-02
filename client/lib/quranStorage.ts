import AsyncStorage from "@react-native-async-storage/async-storage";
import { SurahDetail } from "@/data/surahs";
import quranVerses from "@/data/quranVerses.json";
import englishTranslations from "@/data/englishTranslations.json";

const BOOKMARKS_KEY = "quran_bookmarks";
const SETTINGS_KEY = "quran_settings";
const LAST_READ_KEY = "quran_last_read";

const AUDIO_BASE = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy";

export interface Bookmark {
  id: string;
  surahIndex: string;
  surahTitle: string;
  surahTitleAr: string;
  ayahNumber: number;
  ayahText: string;
  createdAt: number;
}

export interface Settings {
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
  playbackSpeed: number;
}

export interface LastRead {
  surahIndex: string;
  ayahNumber: number;
  timestamp: number;
}

const defaultSettings: Settings = {
  arabicFontSize: 24,
  translationFontSize: 16,
  showTranslation: true,
  playbackSpeed: 1.0,
};

export function getSurahDetail(surahIndex: string): SurahDetail | null {
  const data = (quranVerses as Record<string, SurahDetail>)[surahIndex];
  return data || null;
}

export function getSurahTranslation(surahIndex: string): Record<string, string> | null {
  const data = (englishTranslations as Record<string, Record<string, string>>)[surahIndex];
  return data || null;
}

export function getAyahTranslation(surahIndex: string, ayahNumber: number): string | null {
  const translations = getSurahTranslation(surahIndex);
  if (!translations) return null;
  return translations[`verse_${ayahNumber}`] || null;
}

export function getAudioUrl(surahNumber: number): string {
  return `${AUDIO_BASE}/${surahNumber}.mp3`;
}

export async function getBookmarks(): Promise<Bookmark[]> {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    return [];
  }
}

export async function addBookmark(bookmark: Omit<Bookmark, "id" | "createdAt">): Promise<Bookmark> {
  const bookmarks = await getBookmarks();
  const existing = bookmarks.find(
    (b) => b.surahIndex === bookmark.surahIndex && b.ayahNumber === bookmark.ayahNumber
  );
  if (existing) {
    return existing;
  }
  
  const newBookmark: Bookmark = {
    ...bookmark,
    id: `${bookmark.surahIndex}_${bookmark.ayahNumber}_${Date.now()}`,
    createdAt: Date.now(),
  };
  
  bookmarks.unshift(newBookmark);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  return newBookmark;
}

export async function removeBookmark(id: string): Promise<void> {
  const bookmarks = await getBookmarks();
  const filtered = bookmarks.filter((b) => b.id !== id);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
}

export async function isBookmarked(surahIndex: string, ayahNumber: number): Promise<boolean> {
  const bookmarks = await getBookmarks();
  return bookmarks.some(
    (b) => b.surahIndex === surahIndex && b.ayahNumber === ayahNumber
  );
}

export async function getSettings(): Promise<Settings> {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
}

export async function saveSettings(settings: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

export async function getLastRead(): Promise<LastRead | null> {
  try {
    const data = await AsyncStorage.getItem(LAST_READ_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}

export async function saveLastRead(surahIndex: string, ayahNumber: number): Promise<void> {
  const lastRead: LastRead = {
    surahIndex,
    ayahNumber,
    timestamp: Date.now(),
  };
  await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(lastRead));
}

export async function clearAllData(): Promise<void> {
  await AsyncStorage.multiRemove([BOOKMARKS_KEY, SETTINGS_KEY, LAST_READ_KEY]);
}
