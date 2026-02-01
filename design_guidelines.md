# Quran App Design Guidelines

## Brand Identity

**Purpose**: A reverent, offline-first Quran app that provides seamless access to all 114 surahs with Arabic text, translations, and audio recitation.

**Aesthetic Direction**: **Editorial/Serene** - Clean typographic hierarchy, ample breathing room, calming tones. Think of a beautifully designed book with generous margins and thoughtful spacing. The app should feel like a sacred space - peaceful, focused, and timeless.

**Memorable Element**: The transition from surah list to reading view feels like turning a page in an illuminated manuscript. Each surah opens with elegant typography and subtle decorative flourishes inspired by Islamic geometric patterns.

## Navigation Architecture

**Root Navigation**: Tab Navigation (3 tabs)
- **Surahs** (Home) - Browse all 114 surahs
- **Bookmarks** (Center) - Saved ayahs and reading positions
- **Settings** - App preferences and profile

**No Authentication Required** - Fully offline, single-user app with local data storage.

## Screen Specifications

### 1. Surahs Screen (Home Tab)
**Purpose**: Browse and select from all 114 surahs

**Layout**:
- Header: Custom transparent header with app title "القرآن الكريم" (Al-Quran Al-Kareem) in Arabic calligraphy, search icon on right
- Content: Scrollable list (FlatList)
- Top inset: headerHeight + Spacing.xl
- Bottom inset: tabBarHeight + Spacing.xl

**Components**:
- Search bar (collapsible below header when scrolling)
- Surah cards displaying: Surah number in decorative circle, Arabic name, transliteration, English translation, revelation location (Makkah/Madinah), ayah count
- Subtle dividers between cards
- Empty state (filtered search): empty-search.png illustration

### 2. Surah Detail Screen (Modal)
**Purpose**: Read ayahs and control audio playback

**Layout**:
- Header: Custom with surah name, back button (left), bookmark icon (right)
- Content: Scrollable view with sticky audio player
- Audio player: Floating card at bottom with play/pause, progress bar, playback speed
- Top inset: headerHeight + Spacing.xl
- Bottom inset: audioPlayerHeight + Spacing.xl

**Components**:
- Surah header card: Arabic name, transliteration, bismillah (except Surah 9)
- Ayah cards: Each ayah displayed with Arabic text (large, right-aligned), translation below, ayah number in decorative badge
- Audio player: Play/pause button, progress slider, current time/total time, speed control (0.75x, 1x, 1.25x, 1.5x)
- Bookmark action on long-press

### 3. Bookmarks Screen (Tab)
**Purpose**: Access saved ayahs and reading positions

**Layout**:
- Header: Default with title "Bookmarks"
- Content: Scrollable list
- Top inset: Spacing.xl
- Bottom inset: tabBarHeight + Spacing.xl

**Components**:
- Bookmark cards showing: Surah name, ayah number, snippet of ayah text
- Swipe-to-delete action
- Empty state: empty-bookmarks.png illustration with "No bookmarks yet"

### 4. Settings Screen (Tab)
**Purpose**: Customize app preferences

**Layout**:
- Header: Default with title "Settings"
- Content: Scrollable grouped form
- Top inset: Spacing.xl
- Bottom inset: tabBarHeight + Spacing.xl

**Components**:
- Profile section: Avatar (generate 1 preset), display name field
- Preferences: Arabic font size slider, translation language selector, theme toggle (light/dark)
- About: App version, data source attribution

## Color Palette

**Primary**: #2C5F4F (Deep forest green - symbolizes growth and peace)
**Accent**: #D4AF37 (Antique gold - for decorative elements)
**Background**: #FAFAF8 (Warm off-white)
**Surface**: #FFFFFF (Pure white for cards)
**Text Primary**: #1A1A1A (Near black)
**Text Secondary**: #6B7280 (Warm gray)
**Border**: #E5E7EB (Light gray)
**Success**: #059669 (For audio playing state)

## Typography

**Primary Font**: Amiri (Google Font - elegant Arabic serif font for Quranic text)
**Secondary Font**: System default (SF Pro for iOS, Roboto for Android)

**Type Scale**:
- Heading Large: 28pt, Bold (Surah titles)
- Heading Medium: 22pt, Semibold (Screen titles)
- Arabic Text: 24pt, Regular (Ayah text in Amiri)
- Body: 16pt, Regular (Translations)
- Caption: 14pt, Regular (Surah metadata)
- Small: 12pt, Regular (Audio time)

## Visual Design

- Surah cards: Subtle elevation with 1pt border, no drop shadow
- Decorative circles for surah numbers: Use geometric Islamic pattern in accent gold
- Audio player: Floating card with subtle shadow (shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2)
- Touchable feedback: Slight scale down (0.97) on press for cards
- Icons: Feather icons in primary color

## Assets to Generate

**Required**:
1. **icon.png** - App icon with geometric Islamic pattern and crescent moon in primary/gold colors - USED: Device home screen
2. **splash-icon.png** - Same design as app icon - USED: Splash screen during launch
3. **empty-bookmarks.png** - Serene illustration of an open book with bookmark ribbon - USED: Bookmarks screen when empty
4. **empty-search.png** - Minimalist search icon with gentle rays - USED: Surahs screen when search yields no results

**Recommended**:
5. **surah-ornament.png** - Delicate Islamic geometric divider - USED: Top of each surah detail screen
6. **bismillah-calligraphy.png** - Bismillah in elegant Arabic calligraphy - USED: Below surah header on detail screen

All assets must use the primary green and antique gold color palette with soft, elegant styling.