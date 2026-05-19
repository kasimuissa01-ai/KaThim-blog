# Social Media AI Agent - Feature Documentation

## Platform Support

The platform supports exactly four social media platforms with dedicated UI components and optimization:

- **Instagram**: Visual-first platform optimized for carousel posts, reels, and stories
- **TikTok**: Short-form video platform with Hook/Body/CTA script structure
- **X** (formerly Twitter): Text-first platform optimized for threads and engagement
- **LinkedIn**: Professional network optimized for thought leadership and industry insights

## Content Status Labels

All content in the system uses exactly three status labels:

- **Draft**: Content created but not yet scheduled or published
- **Scheduled**: Content assigned to a future posting date and time
- **Published**: Content that has been posted to the platform

## Video Script Structure

All video scripts follow the exact Hook / Body / CTA format:

- **Hook (0-3 seconds)**: Attention-grabbing opening that stops the scroll
- **Body (3-25 seconds)**: Main content, value, or story that engages the viewer
- **CTA (25-30 seconds)**: Call-to-action directing viewers to take the next step

## Feature Details

### 1. Dashboard Home

The Dashboard Home provides a comprehensive overview of your daily content strategy in one unified view.

**Key Components:**
- Daily Content Strategy Overview showing key metrics and insights
- Trending Topics Summary widget displaying top 3-5 trending keywords across platforms
- Content Calendar Snapshot showing the next 7 days of scheduled content
- Quick Action Buttons for rapid access to content generation and trend analysis
- Daily Statistics panel showing counts of scheduled, draft, and published content

**Interactions:**
- Click "Generate Scripts" to jump directly to the Content Generator
- Click "Analyze Trends" to explore trending topics
- Click "View Calendar" to see the full content calendar
- Click "View Briefing" to read today's AI-generated strategy briefing

### 2. Trend Analyzer

The Trend Analyzer helps you discover what's trending across all social platforms and provides actionable insights for content creation.

**Key Features:**
- Real-time trend data from Google Trends API
- Platform-specific trend filtering (Instagram, TikTok, X, LinkedIn)
- Growth rate indicators showing percentage increase in search volume
- Search volume metrics for each trend
- Related keywords and hashtag suggestions
- Trend category classification (technology, lifestyle, entertainment, etc.)
- Search functionality to find specific trends

**Workflow:**
1. Browse trending topics or search for specific keywords
2. Filter by platform to see platform-specific trends
3. Review growth rate and volume metrics
4. Click "Use for Content" to select a trend for content generation
5. View related keywords and hashtags for inspiration

### 3. AI Content Generator

The AI Content Generator creates platform-optimized content powered by advanced language models.

**Supported Content Types:**
- **Posts**: Platform-specific text content with optimal length and formatting
- **Scripts**: Video scripts in Hook/Body/CTA format for TikTok, Instagram Reels, etc.
- **Captions**: Engaging captions with emoji suggestions and hashtag recommendations
- **Hashtags**: Platform-optimized hashtag sets for maximum discoverability

**Generation Process:**
1. Enter a trend topic or select from trending topics
2. Choose target platform (Instagram, TikTok, X, LinkedIn)
3. Select content type (post, script, caption, hashtags)
4. Click "Generate Content"
5. Review generated content in preview panel
6. Click "Regenerate" for alternative versions
7. Click "Copy" to copy to clipboard
8. Click "Save" to add to content library

**AI Customization:**
- Brand Voice Integration: Content respects your configured brand voice, tone, and content pillars
- Platform Optimization: Each platform receives content tailored to its unique audience and format
- Tone Selection: Choose from professional, casual, playful, inspirational, or educational tones
- Emoji Suggestions: For captions, AI suggests relevant emojis (optional)

### 4. Script Editor

The Script Editor provides a dedicated workspace for refining video scripts with the Hook / Body / CTA structure.

**Editor Features:**
- Three-section editor for Hook, Body, and CTA sections
- Live platform preview panel showing how the script appears on the target platform
- Character count for each section
- Timing indicators showing estimated duration for each section
- Copy buttons for individual sections or entire script

**Script Structure:**
- **Hook**: 0-3 seconds, captures attention immediately
- **Body**: 3-25 seconds, delivers main message and value
- **CTA**: 25-30 seconds, directs viewer to take action

**Editing Workflow:**
1. Open existing script or create new one
2. Edit Hook section for attention-grabbing opening
3. Edit Body section with main content
4. Edit CTA section with call-to-action
5. Watch live preview update as you type
6. Click "Regenerate" to get AI alternatives
7. Click "Copy All" to copy entire script
8. Click "Save Script" to add to library

### 5. Content Calendar

The Content Calendar provides visual scheduling and management of content across all platforms.

**Calendar Views:**
- **Monthly View**: Full month grid showing all scheduled content
- **Weekly View**: Detailed week view with time slots (coming soon)

**Calendar Features:**
- Visual representation of scheduled content
- Platform badges (Instagram, TikTok, X, LinkedIn) on calendar items
- Status indicators (draft, scheduled, published)
- Color-coded by platform for quick identification
- Hover to see content preview
- Click to edit or reschedule content

**Scheduling Workflow:**
1. View calendar for desired month or week
2. Click date to create new content
3. Select platform and content type
4. Generate or paste content
5. Set posting time
6. Confirm scheduling
7. Content appears on calendar

**Features (Current & Planned):**
- [x] Monthly grid view with content display
- [x] Platform badges and status indicators
- [ ] Drag-and-drop rescheduling
- [ ] Weekly view with time slots
- [ ] Date range filtering
- [ ] Platform filter toggles

### 6. Content Library

The Content Library is your centralized repository for all generated and saved content.

**Library Features:**
- Searchable content list with full-text search
- Filter by platform (Instagram, TikTok, X, LinkedIn)
- Filter by status (draft, scheduled, published)
- Filter by tags and categories
- Content preview with metadata
- Edit and delete individual items
- Bulk operations (coming soon)

**Content Organization:**
- Each item shows platform badge and status indicator
- Tags for easy categorization and filtering
- Created date and scheduled date (if applicable)
- Content type indicator (post, script, caption, hashtags)
- Quick action buttons (edit, delete, schedule, publish)

**Library Workflow:**
1. Search for specific content or browse all
2. Filter by platform, status, or tags
3. Click item to view full content
4. Edit content inline or in dedicated editor
5. Change status (draft → scheduled → published)
6. Add or remove tags
7. Delete content when no longer needed

### 7. Brand Voice & Strategy Settings

The Brand Voice Settings page allows you to define your brand identity and content strategy preferences.

**Brand Voice Configuration:**
- **Niche/Industry**: Define your business category (e.g., Tech Startups, Fashion, Fitness)
- **Target Audience**: Describe your ideal customer or audience
- **Tone of Voice**: Select from professional, casual, playful, inspirational, or educational
- **Content Pillars**: Define up to 5 core topics or themes for your content

**Connected Platforms:**
- Toggle each platform on/off (Instagram, TikTok, X, LinkedIn)
- Add platform-specific usernames or profile URLs
- Configure platform-specific settings and preferences
- Enable/disable auto-posting (future feature)

**Configuration Workflow:**
1. Enter your niche and describe target audience
2. Select your brand tone of voice
3. Add content pillars (core topics)
4. Toggle platforms you want to use
5. Add usernames for each platform
6. Click "Save" to persist settings
7. All future content generation respects these settings

### 8. Daily Strategy Briefing

The Daily Strategy Briefing is an AI-generated daily report with actionable content strategy recommendations.

**Briefing Content:**
- **Recommended Topics**: Top topics with highest engagement potential for today
- **Best Posting Times**: Optimal posting times for each platform based on audience activity
- **Content Suggestions**: Recommended content types and formats for each platform
- **Engagement Predictions**: Estimated engagement metrics for different content types

**Briefing Sections:**
- Overview tab: Executive summary of recommendations
- Posting Times tab: Platform-specific optimal posting times
- Suggestions tab: Detailed content type recommendations with reasoning

**Using the Briefing:**
1. Review recommended topics for the day
2. Check best posting times for each platform
3. Review content type suggestions
4. Click "Create Content" to generate content for suggested topics
5. Click "Regenerate Briefing" for updated recommendations
6. Schedule content based on recommended posting times

**Personalization:**
- Briefing respects your brand voice and content pillars
- Recommendations based on your audience and niche
- Considers your connected platforms
- Updates daily with fresh insights

## Workflow Examples

### Example 1: Create Instagram Post from Trending Topic

1. Go to Dashboard Home
2. Click "Analyze Trends"
3. Browse trending topics or search for relevant keyword
4. Click "Use for Content" on desired trend
5. Go to Content Generator
6. Verify trend is selected
7. Select "Instagram" as platform
8. Select "Post" as content type
9. Click "Generate Content"
10. Review generated post
11. Click "Copy" to copy to clipboard
12. Click "Save" to add to library
13. Go to Content Calendar
14. Click date to schedule
15. Set posting time
16. Confirm scheduling

### Example 2: Create TikTok Script with Hook/Body/CTA

1. Go to Content Generator
2. Enter trend topic (e.g., "AI tips for creators")
3. Select "TikTok" as platform
4. Select "Script" as content type
5. Click "Generate Content"
6. Review Hook/Body/CTA structure
7. Click "Copy All" to copy script
8. Go to Script Editor
9. Paste script into editor
10. Fine-tune Hook for better attention-grabbing
11. Adjust Body timing if needed
12. Enhance CTA with specific call-to-action
13. Watch live preview update
14. Click "Save Script" to library
15. Go to Content Calendar to schedule

### Example 3: Manage Content Library

1. Go to Content Library
2. Search for specific content or browse all
3. Filter by platform (e.g., "LinkedIn")
4. Filter by status (e.g., "Draft")
5. Click item to view full content
6. Edit content if needed
7. Add tags for organization
8. Change status to "Scheduled"
9. Set posting date and time
10. Confirm changes
11. Content appears on calendar

## Best Practices

### Content Generation
- Always review AI-generated content before posting
- Customize generated content to match your brand voice
- Use the Script Editor to refine video scripts
- Test different content types to see what resonates

### Scheduling
- Plan content 1-2 weeks in advance
- Use the Daily Briefing to identify optimal posting times
- Schedule content during peak engagement hours
- Mix content types (posts, videos, captions) for variety

### Brand Voice
- Update brand voice settings regularly as your brand evolves
- Ensure content pillars align with business goals
- Maintain consistent tone across all platforms
- Review and adjust tone based on audience feedback

### Trend Analysis
- Check trends daily for fresh content ideas
- Focus on trends relevant to your niche
- Monitor competitor trends in your industry
- Balance trending topics with evergreen content

## Keyboard Shortcuts (Future)

- `Cmd/Ctrl + G`: Generate new content
- `Cmd/Ctrl + S`: Save content
- `Cmd/Ctrl + /`: Open command palette
- `Cmd/Ctrl + K`: Search content library

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- High contrast dark mode
- Focus indicators on all interactive elements
- Respects `prefers-reduced-motion` setting

## Support & Feedback

For questions, issues, or feature requests, please contact support or submit feedback through the app.
