# Backend Management Guide

This guide explains how to manage your portfolio from the Supabase dashboard.

## Accessing Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project
4. Click on "SQL Editor" in the left sidebar

## Managing Site Settings

All site-wide settings are stored in the `site_settings` table.

### Toggle Features

#### Hide/Show Game Dev Section
```sql
-- Hide Game Dev
UPDATE site_settings
SET value = 'false'
WHERE key = 'gamedev_enabled';

-- Show Game Dev
UPDATE site_settings
SET value = 'true'
WHERE key = 'gamedev_enabled';
```

When disabled:
- Game Dev section disappears from landing page
- Photography and Live2D sections expand to full width
- `/gamedev` route still exists but shows empty state

#### Hide/Show Photography Order Page
```sql
-- Hide Order Page
UPDATE site_settings
SET value = 'false'
WHERE key = 'photography_order_enabled';

-- Show Order Page
UPDATE site_settings
SET value = 'true'
WHERE key = 'photography_order_enabled';
```

#### Hide/Show Photography Contact Page
```sql
-- Hide Contact Page
UPDATE site_settings
SET value = 'false'
WHERE key = 'photography_contact_enabled';

-- Show Contact Page
UPDATE site_settings
SET value = 'true'
WHERE key = 'photography_contact_enabled';
```

## Managing Content

### Photography Portfolio

#### Add a Photo
```sql
INSERT INTO photos (title, description, category, image_url)
VALUES (
  'Photo Title',
  'Detailed description of the photo',
  'Category Name',
  'https://example.com/photo.jpg'
);
```

**Categories:** Urban, Nature, Portrait, Abstract, Street, Architecture, etc.

#### Edit a Photo
```sql
UPDATE photos
SET
  title = 'New Title',
  description = 'New description',
  category = 'New Category',
  image_url = 'https://new-url.jpg'
WHERE id = 'photo-id-here';
```

#### Delete a Photo
```sql
DELETE FROM photos
WHERE id = 'photo-id-here';
```

### Live2D Models

#### Add a Model
```sql
INSERT INTO live2d_models (title, client, type, image_url, video_url, features, rating, year)
VALUES (
  'Model Title',
  'Client Name',
  'Full Body',
  'https://example.com/thumb.jpg',
  'https://www.youtube.com/watch?v=VIDEO_ID',
  '["Feature 1", "Feature 2", "Feature 3"]'::jsonb,
  5,
  '2024'
);
```

**Types:** Full Body, Half Body, Chibi, Animation, Others, etc.

**Features:** JSON array of features
- Full body rigging
- Physics
- Facial tracking
- Eye tracking
- etc.

**Video URL Options:**
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- YouTube Short: `https://youtu.be/VIDEO_ID`
- Direct MP4: `https://example.com/video.mp4`

#### Update a Model
```sql
UPDATE live2d_models
SET
  title = 'New Title',
  features = '["Updated Feature 1", "Updated Feature 2"]'::jsonb
WHERE id = 'model-id-here';
```

#### Delete a Model
```sql
DELETE FROM live2d_models
WHERE id = 'model-id-here';
```

### Games

#### Add a Game
```sql
INSERT INTO games (
  title,
  genre,
  description,
  image_url,
  tech,
  status,
  year,
  players,
  is_enabled
)
VALUES (
  'Game Title',
  'Action Platformer',
  'Game description',
  'https://example.com/game.jpg',
  '["Unity", "C#", "2D"]'::jsonb,
  'Released',
  '2024',
  'Single Player',
  true
);
```

**Important:** Set `is_enabled = true` to show the game

#### Hide a Game
```sql
UPDATE games
SET is_enabled = false
WHERE id = 'game-id-here';
```

#### Show a Game
```sql
UPDATE games
SET is_enabled = true
WHERE id = 'game-id-here';
```

#### Delete a Game
```sql
DELETE FROM games
WHERE id = 'game-id-here';
```

## Viewing Data

### View All Photos
```sql
SELECT * FROM photos
ORDER BY created_at DESC;
```

### View All Live2D Models
```sql
SELECT * FROM live2d_models
ORDER BY created_at DESC;
```

### View All Games
```sql
SELECT * FROM games
ORDER BY created_at DESC;
```

### View Enabled Games Only
```sql
SELECT * FROM games
WHERE is_enabled = true
ORDER BY created_at DESC;
```

### View All Settings
```sql
SELECT * FROM site_settings;
```

## Using the Table Editor

Instead of SQL, you can also use Supabase's Table Editor:

1. Go to "Table Editor" in the left sidebar
2. Select the table you want to edit
3. Click on rows to edit, or use the "+" button to add new entries

### Adding Entries via Table Editor

1. Click the "+" button in the relevant table
2. Fill in the fields:
   - For JSON fields (features, tech): Enter as JSON: `["Item 1", "Item 2"]`
   - For arrays: Use the JSON format above
3. Click "Save"

## Troubleshooting

### JSON Array Format Error

If you get an error with JSON fields, make sure to:
1. Include the `::jsonb` cast: `'["item"]'::jsonb`
2. Use double quotes: `["item"]` not `['item']`
3. Escape quotes properly if nested

### Photo Not Showing

Check:
- Image URL is accessible (not broken link)
- Category is correctly spelled
- Title is not empty

### Live2D Video Not Playing

Check:
- Video URL is correct format
- For YouTube: Use full URL, not just video ID
- Direct videos: Ensure CORS is enabled on hosting

### Game Not Showing in Showcase

Check:
- `is_enabled = true`
- Status is not "Cancelled" or "Unreleased"
- Tech array has at least one item

## Tips

- Always make backups before bulk updates
- Test changes in development first
- Use meaningful names for easy management
- Keep descriptions concise but descriptive
- Update images regularly for freshness

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify database credentials in `.env`
3. Ensure Supabase project is active
4. Check Row Level Security policies allow your actions
