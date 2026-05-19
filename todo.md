# Social Media Content Strategy Platform - TODO

## Core Features

### 1. Dashboard Home
- [x] Create Dashboard Home page layout with grid structure
- [x] Implement Daily Content Strategy overview section
- [x] Display Trending Topics summary widget
- [x] Show Content Calendar snapshot (next 7 days)
- [x] Add quick action buttons (Generate Scripts, Analyze Trends)
- [x] Implement responsive design for mobile/tablet/desktop

### 2. Trend Analyzer
- [x] Create Trend Analyzer page layout
- [x] Integrate Google Trends Data API via backend
- [x] Display trending keywords with growth indicators
- [x] Show platform-specific trends (Instagram, TikTok, X, LinkedIn)
- [x] Display hashtag suggestions with volume/engagement metrics
- [x] Implement trend filtering by platform and category
- [x] Add trend selection for content generation workflow
- [x] Create trend detail view with related keywords

### 3. AI Content Generator
- [x] Create AI Content Generator page layout
- [x] Build trend selection interface
- [x] Build platform selector (Instagram, TikTok, X, LinkedIn)
- [x] Implement LLM integration for content generation
- [x] Generate platform-specific posts
- [x] Generate short video scripts (Hook / Body / CTA format)
- [x] Generate captions with emoji suggestions
- [x] Generate hashtag sets (platform-optimized)
- [x] Add content tone/style selector based on brand voice
- [x] Implement regenerate button for alternative versions
- [x] Add copy-to-clipboard functionality for all content types

### 4. Content Calendar
- [x] Create Content Calendar page layout
- [x] Implement weekly view with day columns
- [x] Implement monthly view with date grid
- [x] Add view toggle (weekly/monthly)
- [x] Display scheduled content cards on calendar
- [ ] Implement drag-and-drop scheduling
- [ ] Add content creation modal from calendar
- [x] Show platform badges on calendar items
- [x] Display content status indicators (draft/scheduled/published)
- [ ] Implement date range filtering
- [ ] Add platform filter toggles

### 5. Brand Voice and Strategy Settings
- [x] Create Settings page layout
- [x] Build Brand Voice configuration section
  - [x] Niche/industry input field
  - [x] Target audience description field
  - [x] Tone of voice selector (professional, casual, playful, etc.)
  - [x] Content pillars multi-select (up to 5)
- [x] Build Connected Platforms section
  - [x] Platform toggle switches (Instagram, TikTok, X, LinkedIn)
  - [x] Platform-specific settings (username, posting preferences)
- [x] Implement save/update functionality
- [x] Add form validation
- [x] Display success/error notifications

### 6. Script Editor
- [x] Create Script Editor page layout
- [x] Build script content editor with three sections (Hook / Body / CTA)
- [x] Implement live platform preview panel (updates as user edits)
- [x] Add edit buttons for each script section
- [x] Implement regenerate button (calls LLM for new version)
- [x] Add copy-to-clipboard for each section
- [x] Add copy-all functionality
- [ ] Implement export options (text, markdown)
- [x] Add script timing indicators for video scripts
- [ ] Implement undo/redo functionality
- [x] Add save-to-library button

### 7. Saved Content Library
- [x] Create Saved Content Library page layout
- [x] Build content list/grid view with filtering
- [x] Display content cards with:
  - [x] Content preview (truncated)
  - [x] Platform labels (Instagram, TikTok, X, LinkedIn)
  - [x] Status badges (draft, scheduled, published)
  - [x] Tags/categories
  - [x] Created/scheduled date
  - [x] Action buttons (edit, delete, schedule, publish)
- [x] Implement search functionality
- [x] Implement filter by platform
- [x] Implement filter by status
- [x] Implement filter by tags
- [ ] Add tag management interface
- [ ] Implement bulk actions (delete, change status, add tags)
- [ ] Add content detail/preview modal

### 8. Daily Strategy Briefing
- [x] Create Daily Strategy Briefing page layout
- [x] Implement LLM integration for daily brief generation
- [x] Display recommended topics for the day
- [x] Show best posting times per platform
- [x] Display content type suggestions (post, reel, story, etc.)
- [ ] Add engagement predictions
- [x] Implement refresh/regenerate button
- [ ] Add brief customization options (tone, focus areas)
- [ ] Show briefing timestamp and next update time
- [ ] Implement email subscription option (placeholder)

### 9. User Authentication & Workspace
- [x] Verify Manus OAuth integration is working
- [x] Create personalized workspace per user
- [x] Implement protected routes (redirect to login if not authenticated)
- [x] Display user profile in sidebar/header
- [x] Implement logout functionality
- [x] Add user settings page (profile, preferences)

## Database Schema

### Tables to Create
- [ ] brand_voice (user_id, niche, target_audience, tone, content_pillars)
- [ ] connected_platforms (user_id, platform_name, username, is_active)
- [ ] trends (id, keyword, platform, growth_rate, volume, category, created_at)
- [ ] generated_content (id, user_id, trend_id, platform, content_type, content_text, status, created_at)
- [ ] content_library (id, user_id, content_id, tags, status, scheduled_date, published_date)
- [ ] daily_briefings (id, user_id, topics, posting_times, content_suggestions, generated_at)

## Backend (tRPC Procedures)

### Trend Management
- [ ] trends.getTrending - fetch from Data API
- [ ] trends.searchByPlatform - filter by platform
- [ ] trends.getDetails - get trend details with related keywords

### Content Generation
- [ ] content.generatePost - generate platform-specific post
- [ ] content.generateScript - generate Hook/Body/CTA script
- [ ] content.generateCaption - generate caption with emojis
- [ ] content.generateHashtags - generate hashtag set

### Brand Voice & Settings
- [ ] brandVoice.get - retrieve user's brand voice config
- [ ] brandVoice.update - save/update brand voice settings
- [ ] platforms.getConnected - get user's connected platforms
- [ ] platforms.updateConnected - update platform connections

### Content Calendar & Library
- [ ] calendar.getScheduled - get scheduled content for date range
- [ ] calendar.scheduleContent - schedule content for specific date/platform
- [ ] calendar.reschedule - move scheduled content to new date
- [ ] library.getSaved - get user's saved content with filters
- [ ] library.saveContent - save generated content to library
- [ ] library.updateStatus - change content status (draft/scheduled/published)
- [ ] library.deleteContent - delete content from library
- [ ] library.addTags - add tags to content
- [ ] library.search - search content library

### Daily Briefing
- [ ] briefing.getDaily - get today's briefing
- [ ] briefing.generate - generate new briefing (LLM)
- [ ] briefing.getHistory - get past briefings

## Frontend Components

### Layout & Navigation
- [ ] DashboardLayout with sidebar navigation
- [ ] Navigation items for all 8 feature pages
- [ ] User profile dropdown in header
- [ ] Mobile-responsive navigation

### Reusable Components
- [ ] ContentCard (for library and calendar)
- [ ] PlatformBadge (Instagram, TikTok, X, LinkedIn)
- [ ] StatusBadge (draft, scheduled, published)
- [ ] TrendCard (for trend analyzer)
- [ ] ScriptEditor (Hook/Body/CTA sections)
- [ ] PlatformPreview (live preview panel)
- [ ] CalendarGrid (weekly/monthly view)
- [ ] SettingsForm (brand voice configuration)

### Pages
- [ ] Home (Dashboard)
- [ ] TrendAnalyzer
- [ ] ContentGenerator
- [ ] ContentCalendar
- [ ] ScriptEditor
- [ ] ContentLibrary
- [ ] BrandVoiceSettings
- [ ] DailyBriefing
- [ ] UserSettings

## Styling & Polish

### Design System
- [ ] Dark mode color palette (background, surface, text, accent)
- [ ] Typography system (headings, body, captions)
- [ ] Spacing scale (margins, padding)
- [ ] Border radius and shadow system
- [ ] Icon set (lucide-react)

### Animations & Micro-interactions
- [ ] Page transitions (fade/slide)
- [ ] Button hover/active states
- [ ] Loading spinners and skeletons
- [ ] Toast notifications for actions
- [ ] Modal entrance/exit animations
- [ ] Smooth scroll behaviors
- [ ] Hover effects on cards
- [ ] Input focus states

### Responsive Design
- [ ] Mobile-first approach
- [ ] Tablet layout optimizations
- [ ] Desktop layout optimizations
- [ ] Touch-friendly interactions on mobile

## Testing

### Unit Tests
- [ ] Test brand voice CRUD operations
- [ ] Test content generation procedures
- [ ] Test calendar scheduling logic
- [ ] Test library filtering and search

### Integration Tests
- [ ] Test end-to-end workflow (settings → generate → schedule → library)
- [ ] Test authentication and protected routes
- [ ] Test API integrations (trends, LLM)

## Deployment & Final

- [ ] Verify all environment variables are set
- [ ] Run full test suite
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Create final checkpoint
- [ ] Deploy to production
