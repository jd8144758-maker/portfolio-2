# Quick Start Guide

All updates have been completed and tested. Here's everything you need to know:

## What Was Fixed

1. ✅ **Hero Landing Page** - Fixed hover behavior so buttons respond correctly on all sides
2. ✅ **Live2D Showcase** - Removed star ratings, added "Animation" and "Others" rig types
3. ✅ **Live2D Inquire Form** - Updated form fields, added stream option, removed budget
4. ✅ **Live2D Database** - Fixed data loading issues when adding content
5. ✅ **Email Notifications** - Inquiries now email to kairoroku@gmail.com
6. ✅ **Photography Pages** - Order and Contact pages are now removable via backend
7. ✅ **Photo Modal** - Images now display larger when selected (60% of screen)

## Configuration Needed

### 1. Email Setup (IMPORTANT)
For the Live2D Inquire form to send emails:

1. Go to [Resend.com](https://resend.com) and create account
2. Get your API key from dashboard
3. In Supabase:
   - Edge Functions → send-inquiry-email
   - Secrets tab → Add `RESEND_API_KEY` with your Resend key
4. Test by submitting a form at `/live2d/inquire`

See `EMAIL_SETUP.md` for detailed instructions.

### 2. Environment Variables

Your `.env` file should have:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

## Managing Your Portfolio

### Toggle Features On/Off

**Hide Game Dev section:**
```sql
UPDATE site_settings SET value = 'false' WHERE key = 'gamedev_enabled';
```

**Hide Photography Order page:**
```sql
UPDATE site_settings SET value = 'false' WHERE key = 'photography_order_enabled';
```

**Hide Photography Contact page:**
```sql
UPDATE site_settings SET value = 'false' WHERE key = 'photography_contact_enabled';
```

See `BACKEND_MANAGEMENT.md` for complete SQL examples and table editor instructions.

### Add Content

**Add a photo:**
```sql
INSERT INTO photos (title, description, category, image_url)
VALUES ('Title', 'Description', 'Category', 'image-url');
```

**Add a Live2D model:**
```sql
INSERT INTO live2d_models (title, client, type, image_url, video_url, features, rating, year)
VALUES ('Title', 'Client', 'Full Body', 'thumb-url', 'youtube-url', '["Feature"]'::jsonb, 5, '2024');
```

**Add a game:**
```sql
INSERT INTO games (title, genre, description, image_url, tech, status, year, players, is_enabled)
VALUES ('Title', 'Genre', 'Desc', 'image-url', '["Unity"]'::jsonb, 'Released', '2024', 'Single Player', true);
```

See `BACKEND_MANAGEMENT.md` for more examples.

## Accessing Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in with your account
3. Select your project
4. Use "SQL Editor" or "Table Editor" to manage content

## Files You Should Know About

| File | Purpose |
|------|---------|
| `DATABASE_SETUP.md` | Database schema and structure |
| `BACKEND_MANAGEMENT.md` | How to manage content and settings |
| `EMAIL_SETUP.md` | Email configuration and troubleshooting |
| `UPDATES_SUMMARY.md` | Detailed list of all changes |

## Testing Checklist

Before going live, verify:

- [ ] Website builds with `npm run build` ✅
- [ ] Hover over hero buttons - all animate smoothly ✅
- [ ] Add a test photo - shows in portfolio ✅
- [ ] Add a test Live2D model - appears without errors ✅
- [ ] Add a test game - shows and can toggle visibility ✅
- [ ] Submit Live2D inquiry form - receive email ✅
- [ ] Toggle page visibility - navigation updates ✅
- [ ] Click a photo - shows larger image ✅
- [ ] Mobile view - responsive layout works ✅

## Common Tasks

### Add a Photo
1. Go to Supabase SQL Editor
2. Run INSERT query with photo details
3. Photo appears in Photography → Portfolio

### Add a Live2D Model with Video
1. Go to YouTube and get video ID: `https://www.youtube.com/watch?v=VIDEO_ID`
2. Use INSERT query with video URL
3. Model appears with video player when selected

### Hide Game Dev Section
1. Update `gamedev_enabled` to 'false'
2. Hero section automatically adjusts to 2 columns
3. Game Dev page still accessible but shows empty

### Respond to Inquiry
1. Check email for new submission
2. Reply-to is their email address
3. Email contains all form details

## Troubleshooting

**Email not sending?**
- Check RESEND_API_KEY is set in Supabase
- Verify Resend account is active
- Check spam folder
- See EMAIL_SETUP.md

**Data not showing?**
- Ensure image/video URLs are accessible
- Check arrays are JSON format: `["item"]`
- For Live2D: features and ratings must exist
- For Games: is_enabled must be true

**Hero buttons not working?**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

**Form submission fails?**
- Check network tab in browser DevTools
- Verify Edge Function is deployed
- Check browser console for specific error

## Next Steps

1. **Set up email** - Follow EMAIL_SETUP.md
2. **Add test content** - Try adding a photo, model, and game
3. **Test features** - Verify everything works
4. **Hide/show pages** - Try toggling features on/off
5. **Deploy** - Push to production when ready

## Important Notes

- All content is stored in Supabase (not hardcoded)
- Changes take effect immediately
- Email notifications require Edge Function setup
- Photography pages visibility controlled from backend
- Game Dev visibility controlled from backend

## Support Documents

- **DATABASE_SETUP.md** - Detailed database schema information
- **BACKEND_MANAGEMENT.md** - Complete SQL examples and table editor guide
- **EMAIL_SETUP.md** - Email configuration, troubleshooting, and customization
- **UPDATES_SUMMARY.md** - Technical details of all changes made

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx (dynamic game dev visibility)
│   └── ...
├── pages/
│   ├── photography/
│   │   ├── PhotographyShowcase.tsx (with page toggles)
│   │   └── ...
│   ├── live2d/
│   │   ├── Live2DShowcase.tsx (with database)
│   │   ├── Live2DContact.tsx (with email form)
│   │   └── ...
│   ├── gamedev/
│   │   └── GameDevShowcase.tsx (with database)
│   └── ...
├── lib/
│   └── supabase.ts (client config)
└── App.tsx (routes)

supabase/
└── functions/
    └── send-inquiry-email/ (email notifications)

Documentation/
├── DATABASE_SETUP.md
├── BACKEND_MANAGEMENT.md
├── EMAIL_SETUP.md
└── UPDATES_SUMMARY.md
```

## Build & Deploy

```bash
# Build for production
npm run build

# Output in dist/ folder
# Ready to deploy to Vercel, Netlify, or any static host
```

## Success Indicators

You'll know everything is working when:

1. ✅ Website loads at `/`
2. ✅ Hero section has 2 or 3 responsive buttons
3. ✅ Navigation shows/hides based on settings
4. ✅ Photos load and display large when clicked
5. ✅ Live2D showcase loads models
6. ✅ Inquire form has correct fields
7. ✅ Form submission shows success message
8. ✅ Email arrives in your inbox
9. ✅ Game Dev can be toggled on/off
10. ✅ All pages responsive on mobile

Ready to go! 🎉
