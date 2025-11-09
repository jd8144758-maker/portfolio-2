# Quick Reference Guide

## Access Admin Panel
**Click X button (bottom-right corner) 3 times**
- Password: `admin123` (change immediately!)
- Available on all pages

## Add Photos & Inventory

### Step 1: Add Photo
1. Admin Panel → Photos tab
2. Click "Add New Photo"
3. Drag image or paste URL
4. Fill title, category, description
5. Save

### Step 2: Create Inventory
1. Admin Panel → Inventory tab
2. Click "Add New Inventory Item"
3. Select the photo
4. Enter: size (e.g., "8x10"), material (e.g., "Canvas")
5. Set price and quantity
6. Save

## Email Setup (Resend)

1. Get API key from resend.com
2. Edit `supabase/functions/send-inquiry-email/index.ts`
3. Update these lines:
   - `from: "your-email@example.com"`
   - `to: "your-email@example.com"`
4. System handles the rest

## Check Orders & Inquiries

**Orders:** Admin Panel → Orders tab
- See all customer orders
- View status, items, customer info
- Update status as needed

**Inquiries:** Admin Panel → (orders section shows all)
- Contact form submissions saved automatically
- From both Live2D and Photography pages

## Change Admin Password

1. Admin Panel → Settings tab
2. Find `admin_password`
3. Click "Edit"
4. Enter new password
5. Click "Save"

## Photography Ordering Page

**What happens:**
1. Shows all photos (only if they have inventory)
2. Customer selects photo
3. Sees available sizes/materials from inventory
4. Adds to cart
5. Fills shipping info
6. Places order → saved with order number

**Photos show as "Out of stock" if:**
- No inventory items created for that photo
- All inventory items have quantity = 0

## Database Tables Overview

| Table | Purpose |
|-------|---------|
| photos | Photography portfolio |
| live2d_models | Live2D projects |
| games | Game projects |
| photo_inventory | Print options & pricing |
| orders | Customer orders |
| inquiries | Contact submissions |
| site_settings | Configuration |

## Common Tasks

### Add a New Photo to Ordering Page
1. Add photo in Photos tab
2. Create inventory in Inventory tab (set quantity > 0)
3. Photo appears on ordering page

### Hide a Photo from Ordering
1. Inventory tab
2. Delete all inventory items for that photo
3. Photo shows as "Out of stock"

### Process an Order
1. Orders tab → click order
2. See all details, items, customer info
3. Manually update status in database (if needed)

### Respond to Inquiry
1. Check database in Inquiries table
2. Get customer email
3. Reply directly or via website

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't access admin | Click X button 3 times quickly |
| Wrong password | Default is admin123 |
| Photos not in ordering | Create inventory items with qty > 0 |
| Orders not saving | Check browser console for errors |
| Emails not sending | Verify RESEND_API_KEY is set |
| Inventory not showing | Must create photo first, then inventory |

## File Locations

| Feature | File |
|---------|------|
| Admin Panel | `src/components/AdminPanel.tsx` |
| Admin Access | `src/components/AdminLogin.tsx` |
| Ordering Page | `src/pages/photography/PhotographyOrdering.tsx` |
| Live2D Contact | `src/pages/live2d/Live2DContact.tsx` |
| Photo Contact | `src/pages/photography/PhotographyContact.tsx` |
| Email Function | `supabase/functions/send-inquiry-email/index.ts` |
| Types | `src/lib/supabase.ts` |

## Key Numbers

- Default admin password: `admin123`
- Admin access: Click X button 3 times (2 second window)
- Max file size: Unlimited (Cloudinary demo)
- Order timeout: None (always saves)
- Email timeout: 30 seconds (fails gracefully)

## Important Reminders

⚠️ **Security:**
- Change default password immediately
- Resend API key is private
- Database has RLS enabled (data protected)

⚠️ **Data:**
- Orders are permanent (check before deleting)
- Inventory deletion affects ordering page
- Inquiries automatically saved

⚠️ **Email:**
- Without Resend key, emails won't send (data still saved)
- Check spam folder for notifications
- Resend dashboard shows delivery status

## Support Docs

Full documentation available:
- `ADMIN_PANEL_GUIDE.md` - Admin features
- `ORDERS_SYSTEM_SETUP.md` - Orders & inventory
- `COMPLETE_SYSTEM_SUMMARY.md` - Full system overview

---

**Quick Tip:** Bookmark the admin panel by clicking the X button 3 times and noting the URL for fast access!
