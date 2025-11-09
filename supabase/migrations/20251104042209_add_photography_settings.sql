/*
  # Add Photography Page Settings

  1. Updates
    - Add settings for photography order page visibility
    - Add settings for photography contact page visibility
    - Insert default values for new settings
*/

-- Insert new settings if they don't exist
INSERT INTO site_settings (key, value)
VALUES
  ('photography_order_enabled', 'true'),
  ('photography_contact_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
