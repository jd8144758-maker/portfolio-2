import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  created_at: string;
}

export interface Live2DModel {
  id: string;
  title: string;
  client: string;
  type: string;
  image_url: string;
  video_url: string;
  features: string[];
  rating: number;
  year: string;
  created_at: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  description: string;
  image_url: string;
  tech: string[];
  status: string;
  year: string;
  players: string;
  is_enabled: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  section: string;
  created_at: string;
  is_read: boolean;
}

export interface PhotoInventory {
  id: string;
  photo_id: string;
  size: string;
  material: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface OrderItem {
  photo_id: string;
  photo_title: string;
  size: string;
  material: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: OrderItem[];
  total_price: number;
  shipping_address: string;
  special_instructions: string;
  status: string;
  created_at: string;
  updated_at: string;
}
