# Admin Panel Upload Workflow Guide

## How File Uploads Work

When you upload files through the admin panel, there are **2 steps**:

### Step 1: Upload File to Storage (happens automatically)
- Drag/drop image or video into the upload area
- File is uploaded to Supabase Storage bucket
- Image preview appears in the form
- File is now stored in Supabase

### Step 2: Save Metadata to Database (you must click Save)
- Fill in required form fields:
  - **Title** (required)
  - **Description** or other details (required)
  - **Category** or other attributes (required)
- Click the **Save** button
- Metadata (with file URL) is saved to the database

**If you only upload the file and don't click Save, the file is in storage but NOT linked in the database!**

---

## Step-by-Step Workflow

### Adding a New Photo

1. **Open Admin Panel**
   - Click the X button in bottom-right corner 3 times
   - Enter password: `admin123`

2. **Go to Photos Tab**
   - Click the "Photos" tab

3. **Click "Add New Photo"**
   - The form will appear

4. **Upload Image**
   - Drag and drop an image file into the box
   - OR paste an image URL
   - Wait for "Uploading..." to finish
   - You should see the image preview

5. **Fill in Details**
   - **Title**: Enter the photo title (required)
     - Example: "Mountain Sunset"
   - **Category**: Enter the category (required)
     - Example: "Landscape", "Portrait", "Nature"
   - **Description**: Enter a description (required)
     - Example: "Taken at 6pm with golden hour lighting"

6. **Save**
   - Click the green "Save Photo" button
   - The form should clear and close
   - The photo should now appear in the list below

### Adding a New Live2D Model

1. **Go to Live2D Tab**

2. **Click "Add New Model"**

3. **Upload Thumbnail Image**
   - Drag/drop image into the "Image" section
   - Wait for upload to finish
   - Preview appears

4. **Upload Video**
   - Drag/drop video into the "Video" section
   - Wait for upload to finish
   - Preview appears

5. **Fill in Required Fields**
   - **Title** (required)
   - **Client** (required) - Who the model was for
   - **Type** (required) - Type of Live2D model
   - **Year** (optional) - Year created
   - **Features** (optional) - Comma-separated list
   - **Rating** (optional) - 1-5 stars

6. **Save**
   - Click "Save Model"
   - Model appears in the list

### Adding a New Game

1. **Go to Games Tab**

2. **Click "Add New Game"**

3. **Upload Screenshot**
   - Drag/drop game image
   - Wait for upload
   - Preview appears

4. **Fill in Required Fields**
   - **Title** (required)
   - **Genre** (required) - Game genre
   - **Description** (required)
   - **Tech** (optional) - Comma-separated technologies used
   - **Status** (optional) - In Development, Complete, On Hold
   - **Players** (optional) - Single Player, Multiplayer, Co-op
   - **Year** (optional)

5. **Save**
   - Click "Save Game"
   - Game appears in the list

---

## Common Issues & Solutions

### "Upload failed" Error

**Cause**: File upload to storage failed

**Check:**
- File size is within limits (images 10MB, videos 100MB)
- File type is correct (images: JPEG/PNG/WebP/GIF, videos: MP4/WebM/MOV/AVI)
- Internet connection is working
- Supabase storage buckets are created

**Solution:**
- Refresh the page
- Try with a smaller file
- Check browser console for detailed error

### Photo Appears in Admin Panel but NOT on Website

**Cause**: This is normal! Admin panel shows all photos. The website shows photos with specific categories.

**Solution:**
- Check if the category matches what the website displays
- Go to Photography page on website
- Verify the photo is there in the correct category

### Form Won't Submit / "Please fill in all fields" Error

**Cause**: Required fields are missing

**Required Fields by Section:**

**Photos:**
- Image URL (must upload or paste)
- Title
- Category
- Description

**Live2D Models:**
- Image URL (must upload)
- Video URL (must upload)
- Title
- Client
- Type

**Games:**
- Image URL (must upload)
- Title
- Genre
- Description

**Solution:**
- Make sure ALL required fields have values
- Upload required media files
- Don't leave any required field blank

### Files Are Uploading But Not Appearing in Database

**Cause**: You uploaded but didn't click Save

**The Workflow is:**
1. Upload file (appears as preview)
2. Fill in form fields
3. Click Save (saves to database)

All 3 steps are required!

### URL Shows "Invalid" or "Blocked"

**Cause**: Supabase storage URL structure is different

**What to expect:**
- URLs should look like:
  ```
  https://your-project.supabase.co/storage/v1/object/public/photos/1762757685304-3uzhsk.jpg
  ```
- NOT like Cloudinary URLs

**Solution:**
- Don't manually edit URLs
- Let the upload system generate them
- Upload through drag/drop, not manual URL entry

---

## File Storage Locations

### Where Files Go

**Storage**: Supabase Storage Buckets
- `photos` bucket
- `live2d-images` bucket
- `live2d-videos` bucket
- `games` bucket

**Database**: Supabase Tables
- `photos` table (stores photo metadata + URLs)
- `live2d_models` table (stores model metadata + URLs)
- `games` table (stores game metadata + URLs)

### Viewing Files

**In Admin Panel:**
- Photos Tab → Shows all photos from `photos` table
- Live2D Tab → Shows all models from `live2d_models` table
- Games Tab → Shows all games from `games` table

**In Storage Dashboard:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click "Storage" in left sidebar
4. See all uploaded files in buckets

**On Website:**
- Photography page displays photos from `photos` table
- Live2D showcase displays models from `live2d_models` table
- Game dev page displays games from `games` table

---

## Data Flow Diagram

```
Upload File
    ↓
Drag/Drop into Admin Panel
    ↓
File validated (type, size)
    ↓
Uploaded to Supabase Storage bucket ✓
    ↓
Image preview shown in form
    ↓
Fill in form fields
    ↓
Click Save
    ↓
Metadata + URL saved to database table ✓
    ↓
Appears in admin list
    ↓
Appears on website (if matching display criteria)
```

---

## URL Examples

### Photo Uploaded Successfully

**In Admin Panel:**
```
Title: Mountain Sunset
Category: Landscape
Description: Beautiful sunset...
Image URL: https://your-project.supabase.co/storage/v1/object/public/photos/1762757685304-3uzhsk.jpg
```

**In Database (photos table):**
```
{
  id: "uuid-here",
  title: "Mountain Sunset",
  category: "Landscape",
  description: "Beautiful sunset...",
  image_url: "https://your-project.supabase.co/storage/v1/object/public/photos/1762757685304-3uzhsk.jpg",
  created_at: "2025-11-10T06:54:49.503Z"
}
```

**On Website:**
```
Photo displays in Photography section under "Landscape" category
```

---

## Editing Existing Items

### Edit a Photo

1. Click **Edit** button on photo card in Admin Panel
2. Form fills with existing data
3. Can upload new image (optional)
4. Update other fields
5. Click **Save Photo**

### Edit a Live2D Model

1. Click **Edit** button on model card
2. Form fills with existing data
3. Can upload new image/video (optional)
4. Update other fields
5. Click **Save Model**

### Edit a Game

1. Click **Edit** button on game card
2. Form fills with existing data
3. Can upload new image (optional)
4. Update other fields
5. Click **Save Game**

---

## Deleting Items

### Delete a Photo

1. Find photo in Photos tab
2. Click red **Delete** button
3. Confirm deletion
4. Photo removed from database (storage file remains)

### Delete a Live2D Model

1. Find model in Live2D tab
2. Click red **Delete** button
3. Confirm deletion
4. Model removed from database (files remain in storage)

### Delete a Game

1. Find game in Games tab
2. Click red **Delete** button
3. Confirm deletion
4. Game removed from database (image remains in storage)

**Note:** Deleting removes from database but not from storage. To fully delete, also delete from Supabase Dashboard Storage section.

---

## File Size & Type Limits

### Images
- **Max Size**: 10 MB
- **Allowed Types**: JPEG, PNG, WebP, GIF
- **Use For**: Photo thumbnails, game screenshots, Live2D thumbnails

### Videos
- **Max Size**: 100 MB
- **Allowed Types**: MP4, WebM, MOV, AVI
- **Use For**: Live2D model videos

### Tips for Optimal Performance
- **Photos**: Keep under 5 MB (compress before uploading)
- **Videos**: Keep under 50 MB (use video compression tools)
- **Format**: Use PNG/WebP for images, MP4 for videos (best compatibility)

---

## Troubleshooting Checklist

Before uploading:
- [ ] File size is within limits
- [ ] File format is supported
- [ ] Internet connection is stable
- [ ] Admin panel is open and accessible

When uploading:
- [ ] Wait for "Uploading..." to complete
- [ ] See image preview or video placeholder
- [ ] Fill in ALL required fields
- [ ] Click Save

After saving:
- [ ] Item appears in admin list
- [ ] Check website to see if displayed
- [ ] Verify category/criteria matches display rules

---

## Key Takeaways

1. **Upload = Storage** (Step 1) - File goes to Supabase Storage
2. **Save = Database** (Step 2) - Metadata goes to database
3. **Both Required** - File must be uploaded AND form must be saved
4. **Website Display** - Depends on database entries, not just storage
5. **Check Criteria** - Website shows photos based on category, not just existence

---

## Need Help?

- **Upload shows preview but not on website?** Check the category matches display criteria
- **Save button doesn't work?** Fill in all required fields (title, description, etc)
- **Can't upload file?** Check file size and type
- **File in storage but not database?** You need to fill the form and click Save

Your uploads follow this simple rule:
**Upload File (Storage) + Fill Form + Click Save (Database) = Successfully Added**

All three steps are required!

---

**Last Updated**: 2025-11-10
**Build Status**: ✓ Working
