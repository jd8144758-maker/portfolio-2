/*
  # Create Storage Buckets for Media Files

  1. New Storage Buckets
    - `photos` - Photography portfolio images
    - `live2d-images` - Live2D model thumbnails
    - `live2d-videos` - Live2D model videos
    - `games` - Game development screenshots

  2. Security
    - Public read access for all buckets
    - Authenticated users can upload/update/delete
    - File size limits and type restrictions

  3. Policies
    - Anyone can view files (public access)
    - Only authenticated users can upload
    - Only authenticated users can delete their uploads
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('photos', 'photos', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']),
  ('live2d-images', 'live2d-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']),
  ('live2d-videos', 'live2d-videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']),
  ('games', 'games', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
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
