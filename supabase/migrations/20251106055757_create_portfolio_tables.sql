/*
  # Create Portfolio Database Schema
  
  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
    
    - `live2d_models`
      - `id` (uuid, primary key)
      - `title` (text)
      - `client` (text)
      - `type` (text)
      - `image_url` (text)
      - `video_url` (text)
      - `features` (jsonb array)
      - `rating` (integer)
      - `year` (text)
      - `created_at` (timestamptz)
    
    - `games`
      - `id` (uuid, primary key)
      - `title` (text)
      - `genre` (text)
      - `description` (text)
      - `image_url` (text)
      - `tech` (jsonb array)
      - `status` (text)
      - `year` (text)
      - `players` (text)
      - `is_enabled` (boolean)
      - `created_at` (timestamptz)
    
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (text)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Public can view (SELECT) all content
    - Authenticated users can insert, update, delete
*/

-- Photos Table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view photos"
  ON photos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert photos"
  ON photos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update photos"
  ON photos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete photos"
  ON photos FOR DELETE
  TO authenticated
  USING (true);

-- Live2D Models Table
CREATE TABLE IF NOT EXISTS live2d_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  client text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  video_url text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  rating integer DEFAULT 5,
  year text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE live2d_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view models"
  ON live2d_models FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert models"
  ON live2d_models FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update models"
  ON live2d_models FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete models"
  ON live2d_models FOR DELETE
  TO authenticated
  USING (true);

-- Games Table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  genre text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  tech jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'In Development',
  year text DEFAULT '',
  players text DEFAULT 'Single Player',
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view enabled games"
  ON games FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update games"
  ON games FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete games"
  ON games FOR DELETE
  TO authenticated
  USING (true);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete settings"
  ON site_settings FOR DELETE
  TO authenticated
  USING (true);

-- Insert Default Settings
INSERT INTO site_settings (key, value)
VALUES
  ('gamedev_enabled', 'true'),
  ('photography_order_enabled', 'true'),
  ('photography_contact_enabled', 'true'),
  ('admin_password', 'admin123')
ON CONFLICT (key) DO NOTHING;