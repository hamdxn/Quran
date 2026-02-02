# Al-Quran App

## Overview

A reverent, offline-first Quran application built with React Native (Expo) that provides seamless access to all 114 surahs with Arabic text and audio recitation. The app follows an editorial/serene design aesthetic with clean typographic hierarchy and calming tones.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54, using the new architecture enabled. The app uses React 19 with the experimental React Compiler.

**Navigation Structure**:
- Root Stack Navigator containing:
  - Main Tab Navigator (3 tabs: Surahs, Bookmarks, Settings)
  - Surah Detail screen (modal presentation)
- Each tab has its own stack navigator for internal navigation

**State Management**:
- TanStack React Query for server state (though app is primarily offline-first)
- Local component state with React hooks
- AsyncStorage for persistent local data (bookmarks, settings, last read position)

**UI Components**:
- Custom themed components (ThemedText, ThemedView, Card, Button)
- Reanimated 4 for smooth animations and gestures
- Expo Audio for Quran recitation playback
- Platform-specific blur effects (expo-blur, expo-glass-effect on iOS)

**Data Layer**:
- Static Quran data bundled in JSON format (`client/data/quranVerses.json`)
- English translations bundled offline (`client/data/englishTranslations.json`) - sourced from semarketir/quranjson
- Surah metadata in TypeScript (`client/data/surahs.ts`)
- Audio streamed from CDN (cdn.islamic.network)

### Backend Architecture

**Server**: Express.js with TypeScript, configured for both development and production modes.

**Purpose**: Primarily serves as a proxy/landing page server. The app is designed to be offline-first, so the backend is minimal.

**Database Schema**: Drizzle ORM with PostgreSQL configured (users table exists but not actively used since the app requires no authentication).

**Storage Pattern**: In-memory storage implementation (`MemStorage`) with interface for potential database migration.

### Path Aliases

- `@/` maps to `./client/`
- `@shared/` maps to `./shared/`

### Build Configuration

- Development: Expo Metro bundler with Replit proxy configuration
- Production: Static web build via custom script, esbuild for server bundling
- Babel configured with module-resolver for path aliases and Reanimated plugin

## External Dependencies

### Third-Party Services

**Audio CDN**: Islamic Network CDN (`cdn.islamic.network/quran/audio-surah/128/ar.alafasy`) for Quran recitation audio by Sheikh Alafasy.

### Key Libraries

- **expo-audio**: Audio playback for Quran recitation
- **react-native-reanimated**: Smooth animations and gestures
- **@react-native-async-storage/async-storage**: Local data persistence
- **@tanstack/react-query**: Data fetching and caching
- **drizzle-orm**: Database ORM (PostgreSQL)
- **expo-haptics**: Tactile feedback

### Fonts

- **Amiri** (Google Fonts): Arabic calligraphy font for Quran text
- **Nunito** (Google Fonts): UI text

### Database

PostgreSQL via Drizzle ORM. The database URL is expected in `DATABASE_URL` environment variable. Currently using in-memory storage as the app is offline-first with no user authentication required.