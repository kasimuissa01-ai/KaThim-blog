# Social Media AI Agent - Architecture & Implementation Guide

## Overview

The Social Media AI Agent is a full-stack, production-ready web application built with React 19, Express 4, tRPC 11, and Tailwind CSS 4. It provides an AI-powered content strategy platform for creators and marketers to analyze trends, generate platform-specific content, and manage their social media calendar.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Backend**: Express 4 + tRPC 11 + Node.js
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: Manus OAuth
- **AI Integration**: Built-in LLM (Gemini/Groq compatible)
- **API Integration**: Google Trends Data API, Manus Built-in APIs

## Project Structure

```
social_media_ai_agent/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/                  # Feature pages
│   │   │   ├── Home.tsx            # Dashboard home
│   │   │   ├── TrendAnalyzer.tsx   # Trend analysis
│   │   │   ├── ContentGenerator.tsx # AI content generation
│   │   │   ├── ScriptEditor.tsx    # Video script editor
│   │   │   ├── ContentCalendar.tsx # Content scheduling
│   │   │   ├── ContentLibrary.tsx  # Saved content
│   │   │   ├── BrandVoiceSettings.tsx # Settings
│   │   │   └── DailyBriefing.tsx   # Daily strategy
│   │   ├── components/
│   │   │   ├── CustomDashboardLayout.tsx # Main layout
│   │   │   ├── PlatformBadge.tsx   # Platform indicator
│   │   │   ├── StatusBadge.tsx     # Status indicator
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── lib/
│   │   │   └── trpc.ts             # tRPC client
│   │   ├── animations.css          # Animations & micro-interactions
│   │   └── index.css               # Global styles
│   └── public/                      # Static assets
├── server/
│   ├── features.ts                 # All tRPC routers & procedures
│   ├── db.ts                       # Database query helpers
│   ├── routers.ts                  # Main app router
│   ├── storage.ts                  # S3 storage helpers
│   └── _core/                      # Framework infrastructure
├── drizzle/
│   ├── schema.ts                   # Database schema
│   └── migrations/                 # SQL migrations
├── shared/                         # Shared types & constants
├── vitest.config.ts                # Test configuration
└── package.json                    # Dependencies
```

## Database Schema

### Core Tables

#### `users`
- Stores user authentication and profile data
- Linked to Manus OAuth via `openId`
- Includes role-based access control (admin/user)

#### `brandVoices`
- User's brand identity and content strategy
- Fields: niche, targetAudience, tone, contentPillars, platforms

#### `trends`
- Cached trending topics from Google Trends API
- Fields: keyword, platform, category, growthRate, volume, relatedKeywords

#### `generatedContent`
- AI-generated content (posts, scripts, captions, hashtags)
- Fields: userId, trend, platform, contentType, content, status

#### `scheduledContent`
- Content scheduled for posting
- Fields: userId, contentId, platform, scheduledDate, status

#### `contentLibrary`
- User's saved content library
- Fields: userId, contentText, platform, contentType, status, tags, createdAt

#### `dailyBriefings`
- AI-generated daily strategy briefings
- Fields: userId, recommendedTopics, postingTimes, contentSuggestions, createdAt

## API Architecture

### tRPC Routers

#### `brandVoice`
- `get()` - Retrieve user's brand voice settings
- `update(data)` - Update brand voice configuration

#### `trends`
- `getTrending(filters)` - Get trending topics with optional platform/category filters
- `searchByKeyword(keyword)` - Search trends by keyword

#### `content`
- `generatePost(trend, platform)` - Generate platform-specific post
- `generateScript(trend, platform, duration)` - Generate Hook/Body/CTA video script
- `generateCaption(trend, platform, includeEmojis)` - Generate caption
- `generateHashtags(trend, platform, count)` - Generate hashtag set

#### `calendar`
- `getScheduled(startDate, endDate)` - Get scheduled content for date range
- `scheduleContent(contentId, scheduledDate, platform)` - Schedule content

#### `library`
- `getSaved(limit, offset, filters)` - Get saved content with pagination
- `saveContent(data)` - Save generated content to library
- `updateStatus(contentId, status)` - Update content status (draft/scheduled/published)
- `deleteContent(contentId)` - Delete content

#### `briefing`
- `getDaily()` - Get today's strategy briefing
- `generate()` - Generate new daily briefing

## Frontend Features

### 1. Dashboard Home
- **Purpose**: Overview of daily content strategy
- **Components**: Trending topics widget, content calendar snapshot, daily stats
- **Interactions**: Quick action buttons to navigate to other features
- **Data Flow**: Fetches trends and scheduled content on load

### 2. Trend Analyzer
- **Purpose**: Discover and analyze trending topics
- **Features**: 
  - Real-time trend data from Google Trends
  - Platform-specific filtering (Instagram, TikTok, X, LinkedIn)
  - Growth rate indicators and search volume metrics
  - Related keywords and hashtag suggestions
- **Interactions**: Select trends to use in content generation

### 3. AI Content Generator
- **Purpose**: Generate platform-specific content powered by AI
- **Features**:
  - Trend topic input
  - Platform selector (Instagram, TikTok, X, LinkedIn)
  - Content type selector (post, script, caption, hashtags)
  - Live preview with platform-specific formatting
  - Regenerate button for alternative versions
  - Copy-to-clipboard for all content types
- **AI Integration**: Uses built-in LLM with structured prompts

### 4. Script Editor
- **Purpose**: Edit and refine video scripts
- **Structure**: Hook / Body / CTA format (exactly as specified)
- **Features**:
  - Three-section editor for Hook, Body, CTA
  - Live platform preview panel
  - Timing indicators for video duration
  - Copy individual sections or entire script
  - Save to library functionality
- **Validation**: Ensures all sections are filled before saving

### 5. Content Calendar
- **Purpose**: Schedule and manage content across platforms
- **Views**: Monthly grid and weekly (coming soon)
- **Features**:
  - Visual calendar with scheduled content
  - Platform badges on calendar items
  - Status indicators (draft/scheduled/published)
  - Drag-and-drop rescheduling (future)
- **Data**: Real-time sync with database

### 6. Content Library
- **Purpose**: Manage all saved content
- **Features**:
  - Searchable content list
  - Filter by platform, status, tags
  - Bulk actions (delete, change status)
  - Content preview and metadata
  - Edit and delete individual items
- **Status Labels**: draft, scheduled, published

### 7. Brand Voice Settings
- **Purpose**: Configure brand identity and strategy
- **Sections**:
  - Brand Voice: niche, audience, tone, content pillars
  - Connected Platforms: enable/disable platforms, add usernames
- **Validation**: Form validation with error states
- **Persistence**: All changes saved to database

### 8. Daily Strategy Briefing
- **Purpose**: AI-generated daily content strategy
- **Content**:
  - Recommended topics for the day
  - Best posting times per platform
  - Content type suggestions (post, reel, story, etc.)
  - Engagement predictions
- **Refresh**: Regenerate button for new briefing

## Backend Implementation

### LLM Integration

All content generation uses the built-in LLM helper via `invokeLLM()`:

```typescript
const response = await invokeLLM({
  messages: [
    { role: "system", content: "You are a social media content expert..." },
    { role: "user", content: "Generate a post about..." },
  ],
  response_format: {
    type: "json_schema",
    json_schema: { /* schema */ }
  }
});
```

### Data API Integration

Trends are fetched via the Manus Data API:

```typescript
const trends = await dataApi.search({
  query: "trending topics",
  type: "google_trends",
  limit: 10
});
```

### Database Queries

All database operations use Drizzle ORM with typed queries:

```typescript
const userContent = await db
  .select()
  .from(generatedContent)
  .where(eq(generatedContent.userId, userId))
  .limit(20);
```

## Authentication & Authorization

- **OAuth**: Manus OAuth handles user authentication
- **Session**: JWT-based session cookies
- **Protected Routes**: All feature pages require authentication
- **Role-Based Access**: Admin vs user roles supported
- **Per-User Isolation**: All queries filtered by `ctx.user.id`

## Styling & Design

### Dark Mode Theme
- **Primary**: Blue gradient (oklch color space)
- **Background**: Deep dark navy (`oklch(0.141 0.005 285.823)`)
- **Cards**: Slightly lighter dark (`oklch(0.21 0.006 285.885)`)
- **Text**: Light gray (`oklch(0.85 0.005 65)`)
- **Accents**: Platform-specific colors (pink for Instagram, black for TikTok, etc.)

### Typography
- **Headings**: Bold, tracking-tight for premium feel
- **Body**: Regular weight, clear hierarchy
- **Monospace**: For code snippets and technical content

### Animations
- **Page Transitions**: Fade-in (300ms)
- **Component Entry**: Slide-up with stagger (300ms per item)
- **Button Press**: Scale 0.97 (160ms)
- **Hover Effects**: Subtle elevation and color shifts
- **Accessibility**: Respects `prefers-reduced-motion`

## Testing

### Unit Tests
- Located in `server/*.test.ts`
- Uses Vitest framework
- Tests all tRPC procedures
- Validates platform labels (Instagram, TikTok, X, LinkedIn)
- Validates content status labels (draft, scheduled, published)
- Validates script structure (Hook/Body/CTA)

### Test Coverage
- Brand Voice CRUD operations
- Trend fetching and filtering
- Content generation for all types
- Calendar scheduling
- Library operations
- Daily briefing generation

## Deployment

### Environment Variables
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Session signing key
- `VITE_APP_ID`: Manus OAuth app ID
- `OAUTH_SERVER_URL`: Manus OAuth backend
- `BUILT_IN_FORGE_API_KEY`: LLM and API access token

### Build Process
```bash
pnpm build      # Build frontend + backend
pnpm start      # Start production server
pnpm dev        # Start development server
pnpm test       # Run test suite
```

### Hosting
- Deployed on Manus platform
- Auto-scaling with Cloud Run
- Database: Managed MySQL/TiDB
- Storage: S3-compatible object storage

## Performance Optimizations

1. **Frontend**:
   - Code splitting via Vite
   - Lazy loading for pages
   - Optimistic updates for mutations
   - Memoization for expensive computations

2. **Backend**:
   - Database query optimization with indexes
   - Caching for trends (30-minute TTL)
   - Batch operations where possible
   - Connection pooling for database

3. **Network**:
   - tRPC batching for multiple requests
   - Superjson for efficient serialization
   - Gzip compression for responses

## Future Enhancements

1. **Advanced Features**:
   - Drag-and-drop calendar rescheduling
   - Bulk content operations
   - Analytics dashboard
   - Team collaboration features
   - Content performance tracking

2. **AI Improvements**:
   - Fine-tuned models for specific niches
   - Multi-language support
   - Voice-to-text script generation
   - Image generation for posts

3. **Integrations**:
   - Direct platform posting (Instagram, TikTok, etc.)
   - Email notifications
   - Slack integration
   - Zapier/Make automation

## Troubleshooting

### Common Issues

1. **LLM timeouts**: Increase timeout in test configuration
2. **Database connection**: Verify `DATABASE_URL` and SSL settings
3. **OAuth errors**: Check `OAUTH_SERVER_URL` and app credentials
4. **Missing trends**: Ensure Data API is accessible

### Debug Mode

Enable debug logging:
```typescript
process.env.DEBUG = "social-media-agent:*";
```

## Contributing

1. Create feature branch from `main`
2. Implement feature with tests
3. Run `pnpm test` to verify
4. Submit PR with description
5. Deploy to staging for review

## License

MIT
