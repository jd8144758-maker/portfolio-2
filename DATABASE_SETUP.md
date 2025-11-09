# Database Setup Guide

This portfolio uses Supabase for data management. All content is now dynamic and can be managed through the database.

## Environment Setup

1. Copy `.env.example` to `.env`
2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Tables

### 1. Photos Table
Stores photography portfolio images.

**Fields:**
- `id` (uuid) - Primary key
- `title` (text) - Photo title
- `description` (text) - Photo description
- `category` (text) - Category (e.g., "Urban", "Nature", "Portrait")
- `image_url` (text) - URL to the image
- `created_at` (timestamptz) - Creation timestamp

**Example Insert:**
```sql
INSERT INTO photos (title, description, category, image_url)
VALUES (
  'Golden Hour Cityscape',
  'Urban beauty bathed in warm sunset light',
  'Urban',
  'https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg'
);
```

### 2. Live2D Models Table
Stores Live2D model portfolio items.

**Fields:**
- `id` (uuid) - Primary key
- `title` (text) - Model title
- `client` (text) - Client name
- `type` (text) - Rig type ("Full Body", "Half Body", "Chibi", etc.)
- `image_url` (text) - Thumbnail image URL
- `video_url` (text) - YouTube embed URL or direct video URL
- `features` (jsonb) - Array of features (e.g., `["Full body rigging", "Physics"]`)
- `rating` (integer) - Star rating (1-5)
- `year` (text) - Year completed
- `created_at` (timestamptz) - Creation timestamp

**Video URL Formats:**
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`
- Direct video: Any direct video URL (mp4, webm, etc.)

**Example Insert:**
```sql
INSERT INTO live2d_models (title, client, type, image_url, video_url, features, rating, year)
VALUES (
  'Ethereal Mage VTuber',
  'StreamerName',
  'Full Body',
  'https://example.com/image.jpg',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  '["Full body rigging", "Advanced physics", "Facial tracking"]'::jsonb,
  5,
  '2024'
);
```

### 3. Games Table
Stores game development portfolio items.

**Fields:**
- `id` (uuid) - Primary key
- `title` (text) - Game title
- `genre` (text) - Game genre
- `description` (text) - Short description
- `image_url` (text) - Game screenshot/banner
- `tech` (jsonb) - Tech stack array (e.g., `["Unity", "C#", "2D"]`)
- `status` (text) - Development status
- `year` (text) - Release year
- `players` (text) - Player count (e.g., "Single Player")
- `is_enabled` (boolean) - Whether to show this game (true/false)
- `created_at` (timestamptz) - Creation timestamp

**Example Insert:**
```sql
INSERT INTO games (title, genre, description, image_url, tech, status, year, players, is_enabled)
VALUES (
  'Neon Runner',
  'Action Platformer',
  'Fast-paced cyberpunk platformer with fluid movement mechanics',
  'https://example.com/game.jpg',
  '["Unity", "C#", "2D"]'::jsonb,
  'Released',
  '2023',
  'Single Player',
  true
);
```

### 4. Site Settings Table
Global site configuration.

**Fields:**
- `id` (uuid) - Primary key
- `key` (text) - Setting key (unique)
- `value` (text) - Setting value
- `updated_at` (timestamptz) - Last update timestamp

**Important Settings:**
- `gamedev_enabled` - Set to "true" or "false" to show/hide Game Dev section

**Example Update:**
```sql
-- Hide Game Dev section
UPDATE site_settings
SET value = 'false'
WHERE key = 'gamedev_enabled';

-- Show Game Dev section
UPDATE site_settings
SET value = 'true'
WHERE key = 'gamedev_enabled';
```

## Pricing Information

The Live2D Inquire page displays these pricing packages:
- **Full Body**: $600 USD - Complete full body rigging with advanced physics
- **Half Body**: $400 USD - Upper body rigging with expression support
- **Chibi**: $300 USD - Cute chibi style rigging

These prices are hardcoded in the component and can be adjusted in:
`src/pages/live2d/Live2DContact.tsx`

## Security

All tables have Row Level Security (RLS) enabled:
- **Public** can view all content (SELECT)
- **Authenticated users** can insert, update, and delete content
- This ensures your portfolio is publicly viewable while keeping management secure

## Features

### Dynamic Content
- All photos, models, and games are loaded from the database
- Content updates in real-time without code changes
- Easy to add, edit, or remove portfolio items

### Video Support (Live2D)
- Supports YouTube embeds (automatically converts URLs)
- Supports direct video files
- Videos play in modal when viewing model details

### Hideable Game Dev Section
- Toggle Game Dev section visibility via database
- Landing page automatically adjusts layout (2 or 3 columns)
- Games can be individually enabled/disabled via `is_enabled` field

### Loading States
- All pages show loading spinners while fetching data
- Graceful empty states when no content available
- Error handling for database connection issues
