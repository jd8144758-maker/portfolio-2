/*
  # Portfolio Database Schema

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `location` (text)
      - `camera` (text)
      - `image_url` (text)
      - `likes` (integer)
      - `views` (integer)
      - `created_at` (timestamptz)
    
    - `live2d_models`
      - `id` (uuid, primary key)
      - `title` (text)
      - `client` (text)
      - `type` (text)
      - `image_url` (text)
      - `features` (jsonb array)
      - `rating` (integer)
      - `year` (text)
      - `created_at` (timestamptz)
    
    - `games`
      - `id` (uuid, primary key)
      - `title` (text)
      - `genre` (text)
      - `description` (text)
      - `long_description` (text)
      - `image_url` (text)
      - `tech` (jsonb array)
      - `status` (text)
      - `release_date` (text)
      - `players` (text)
      - `rating` (numeric)
      - `downloads` (text)
      - `features` (jsonb array)
      - `created_at` (timestamptz)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated insert/update/delete
*/

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  camera text NOT NULL,
  image_url text NOT NULL,
  likes integer DEFAULT 0,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS live2d_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client text NOT NULL,
  type text NOT NULL,
  image_url text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  rating integer DEFAULT 0,
  year text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  genre text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  image_url text NOT NULL,
  tech jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL,
  release_date text NOT NULL,
  players text NOT NULL,
  rating numeric(2,1) DEFAULT 0,
  downloads text,
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE live2d_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Public can view live2d models"
  ON live2d_models FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert live2d models"
  ON live2d_models FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update live2d models"
  ON live2d_models FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete live2d models"
  ON live2d_models FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Public can view games"
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
