# EmailJS Template - Order Notification (Professional Design)

Use this template content in your EmailJS dashboard for a professional, styled email.

## Template Settings:
```
Template Name: Order Notification
To Email: {{to_email}}
To Name: {{to_name}}
From Name: {{from_name}}
Reply To: {{reply_to}}
Subject: New Order: {{order_number}}
```

## Template Content (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #1f242d;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #323946;
            border: 2px solid rgba(0, 238, 255, 0.2);
            border-radius: 15px;
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #1f242d 0%, #323946 100%);
            border-top: 6px solid #0ef;
            padding: 30px;
            text-align: center;
        }
        .email-header h1 {
            color: #0ef;
            margin: 0;
            font-size: 24px;
            text-shadow: 0 0 10px rgba(0, 238, 255, 0.3);
        }
        .email-body {
            padding: 30px;
            color: #fff;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: rgba(255, 255, 255, 0.9);
        }
        .message-box {
            background: rgba(0, 238, 255, 0.1);
            border-left: 4px solid #0ef;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .order-number {
            background: rgba(0, 238, 255, 0.1);
            border: 2px solid #0ef;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }
        .order-number strong {
            color: #0ef;
            font-size: 20px;
        }
        .section-title {
            color: #0ef;
            font-size: 18px;
            margin: 25px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(0, 238, 255, 0.2);
        }
        .info-row {
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .info-label {
            color: rgba(255, 255, 255, 0.6);
            display: inline-block;
            width: 150px;
            font-weight: bold;
        }
        .info-value {
            color: #fff;
        }
        .description-box {
            background: #1f242d;
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            line-height: 1.6;
            border: 1px solid rgba(0, 238, 255, 0.1);
        }
        .email-footer {
            background: #1f242d;
            padding: 20px;
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 13px;
            border-top: 2px solid rgba(0, 238, 255, 0.1);
        }
        .button {
            display: inline-block;
            background: linear-gradient(45deg, #0ef, #00a8cc);
            color: #1f242d;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>🌐 New Website Order Received</h1>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <p class="greeting">Hello {{to_name}},</p>
            
            <div class="message-box">
                {{message}}
            </div>
            
            <div class="order-number">
                <p style="margin: 0; color: rgba(255,255,255,0.7);">Order Number</p>
                <strong>{{order_number}}</strong>
            </div>
            
            <!-- Client Information -->
            <h2 class="section-title">👤 Client Information</h2>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">{{client_name}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">{{client_email}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">{{client_phone}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Company:</span>
                <span class="info-value">{{client_company}}</span>
            </div>
            
            <!-- Project Details -->
            <h2 class="section-title">💼 Project Details</h2>
            <div class="info-row">
                <span class="info-label">Package:</span>
                <span class="info-value">{{package_type}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Website Type:</span>
                <span class="info-value">{{website_type}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Number of Pages:</span>
                <span class="info-value">{{num_pages}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Features:</span>
                <span class="info-value">{{features}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Budget:</span>
                <span class="info-value">{{budget}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Deadline:</span>
                <span class="info-value">{{deadline}}</span>
            </div>
            
            <!-- Payment Information -->
            <h2 class="section-title">💳 Payment Information</h2>
            <div class="info-row">
                <span class="info-label">Amount:</span>
                <span class="info-value" style="color: #0ef; font-size: 18px; font-weight: bold;">{{amount}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Payment Method:</span>
                <span class="info-value">{{payment_method}}</span>
            </div>
            
            <!-- Project Description -->
            <h2 class="section-title">📝 Project Description</h2>
            <div class="description-box">
                {{description}}
            </div>
            
            <!-- Order Date -->
            <div class="info-row">
                <span class="info-label">Order Date:</span>
                <span class="info-value">{{date}}</span>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="[YOUR_DASHBOARD_URL]" class="button">View in Dashboard</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <p>This email was sent to {{to_email}}</p>
            <p>Minto's Web Development Services</p>
            <p>© 2025 All rights reserved</p>
        </div>
    </div>
</body>
</html>
```

## How to Use:

1. Go to EmailJS Dashboard → Email Templates → Your Template
2. Click on "Content" tab
3. Switch to "HTML" mode (usually a toggle button)
4. Paste the entire HTML code above
5. Click "Save"

## Note:
- Replace `[YOUR_DASHBOARD_URL]` with your actual dashboard link if you want a working button
- All variables like {{order_number}}, {{client_name}}, etc. will be automatically replaced with actual data
- The email will render with the dark theme and cyan colors matching your website

## Testing:
After saving, go back to EmailJS-Test.html and send another test to see the styled email!
