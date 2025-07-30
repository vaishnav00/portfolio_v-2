# Google Sheets Integration Setup Guide

## Current Status
✅ Contact form saves to database
✅ Contact form sends email notifications (requires SendGrid fix)
❌ Google Sheets integration (requires correct private key)

## Issue Found
The current `GOOGLE_PRIVATE_KEY` contains a client ID instead of the actual private key.
Current value preview: `886837336000-jvimunld1va725mr2ir4trh07aihi33o.apps...`

## Required Fix: Correct Google Service Account Setup

### Step 1: Create Service Account (if not done)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API"
   - Click "Enable"

### Step 2: Create Service Account Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in service account details and click "Create"
4. Skip role assignment (click "Continue")
5. Click "Done"

### Step 3: Generate Private Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create New Key"
4. Select "JSON" format
5. Click "Create" - this downloads the JSON file

### Step 4: Extract Correct Values from JSON
Open the downloaded JSON file. You need these three values:

```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service@your-project.iam.gserviceaccount.com",
  "client_id": "886837336000...",
  ...
}
```

**Correct values to use:**
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `client_email` field
- `GOOGLE_PRIVATE_KEY` = `private_key` field (the long one starting with -----BEGIN PRIVATE KEY-----)
- `GOOGLE_SHEET_ID` = From your Google Sheet URL

### Step 5: Create and Share Google Sheet
1. Create new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Copy the Sheet ID from URL (long string between `/d/` and `/edit`)
3. Share the sheet with the service account email (from `client_email`) with "Editor" permissions

### Step 6: Update Replit Secrets
Replace the current values with:
- `GOOGLE_PRIVATE_KEY`: Use the full `private_key` value from JSON (including -----BEGIN/END lines)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Use `client_email` from JSON  
- `GOOGLE_SHEET_ID`: Use the ID from your sheet URL

## What Will Work After Fix
Once the correct private key is provided:
- Every contact form submission will automatically create a new row in your Google Sheet
- Sheet will have columns: Timestamp, Name, Email, Message
- You can view/filter/export data directly from Google Sheets
- Data is backed up both in database and spreadsheet

## Current Fallback Behavior
While Google Sheets is not configured:
- Contact form still works normally
- Messages are saved to database
- Email notifications are sent (when SendGrid is fixed)
- You can view messages at `/messages` page