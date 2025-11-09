# Admin Panel Guide

## Accessing the Admin Panel

1. **Secret Access**: Click the **X button** (bottom-right corner) **3 times** within 2 seconds
2. A login screen will appear
3. Enter the admin password (default: `admin123`)
4. You'll be granted access to the admin panel

## Features

### Password Protection
- The admin password is stored in the database under `site_settings`
- **Default password**: `admin123`
- You can change this password in the **Settings** tab

### Managing Content

#### Photography Section
- **Add Photos**: Click "Add New Photo"
- **Drag & Drop**: Drag images directly into the upload area
- **Edit**: Click "Edit" on any photo card
- **Delete**: Click "Delete" (confirmation required)
- **Fields**: Title, Description, Category, Image URL

#### Live2D Section
- **Add Models**: Click "Add New Model"
- **Image Upload**: Drag & drop thumbnail images
- **Video Upload**: Drag & drop video files or paste YouTube URLs
- **Edit/Delete**: Same as photos
- **Fields**:
  - Title, Client, Type (dropdown)
  - Thumbnail Image, Video URL
  - Features (comma-separated)
  - Rating (1-5), Year

#### Games Section
- **Add Games**: Click "Add New Game"
- **Drag & Drop Images**: Upload game screenshots
- **Visibility Toggle**: Enable/disable games from showing on site
- **Edit/Delete**: Same as other sections
- **Fields**:
  - Title, Genre, Description
  - Image, Tech Stack (comma-separated)
  - Status, Year, Players
  - Visible checkbox

### Settings Section
- **Site-wide Configuration**
- **Edit**: Click "Edit" on any setting
- **Available Settings**:
  - `admin_password` - Change admin password
  - `gamedev_enabled` - Show/hide Game Dev section
  - `photography_order_enabled` - Show/hide Order page
  - `photography_contact_enabled` - Show/hide Contact page

## Tips

### Image Upload
- Drag and drop is supported for all image fields
- Alternatively, paste direct image URLs
- Images are temporarily uploaded to Cloudinary demo (in production, configure your own CDN)

### Video Upload (Live2D)
- Supports YouTube URLs (automatically converts to embed)
- Supports direct video file URLs
- Drag and drop video files for upload

### Data Format
- **Arrays**: Enter comma-separated values (e.g., "Feature 1, Feature 2")
- **URLs**: Must be full URLs including `https://`
- **Required Fields**: Marked with asterisk or won't save without them

### Security
- Always change the default password immediately
- Keep your admin password secure
- The admin panel is only accessible via the secret button combination

## Troubleshooting

**Can't log in?**
- Verify you're using the correct password
- Check database for `admin_password` value in `site_settings`

**Drag & drop not working?**
- Ensure you're dropping directly on the upload area
- Check browser console for errors
- Try pasting URL instead

**Changes not appearing?**
- Refresh the page to see updates
- Check browser console for errors
- Verify database connection in `.env`

## Keyboard Shortcuts

- **ESC**: Close admin panel (when focused)
- **TAB**: Navigate between form fields
- **ENTER**: Submit forms

## Best Practices

1. **Regular Backups**: Export your database regularly
2. **Test Changes**: Preview changes before saving
3. **Use High-Quality Images**: For best appearance
4. **Optimize Images**: Keep file sizes reasonable
5. **Consistent Naming**: Use clear, descriptive titles
