# Supabase Storage Setup Guide

The admin panel has been updated to use Supabase Storage instead of Cloudinary for file uploads. Follow these steps to set up the storage buckets.

## What Changed

1. **New Storage Module**: Created `src/lib/storage.ts` for handling file uploads
2. **Updated Admin Panel**: All upload functions now use Supabase Storage
3. **Bucket Integration**: Photos, Live2D images/videos, and game images are stored in separate buckets

## Storage Buckets Required

You need to create 4 storage buckets in Supabase:

| Bucket Name | Purpose | Max File Size | Allowed Types |
|-------------|---------|---------------|---------------|
| `photos` | Photography portfolio images | 10 MB | JPEG, PNG, WebP, GIF |
| `live2d-images` | Live2D model thumbnails | 10 MB | JPEG, PNG, WebP, GIF |
| `live2d-videos` | Live2D model videos | 100 MB | MP4, WebM, MOV, AVI |
| `games` | Game development screenshots | 10 MB | JPEG, PNG, WebP, GIF |

## Setup Steps

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to [supabase.com](https://supabase.com)
   - Select your project
   - Click "Storage" in the left sidebar

2. **Create Each Bucket**

   For each bucket (`photos`, `live2d-images`, `live2d-videos`, `games`):

   - Click "New Bucket"
   - Enter the bucket name (exactly as shown above)
   - Check "Public bucket" (so files are publicly accessible)
   - Click "Create Bucket"

3. **Set File Size Limits**

   After creating each bucket:

   - Click on the bucket name
   - Go to "Policies" tab
   - Click "New Policy"
   - Select "For full customization"
   - Add these policies for each bucket:

**Policy 1: Public Read Access**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'BUCKET_NAME');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'BUCKET_NAME');
```

**Policy 3: Authenticated Update**
```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'BUCKET_NAME');
```

**Policy 4: Authenticated Delete**
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'BUCKET_NAME');
```

Replace `BUCKET_NAME` with each bucket name (photos, live2d-images, live2d-videos, games).

### Option 2: Using SQL Editor

Go to SQL Editor in Supabase Dashboard and run:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('photos', 'photos', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']),
  ('live2d-images', 'live2d-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']),
  ('live2d-videos', 'live2d-videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']),
  ('games', 'games', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view files (public read)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id IN ('photos', 'live2d-images', 'live2d-videos', 'games'));

-- Policy: Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('photos', 'live2d-images', 'live2d-videos', 'games'));

-- Policy: Authenticated users can update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('photos', 'live2d-images', 'live2d-videos', 'games'));

-- Policy: Authenticated users can delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('photos', 'live2d-images', 'live2d-videos', 'games'));
```

## How It Works

### Admin Panel Upload Flow

1. **User drags/drops file** → Validates file type and size
2. **File is uploaded** → Sent to appropriate Supabase Storage bucket
3. **Public URL returned** → Stored in database (photos, live2d_models, games tables)
4. **Frontend displays** → Uses public URL to show images/videos

### File Validation

The system automatically validates:
- **File types**: Only allowed image/video formats accepted
- **File sizes**:
  - Images: Max 10 MB
  - Videos: Max 100 MB
- **Bucket selection**: Automatically routes files to correct bucket

### Security

- **Public Read**: Anyone can view uploaded files (required for portfolio)
- **Authenticated Write**: Only logged-in admin can upload/delete
- **Row Level Security**: Prevents unauthorized access
- **File Type Restrictions**: Only safe file types allowed

## Testing the Setup

1. **Access Admin Panel**
   - Click X button (bottom-right) 3 times
   - Enter admin password (default: `admin123`)

2. **Test Photo Upload**
   - Go to Photos tab
   - Click "Add New Photo"
   - Drag and drop an image
   - Should see upload progress → Success
   - Image URL should start with your Supabase URL

3. **Test Live2D Upload**
   - Go to Live2D tab
   - Click "Add New Model"
   - Test both image and video uploads
   - Verify both work correctly

4. **Test Game Upload**
   - Go to Games tab
   - Click "Add New Game"
   - Upload a game screenshot
   - Verify success

## Troubleshooting

### Upload Fails with "Upload failed" Error

**Cause**: Buckets not created or policies missing

**Solution**:
1. Check Storage section in Supabase Dashboard
2. Verify all 4 buckets exist
3. Check policies are set correctly

### "Invalid file type" Error

**Cause**: Trying to upload unsupported file format

**Solution**: Only use:
- Images: JPEG, PNG, WebP, GIF
- Videos: MP4, WebM, MOV, AVI

### "File too large" Error

**Cause**: File exceeds size limit

**Solution**:
- Compress images to under 10 MB
- Compress videos to under 100 MB
- Use online compression tools if needed

### Images Don't Display on Site

**Cause**: Bucket not set to public

**Solution**:
1. Go to Storage in Supabase Dashboard
2. Click on bucket
3. Check "Public bucket" is enabled
4. Verify "Public Access" policy exists

## File Management

### Viewing Uploaded Files

1. Go to Supabase Dashboard → Storage
2. Click on bucket name
3. See all uploaded files with URLs

### Deleting Files

- **Via Admin Panel**: Delete item → File reference removed from database
- **Via Dashboard**: Click file → Delete (also removes from storage)

### Storage Limits

- **Free Tier**: 1 GB storage
- **Pro Tier**: 100 GB storage
- Monitor usage in Supabase Dashboard

## Migration from Cloudinary

If you had files on Cloudinary:

1. **Old URLs still work**: Existing database entries with Cloudinary URLs remain functional
2. **New uploads**: All new uploads go to Supabase Storage
3. **Optional migration**: Manually re-upload old files through admin panel if desired

## Important Notes

- **URLs are permanent**: Once uploaded, file URLs don't change
- **No auto-cleanup**: Deleted database entries don't delete storage files
- **Bandwidth limits**: Free tier has bandwidth limits (check Supabase docs)
- **CDN included**: Supabase Storage uses CDN for fast global delivery

## Benefits of Supabase Storage

✓ **Integrated**: Works seamlessly with your database
✓ **Secure**: Row Level Security built-in
✓ **Fast**: CDN-powered delivery
✓ **Cost-effective**: Free tier included
✓ **No API keys needed**: Uses existing Supabase credentials
✓ **Automatic backups**: Included in Supabase backups

## Next Steps

1. ✅ Set up the 4 storage buckets (follow steps above)
2. ✅ Test uploads in admin panel
3. ✅ Verify files display correctly on site
4. ✅ Monitor storage usage in dashboard

Your admin panel is now ready to use Supabase Storage for all file uploads!

---

**Need Help?**
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Storage Policies Guide](https://supabase.com/docs/guides/storage/security/access-control)
