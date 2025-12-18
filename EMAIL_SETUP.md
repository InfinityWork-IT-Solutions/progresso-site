# Email Setup Guide

## Configuration Steps

### For Local Development:

1. **Create a `.env` file** in the root directory of your project with the following variables:

```env
# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password-here
CONTACT_EMAIL=jody@progreso.consulting

# Server Configuration
PORT=5000
NODE_ENV=development
```

2. **Get your Gmail App Password:**
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
   - Scroll down to **App passwords**
   - Click **Select app** → Choose "Mail"
   - Click **Select device** → Choose "Other (Custom name)" → Enter "Progreso Website"
   - Click **Generate**
   - Copy the 16-character password (spaces don't matter)

3. **Update your `.env` file:**
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password-here` with the 16-character app password you just generated
   - The `CONTACT_EMAIL` should be the email where you want to receive contact form submissions (currently set to jody@progreso.consulting)

4. **Restart your development server** after creating/updating the `.env` file

### For Netlify Deployment:

1. **Go to your Netlify dashboard** → Your site → Site settings → Environment variables

2. **Add the following environment variables:**
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `jody@progreso.consulting` (or your Gmail address)
   - `SMTP_PASSWORD` = `rvbppclvvrhuxxes` (your app password)
   - `CONTACT_EMAIL` = `jody@progreso.consulting`

3. **Redeploy your site** after adding the environment variables

## How It Works

- When someone submits the contact form, two emails are sent:
  1. **Notification email** to `CONTACT_EMAIL` with the form submission details
  2. **Confirmation email** to the person who submitted the form

- The form validates:
  - All required fields (name, email, phone)
  - Email format
  - Shows loading state while submitting
  - Displays success/error messages

## Troubleshooting

- **"Email configuration missing" error**: Make sure all environment variables are set in your `.env` file
- **Authentication failed**: Double-check your app password (not your regular Gmail password)
- **Connection timeout**: Check your internet connection and firewall settings

