# Orders & Inquiries System - Complete Setup

## What Was Implemented

### 1. Database Tables Created

#### `inquiries` Table
- Stores contact form submissions from both Live2D and Photography sections
- Fields: name, email, message, section, created_at, is_read
- Automatically records all inquiries for admin review

#### `photo_inventory` Table
- Internal inventory system for photography prints
- Tracks sizes, materials, quantities, and prices
- Linked to specific photos
- Used by the ordering page to show available options

#### `orders` Table
- Stores customer orders from the photography ordering page
- Fields: order_number, customer_name, email, phone, items, total_price, shipping_address, special_instructions, status
- Items stored as JSON for flexibility

### 2. Resend Email Integration

**Edge Function:** `send-inquiry-email`
- Sends emails when inquiries are submitted
- Works with both Live2D contact and Photography contact forms
- Requires: RESEND_API_KEY environment variable (auto-configured)

**Features:**
- Gracefully handles email failures (inquiry still saved to database)
- Formatted HTML emails with inquiry details
- Reply-to address set to customer email

### 3. Updated Pages

#### Live2D Contact Page (`Live2DContact.tsx`)
- Form submissions now save to `inquiries` table
- Sends email notification via Resend
- Displays success/error messages
- All inquiry details preserved in database

#### Photography Contact Page (`PhotographyContact.tsx`)
- Same inquiry system as Live2D
- Form data saved to database
- Email notifications sent
- Section identified as "photography" in database

#### Photography Ordering Page (`PhotographyOrdering.tsx`)
- Complete rewrite from static to database-driven
- Features:
  - Photos loaded from `photos` table
  - Inventory options from `photo_inventory` table
  - Dynamic pricing based on size and material
  - Shopping cart functionality
  - Order submission saves to `orders` table
  - Shows "Out of stock" for photos without inventory
  - Real-time quantity tracking

### 4. Admin Panel Enhancements

#### New Tabs Added

**Inventory Tab**
- Add new inventory items
- Link photos to specific sizes/materials/prices
- Set quantities
- Delete inventory items
- View all current inventory

**Orders Tab**
- View all customer orders
- See order status (pending, processing, shipped, delivered)
- Customer details and contact information
- Order items with breakdown
- Shipping address and special instructions
- Color-coded status badges

### 5. Email Service Configuration

**Resend Setup:**
1. Sign up at resend.com
2. Get API key
3. System will automatically use the RESEND_API_KEY environment variable
4. Configure `from` email in edge function: `supabase/functions/send-inquiry-email/index.ts`

Current settings:
```
from: "noreply@example.com"  // Change this to your email
to: "your-email@example.com"  // Change this to your receiving email
```

To configure:
1. Login to admin panel
2. Go to Settings tab
3. Edit settings as needed

## How to Use

### Adding Photos with Inventory

1. Go to Admin Panel (click X button 3 times)
2. Go to **Photos** tab
3. Click "Add New Photo"
4. Upload image (drag-and-drop or paste URL)
5. Fill in title, category, description
6. Save

Then create inventory:
1. Go to **Inventory** tab
2. Click "Add New Inventory Item"
3. Select the photo you just created
4. Enter size (e.g., "8x10", "11x14")
5. Enter material (e.g., "Fine Art Paper", "Canvas")
6. Set price
7. Set quantity in stock
8. Save

### Managing Orders

1. Go to Admin Panel
2. Click **Orders** tab
3. View all customer orders
4. See order status, items, pricing, and shipping info
5. Update order status as needed

### Responding to Inquiries

1. Go to Admin Panel
2. Check **Settings** tab for notification email settings
3. Inquiries automatically saved in database
4. Check email for inquiries (if Resend is configured)

## Database Structure

### Inquiries Table
```sql
- id (UUID, PK)
- name (text)
- email (text)
- message (text)
- section (text: "live2d" or "photography")
- created_at (timestamp)
- is_read (boolean, default: false)
```

### Photo Inventory Table
```sql
- id (UUID, PK)
- photo_id (UUID, FK to photos)
- size (text)
- material (text)
- quantity (integer)
- price (numeric)
- created_at (timestamp)
```

### Orders Table
```sql
- id (UUID, PK)
- order_number (text, unique)
- customer_name (text)
- customer_email (text)
- customer_phone (text)
- items (jsonb array)
- total_price (numeric)
- shipping_address (text)
- special_instructions (text)
- status (text)
- created_at (timestamp)
- updated_at (timestamp)
```

## Configuration Required

### Email Settings

Edit `supabase/functions/send-inquiry-email/index.ts`:

```typescript
// Line 53-58 - Update these
from: "your-email@example.com",  // Your sender email
to: "your-email@example.com",    // Where you receive inquiries
```

### Resend API Key

The RESEND_API_KEY is automatically available. To set it up:

1. Get your API key from resend.com
2. It's automatically injected as an environment variable
3. No manual configuration needed

## Testing

### Test Inquiry Submission

1. Go to Photography Contact or Live2D Contact page
2. Fill out form
3. Submit
4. Check admin panel > Orders/Inquiries tabs
5. Check email inbox (if Resend configured)

### Test Order Placement

1. Go to Photography Ordering page
2. Select a photo (must have inventory)
3. Click size/material options
4. Add to cart
5. Fill shipping information
6. Place order
7. Check admin panel > Orders tab
8. Verify order appears with status "pending"

## Important Notes

### Security

- All tables have Row Level Security (RLS) enabled
- Public can view and insert inquiries/orders
- Authenticated users can manage all data
- Passwords are stored in site_settings (should be hashed in production)

### Data Persistence

- All inquiries, orders, and inventory persist in database
- No data is lost when form submissions happen
- Email failures don't prevent data from being saved

### Email Reliability

- Resend is enterprise-grade email service
- Fallback: Email fails gracefully, data still saved
- Check Resend dashboard for delivery reports

### Inventory Management

- Quantities don't auto-decrement on orders (manual management)
- Can set quantity to 0 to hide from ordering page
- Each size/material combination is separate inventory item

## Next Steps

1. **Configure Resend:**
   - Get API key from resend.com
   - Update email addresses in edge function

2. **Add Photos & Inventory:**
   - Add photography samples to portfolio
   - Create inventory items with sizes/materials/prices

3. **Test Everything:**
   - Test inquiry forms on Live2D and Photography pages
   - Place test orders on Photography ordering page
   - Verify emails are received

4. **Customize:**
   - Update default sizes and materials
   - Adjust pricing as needed
   - Configure notification emails

## Troubleshooting

### Orders not appearing in admin
- Verify database connection in .env
- Check browser console for errors
- Ensure you're in admin panel (click X 3 times)

### Inquiries not sending emails
- Check RESEND_API_KEY is set
- Verify email addresses in edge function are correct
- Check Resend dashboard for errors
- Inquiries still save even if email fails

### Photos not showing in inventory dropdown
- Must add photo to Photos tab first
- Photo must have image_url
- Refresh page after adding photo

### Out of stock photos
- Add inventory items for photos in Inventory tab
- Each size/material needs separate inventory entry
- Set quantity > 0 to show in ordering page

## Files Modified/Created

- `src/lib/supabase.ts` - Added new TypeScript interfaces
- `src/pages/live2d/Live2DContact.tsx` - Added inquiry saving
- `src/pages/photography/PhotographyContact.tsx` - Added inquiry saving
- `src/pages/photography/PhotographyOrdering.tsx` - Complete rewrite with database
- `src/components/AdminPanel.tsx` - Added Inventory & Orders tabs
- `supabase/functions/send-inquiry-email/index.ts` - Email edge function
- Database migrations - Created 3 new tables with RLS

## Build Status

Project builds successfully with no errors.
All TypeScript types are correct.
Ready for deployment.
