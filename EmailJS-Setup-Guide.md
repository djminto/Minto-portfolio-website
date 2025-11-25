# EmailJS Template Setup Guide

## ERROR: "The recipients address is empty"

This means your EmailJS template's "To Email" field is not configured correctly.

## SOLUTION - Follow These Exact Steps:

### Step 1: Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/
2. Click on "Email Templates" in the left sidebar
3. Find your template: `template_k597rol`
4. Click on it to edit

### Step 2: Configure Template Settings
In the **Settings** section at the top, you'll see several fields:

**CRITICAL - Set These Exact Values:**

```
Template Name: Order Notification
Template ID: template_k597rol (don't change this)

To Email: {{to_email}}          ← MUST BE EXACTLY THIS!
To Name: {{to_name}}            ← Variable, not hardcoded
From Name: {{from_name}}        ← Variable
Reply To: {{reply_to}}          ← Variable
Subject: New Order: {{order_number}}
```

### Step 3: Template Content
In the **Content** section, paste this:

```
Hello {{to_name}},

{{message}}

=== ORDER DETAILS ===

Order Number: {{order_number}}
Date: {{date}}

--- CLIENT INFORMATION ---
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Company: {{client_company}}

--- PROJECT DETAILS ---
Package: {{package_type}}
Website Type: {{website_type}}
Number of Pages: {{num_pages}}
Features: {{features}}
Budget: {{budget}}
Deadline: {{deadline}}

--- PAYMENT ---
Amount: {{amount}}
Method: {{payment_method}}

--- PROJECT DESCRIPTION ---
{{description}}

===========================

Please review this order in your dashboard.

Best regards,
Automated Order System
```

### Step 4: Save Template
Click the **SAVE** button at the top right

### Step 5: Verify Service Connection
1. Click "Email Services" in the left sidebar
2. Make sure you have a service (should be Gmail)
3. Status should show "Active" in GREEN
4. If not active, click "Connect Account" and authorize your Gmail

### Step 6: Check Monthly Limit
1. Click "Account" in the left sidebar
2. Check "Monthly Quota"
3. Free plan = 200 emails/month
4. Make sure you haven't exceeded it

## Common Mistakes to Avoid:

❌ **WRONG:** Setting "To Email" to `danielminto13@gmail.com` (hardcoded)
✅ **CORRECT:** Setting "To Email" to `{{to_email}}` (variable)

❌ **WRONG:** Leaving "To Email" field empty
✅ **CORRECT:** Must have `{{to_email}}` in the field

❌ **WRONG:** Using double braces in the Settings field: `{{{{to_email}}}}`
✅ **CORRECT:** Exactly two braces: `{{to_email}}`

## After Setup:
1. Click SAVE
2. Go back to EmailJS-Test.html
3. Click "Send Test Email"
4. Should now work!

## Still Not Working?

If you still get errors, the issue might be:
1. **Service not verified** - Reconnect your Gmail
2. **Template not saved** - Make sure you clicked SAVE
3. **Wrong template ID** - Double-check template_k597rol exists
4. **Account suspended** - Check if you exceeded free tier limits

## Need Help?
Take a screenshot of your EmailJS template settings page and send it to me.
