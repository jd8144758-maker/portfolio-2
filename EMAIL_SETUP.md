# Email Setup for Live2D Inquiries

This guide explains how to set up email notifications for Live2D commission inquiries.

## Overview

The Live2D Inquire form uses Supabase Edge Functions to send formatted emails to your inbox. When someone submits an inquiry, they receive a confirmation message, and you receive a notification email.

## Setup Steps

### Step 1: Create Resend Account

1. Go to [Resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address
4. Complete the onboarding

### Step 2: Get API Key

1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name it something like "Portfolio Inquiries"
4. Copy the key (you'll need it in the next step)

### Step 3: Add to Supabase

1. Go to your Supabase project dashboard
2. Click "Edge Functions" in the left sidebar
3. Find `send-inquiry-email` in the list
4. Click on it
5. Go to the "Secrets" tab
6. Click "New Secret"
7. Enter:
   - Name: `RESEND_API_KEY`
   - Value: [Paste your Resend API key]
8. Click "Save"

### Step 4: Test the Setup

1. Go to your portfolio at `/live2d/inquire`
2. Fill out the inquiry form with test data
3. Click "Submit Commission Request"
4. You should see a success message
5. Check your email at `kairoroku@gmail.com` for the inquiry

## Email Contents

When an inquiry is submitted, you receive an email containing:

**Sender Information:**

- Name (or alias)
- Email address
- Discord username

**Project Details:**

- Rig type selected
- Desired deadline
- Whether they allow streaming
- Reference links
- Full project description

**Email Format:**

- Professional HTML layout
- Cottage-core themed styling
- Reply-to set to their email address
- Mobile-friendly design

## Troubleshooting

### Email Not Received

**Check:**

1. Resend dashboard shows the email was sent (check email logs)
2. Check spam/junk folder
3. Verify `RESEND_API_KEY` is set correctly in Supabase
4. Wait a few minutes (emails can take time to arrive)

### "Error sending inquiry" Message

**Causes & Solutions:**

1. `RESEND_API_KEY` not set → Add it to Supabase secrets
2. Invalid API key → Verify key is correct in Resend dashboard
3. Resend API down → Check [status.resend.com](https://status.resend.com)
4. Network issue → Check your internet connection

### Edge Function Error

1. Go to Supabase dashboard
2. Click "Edge Functions"
3. Click `send-inquiry-email`
4. Go to "Logs" tab
5. Look for error messages
6. Share errors with Supabase support if needed

## Customization

### Change Recipient Email

Edit `supabase/functions/send-inquiry-email/index.ts`:

Find this line:

```typescript
to: "kairoroku@gmail.com",
```

Change to your email:

```typescript
to: "your-email@example.com",
```

Then redeploy the function.

### Change Sender Name

In the same file, find:

```typescript
from: "Commission Inquiries <noreply@kairoroku.com>",
```

Change to:

```typescript
from: "Your Name <noreply@your-domain.com>",
```

Note: The domain part must be verified in Resend for production use.

### Add CC/BCC

To CC or BCC someone on inquiries, add:

```typescript
cc: "cc@example.com",
bcc: "bcc@example.com",
```

In the email fetch body.

### Change Email Template

The HTML template is in the same file. Modify the `emailContent` variable to customize the design.

## Setting Up Custom Domain

For a professional setup with your own domain:

1. **Verify Domain in Resend:**

   - Go to Resend dashboard
   - Add your domain
   - Add DNS records as instructed
   - Wait for verification (usually <1 hour)

2. **Update Sender Email:**

   ```typescript
   from: "Your Name <inquiries@yourdomain.com>",
   ```

3. **Redeploy Function**

## Monitoring

### View Email Logs

1. Go to Resend dashboard
2. Click "Emails"
3. See all sent emails with status
4. Click on email to see full details

### Track Bounce Rates

- Resend shows bounce/complaint rates
- Keep bounces below 5% for best deliverability
- Contact bad emails only if necessary

## Volume Limits

**Free Plan (Resend):**

- 100 emails per day
- Unlimited emails per month

**Paid Plan:**

- Unlimited emails
- Advanced analytics

## Best Practices

1. **Keep Email Template Simple:**

   - Mobile-friendly design
   - Legible font sizes
   - Clear call-to-action

2. **Respond Quickly:**

   - Email has reply-to set to their address
   - Try to respond within 48 hours

3. **Monitor Spam Rate:**

   - Keep subject lines professional
   - Don't use ALL CAPS excessively
   - Avoid spam trigger words

4. **Regular Testing:**
   - Test form monthly
   - Verify emails arrive
   - Check formatting on mobile

## Alternative Email Services

If you prefer not to use Resend, alternatives include:

- **SendGrid** - More features, slightly steeper learning curve
- **Mailgun** - Good API, developer-friendly
- **SendinBlue** - All-in-one marketing platform
- **Amazon SES** - Very affordable at scale

All can be integrated by modifying the Edge Function code.

## FAQ

**Q: Do I need a custom domain?**
A: No, but it looks more professional. Free plan uses `noreply@resend.dev` subdomain.

**Q: Can I send emails to multiple people?**
A: Yes, add a CC/BCC field or modify the Edge Function.

**Q: What if someone doesn't receive the email?**
A: Check Resend logs first, then verify their email address is correct.

**Q: Can I automate responses?**
A: Yes, use Resend's automation or add logic to Edge Function.

**Q: How long do emails take to arrive?**
A: Usually instant, sometimes up to 5 minutes.

## Support

- **Resend Support:** [support.resend.com](https://support.resend.com)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Edge Functions:** [supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)
