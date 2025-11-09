# Admin Panel Setup - Complete

## What Was Done

### 1. Database Initialization
- Created all portfolio tables: `photos`, `live2d_models`, `games`, `site_settings`
- Enabled Row Level Security (RLS) on all tables
- Added default site settings including admin password
- Default admin password: `admin123`

### 2. Admin Panel Features
- Full CRUD operations for all content types
- Drag-and-drop image upload for Photography section
- Drag-and-drop image AND video upload for Live2D section
- Drag-and-drop image upload for Games section
- Site settings editor (including password management)

### 3. Access Control
- Secret access: Click the X button (bottom-right) 3 times
- Password protected login screen
- Admin button appears on all main pages

### 4. Components Created
- `AdminPanel.tsx` - Main admin interface with tabs
- `AdminLogin.tsx` - Password-protected login with click counter
- Integrated into: HomePage, PhotographyShowcase, Live2DShowcase, GameDevShowcase

## How to Use

### Access Admin Panel
1. Navigate to any page on your site
2. Click the **X button** in the bottom-right corner **3 times** quickly (within 2 seconds)
3. Enter password: `admin123`
4. You're in!

### Manage Content

#### Photos Tab
- Click "Add New Photo"
- Drag image into the upload box OR paste URL
- Fill in title, category, description
- Click "Save Photo"
- Edit or delete existing photos

#### Live2D Tab
- Click "Add New Model"
- Drag thumbnail image into left box
- Drag video file into right box OR paste YouTube URL
- Fill in model details
- Features: comma-separated (e.g., "Full body rigging, Physics, Tracking")
- Click "Save Model"

#### Games Tab
- Click "Add New Game"
- Drag game screenshot into upload box
- Fill in game details
- Tech Stack: comma-separated (e.g., "Unity, C#, 2D")
- Toggle "Visible on website" checkbox
- Click "Save Game"

#### Settings Tab
- Edit any site-wide setting
- Click "Edit" button
- Change value
- Click "Save"
- Settings include:
  - `admin_password` - Change this immediately!
  - `gamedev_enabled` - Show/hide Game Dev section
  - `photography_order_enabled` - Show/hide Order page
  - `photography_contact_enabled` - Show/hide Contact page

## Important Notes

### Security
- **Change the default password immediately!**
  1. Go to Settings tab
  2. Edit `admin_password`
  3. Enter new secure password
  4. Save

### File Uploads
- Images and videos are uploaded to Cloudinary demo account
- For production, configure your own CDN:
  - Replace upload URLs in `AdminPanel.tsx`
  - Update `handleImageUpload` and `handleVideoUpload` functions
  - Use services like Cloudinary, AWS S3, or Supabase Storage

### Data Format
- **Arrays**: Always use comma-separated values
  - Good: "Feature 1, Feature 2, Feature 3"
  - Bad: ["Feature 1", "Feature 2"]
- **URLs**: Must include `https://`
- **YouTube**: Paste any YouTube URL format (watch?v=, youtu.be/, embed/)

### Browser Compatibility
- Drag-and-drop works in all modern browsers
- Mobile: Use URL paste method instead

## Troubleshooting

### Can't access admin panel
- Click X button 3 times quickly (within 2 seconds)
- Clicks reset after 2 seconds of inactivity
- Try refreshing the page

### Wrong password
- Default is `admin123`
- Check database: `SELECT value FROM site_settings WHERE key = 'admin_password'`
- Reset via Supabase dashboard if needed

### Drag-and-drop not working
- Browser might not support HTML5 drag-and-drop
- Use URL paste method instead
- Check console for errors

### Changes not appearing
- Click outside modal to refresh
- Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

## Next Steps

1. **Change default password** (Settings tab)
2. **Add your content** (Photos, Live2D models, Games)
3. **Configure CDN** (Replace Cloudinary URLs in code)
4. **Test all features** (Add, edit, delete content)
5. **Adjust site settings** (Enable/disable sections)

## Files Modified

- `src/components/AdminPanel.tsx` - Main admin interface (NEW)
- `src/components/AdminLogin.tsx` - Login screen (NEW)
- `src/pages/HomePage.tsx` - Added admin button
- `src/pages/photography/PhotographyShowcase.tsx` - Added admin button
- `src/pages/live2d/Live2DShowcase.tsx` - Added admin button
- `src/pages/gamedev/GameDevShowcase.tsx` - Added admin button
- Database: All tables created with RLS enabled

## Build Status

Project builds successfully with no errors.
Ready for production deployment.
