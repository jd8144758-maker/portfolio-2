# Supabase Storage Integration - Complete

## Summary

The admin panel has been fully integrated with Supabase Storage for all file uploads. Previously, files were uploaded to a Cloudinary demo account - now they're stored in your own Supabase Storage buckets with proper security and organization.

## What Was Implemented

### 1. Storage Module (`src/lib/storage.ts`)

Created a comprehensive storage utility module with:

- **`uploadFile(file, bucket, folder?)`** - Upload files to Supabase Storage
- **`deleteFile(bucket, path)`** - Remove files from storage
- **`getPublicUrl(bucket, path)`** - Get public URL for stored files
- **`validateFileType(file, allowedTypes)`** - Validate file MIME types
- **`validateFileSize(file, maxSizeMB)`** - Check file size limits

**Features:**
- Automatic file naming with timestamps and random strings
- Error handling with user-friendly messages
- Public URL generation for easy access
- Folder organization support

### 2. Updated Admin Panel (`src/components/AdminPanel.tsx`)

**Changed Functions:**

**Before:**
```typescript
const handleImageUpload = async (file: File): Promise<string> => {
  // Upload to Cloudinary demo account
  const response = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', ...);
}
```

**After:**
```typescript
const handleImageUpload = async (file: File, bucket: 'photos' | 'live2d-images' | 'games'): Promise<string> => {
  // Validate file type and size
  // Upload to Supabase Storage
  const result = await uploadFile(file, bucket);
  return result.url;
}
```

**Key Improvements:**
- Proper bucket routing (photos → `photos`, live2d images → `live2d-images`, games → `games`)
- File type validation (only allowed formats)
- File size validation (10 MB images, 100 MB videos)
- Better error messages
- Returns empty string on failure instead of blob URLs

### 3. Database Migration

**File:** `supabase/migrations/20251109000000_create_storage_buckets.sql`

Creates 4 storage buckets:
1. **`photos`** - Photography portfolio images (10 MB max)
2. **`live2d-images`** - Live2D model thumbnails (10 MB max)
3. **`live2d-videos`** - Live2D model videos (100 MB max)
4. **`games`** - Game screenshots (10 MB max)

**Security Policies:**
- Public read access (anyone can view files)
- Authenticated write access (only admins can upload)
- Authenticated delete access (only admins can remove)

### 4. Section Updates

**PhotosSection:**
- Uploads to `photos` bucket
- Shows upload status with spinner
- Validates image types (JPEG, PNG, WebP, GIF)

**Live2DSection:**
- Images upload to `live2d-images` bucket
- Videos upload to `live2d-videos` bucket
- Separate validation for images and videos

**GamesSection:**
- Uploads to `games` bucket
- Same validation as photos

## File Structure

```
src/
├── lib/
│   ├── supabase.ts (existing)
│   └── storage.ts (NEW)
├── components/
│   └── AdminPanel.tsx (UPDATED)

supabase/
└── migrations/
    └── 20251109000000_create_storage_buckets.sql (NEW)

Documentation/
├── STORAGE_SETUP.md (NEW)
└── SUPABASE_STORAGE_INTEGRATION.md (NEW - this file)
```

## How Data Flows

### Upload Process

```
User drops file in admin panel
         ↓
File type & size validation
         ↓
Upload to Supabase Storage bucket
         ↓
Get public URL
         ↓
Save URL to database (photos/live2d_models/games table)
         ↓
Frontend displays image/video using URL
```

### Example Upload

1. Admin drags photo into Photos tab
2. System validates: JPEG ✓, 5 MB ✓
3. Uploads to `photos` bucket as `1699564123-x7k3n2.jpeg`
4. Receives URL: `https://your-project.supabase.co/storage/v1/object/public/photos/1699564123-x7k3n2.jpeg`
5. Saves URL to `photos` table
6. Photo appears in portfolio immediately

## Security Configuration

### Bucket Policies

All buckets have 4 policies:

1. **Public Read** - Anyone can view files
   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'bucket_name');
   ```

2. **Authenticated Insert** - Only logged-in users can upload
   ```sql
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'bucket_name');
   ```

3. **Authenticated Update** - Only logged-in users can update
   ```sql
   CREATE POLICY "Authenticated users can update"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING (bucket_id = 'bucket_name');
   ```

4. **Authenticated Delete** - Only logged-in users can delete
   ```sql
   CREATE POLICY "Authenticated users can delete"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'bucket_name');
   ```

### Why This Design?

- **Public read**: Portfolio must be viewable by everyone
- **Authenticated write**: Prevents unauthorized uploads
- **Row Level Security**: Extra security layer
- **Bucket separation**: Organized storage structure

## File Validation Rules

### Images (photos, live2d-images, games)

**Allowed Types:**
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/webp`
- `image/gif`

**Max Size:** 10 MB (10,485,760 bytes)

### Videos (live2d-videos)

**Allowed Types:**
- `video/mp4`
- `video/webm`
- `video/quicktime` (MOV)
- `video/x-msvideo` (AVI)

**Max Size:** 100 MB (104,857,600 bytes)

### Why These Limits?

- **10 MB images**: Balance between quality and load time
- **100 MB videos**: Allows reasonable video quality while preventing abuse
- **Specific types**: Ensures browser compatibility and security

## Benefits Over Cloudinary

| Feature | Cloudinary Demo | Supabase Storage |
|---------|----------------|------------------|
| **Cost** | Free demo (limited) | Included in Supabase plan |
| **Integration** | External service | Native integration |
| **Security** | Public demo account | Your own secure buckets |
| **Control** | No control | Full control |
| **Reliability** | Demo can be reset | Production-ready |
| **Backups** | None | Included in Supabase backups |
| **CDN** | Yes | Yes (built-in) |

## Testing Checklist

After setting up storage buckets:

- [ ] Photos upload successfully
- [ ] Live2D images upload successfully
- [ ] Live2D videos upload successfully
- [ ] Game images upload successfully
- [ ] Invalid file types are rejected
- [ ] Oversized files are rejected
- [ ] Uploaded images display on site
- [ ] Uploaded videos play correctly
- [ ] URLs start with your Supabase URL
- [ ] Files appear in Storage dashboard

## Usage in Admin Panel

### Adding a Photo

1. Admin Panel → Photos tab → Add New Photo
2. Drag image or paste URL
3. System validates and uploads to `photos` bucket
4. URL automatically saved in database
5. Photo appears in portfolio

### Adding a Live2D Model

1. Admin Panel → Live2D tab → Add New Model
2. Drag thumbnail image → Uploads to `live2d-images`
3. Drag video file → Uploads to `live2d-videos`
4. Both URLs saved in database
5. Model appears in showcase

### Adding a Game

1. Admin Panel → Games tab → Add New Game
2. Drag screenshot → Uploads to `games` bucket
3. URL saved in database
4. Game appears in portfolio

## Monitoring & Maintenance

### Check Storage Usage

1. Supabase Dashboard → Storage
2. View usage per bucket
3. Monitor total storage used

### Delete Unused Files

Files are NOT automatically deleted when database entries are removed.

**To clean up:**
1. Go to Storage in Supabase Dashboard
2. Select bucket
3. Find and delete unused files

**Or** implement automatic cleanup (advanced):
- Use Supabase Edge Functions
- Delete storage files when database records deleted

### Storage Limits

**Free Tier:**
- 1 GB storage
- 2 GB bandwidth/month

**Pro Tier:**
- 100 GB storage
- 200 GB bandwidth/month

## Troubleshooting

### Issue: "Upload failed" error

**Causes:**
- Buckets not created
- Policies missing
- Network error

**Solutions:**
1. Verify buckets exist in dashboard
2. Check policies are set
3. Check browser console for errors

### Issue: Images don't load on site

**Causes:**
- Bucket not public
- URL incorrect
- CORS issue

**Solutions:**
1. Verify bucket is public
2. Check URL in database
3. Check Supabase CORS settings

### Issue: "Invalid file type" error

**Cause:** Uploading unsupported format

**Solution:** Use only allowed file types (see validation rules above)

### Issue: "File too large" error

**Cause:** File exceeds size limit

**Solution:** Compress file before uploading

## Code Examples

### Upload Image Manually

```typescript
import { uploadFile } from './lib/storage';

const handleUpload = async (file: File) => {
  const result = await uploadFile(file, 'photos');

  if (result.error) {
    console.error('Upload failed:', result.error);
    return;
  }

  console.log('Upload successful:', result.url);
  // Save result.url to database
};
```

### Validate Before Upload

```typescript
import { validateFileType, validateFileSize, IMAGE_ALLOWED_TYPES, MAX_IMAGE_SIZE_MB } from './lib/storage';

const canUpload = (file: File) => {
  if (!validateFileType(file, IMAGE_ALLOWED_TYPES)) {
    alert('Invalid file type');
    return false;
  }

  if (!validateFileSize(file, MAX_IMAGE_SIZE_MB)) {
    alert('File too large');
    return false;
  }

  return true;
};
```

### Delete File

```typescript
import { deleteFile } from './lib/storage';

const handleDelete = async (path: string) => {
  const result = await deleteFile('photos', path);

  if (!result.success) {
    console.error('Delete failed:', result.error);
    return;
  }

  console.log('File deleted successfully');
};
```

## Next Steps

1. **Set up storage buckets** - Follow `STORAGE_SETUP.md`
2. **Test all upload types** - Verify photos, Live2D, games
3. **Monitor usage** - Check storage dashboard regularly
4. **Optimize files** - Compress before uploading to save space

## Support

- **Supabase Storage Docs**: https://supabase.com/docs/guides/storage
- **Security Policies**: https://supabase.com/docs/guides/storage/security/access-control
- **Admin Panel Guide**: See `ADMIN_PANEL_GUIDE.md`

---

**Status:** ✅ Complete and Ready to Use

**Build:** ✅ Successful (no errors)

**Next Action:** Set up storage buckets following `STORAGE_SETUP.md`
