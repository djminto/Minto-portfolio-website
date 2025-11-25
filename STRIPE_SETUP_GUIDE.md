# Stripe Integration Setup Guide

## 🎯 What You Need

This guide will help you set up Stripe payment processing for your website.

## 📋 Step-by-Step Setup

### 1. Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Sign Up" or "Start Now"
3. Enter your email and create a password
4. Complete the registration process

### 2. Get Your API Keys

1. Log into your Stripe Dashboard
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

### 3. Update Order.js

Open `Order.js` and find this line (around line 3):

```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_PUBLISHABLE_KEY_HERE';
```

Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual **Publishable key** from Stripe.

**Example:**
```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Abc123DefGhiJklMno456PqrStuVwxYz';
```

### 4. Test Mode

Your website is currently in **TEST MODE**, which means:

✅ No real charges are made
✅ You can test with these cards:
   - **Success:** 4242 4242 4242 4242
   - **Declined:** 4000 0000 0000 0002
   - **Insufficient Funds:** 4000 0000 0000 9995
   - Use any future expiry date (e.g., 12/25)
   - Use any 3-digit CVV (e.g., 123)

### 5. Backend Setup (IMPORTANT)

⚠️ **Current Limitation:** The current setup only creates a payment method but doesn't actually charge cards. This is for security and PCI compliance.

To process real payments, you need:

#### Option A: Use a Backend Server (Recommended)

You need to create a backend server that:
1. Receives the payment method ID from your website
2. Creates a Payment Intent with Stripe
3. Confirms the payment
4. Returns the result to your website

**Backend Example (Node.js):**

```javascript
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, paymentMethodId, customerEmail } = req.body;
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: 'usd', // or 'jmd' for Jamaican dollars
      payment_method: paymentMethodId,
      customer_email: customerEmail,
      confirm: true,
      return_url: 'https://yourwebsite.com/success'
    });
    
    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
```

#### Option B: Use Stripe Checkout (Easier)

Stripe Checkout is a pre-built, hosted payment page. This is the easiest option:

1. In Order.js, replace the payment processing with:

```javascript
// Redirect to Stripe Checkout
const session = await fetch('/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: amountInCents,
    orderNumber: orderData.orderNumber
  })
}).then(res => res.json());

window.location.href = session.url;
```

2. Create a backend endpoint:

```javascript
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Web Development Package' },
        unit_amount: req.body.amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yourwebsite.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://yourwebsite.com/order',
  });
  
  res.json({ url: session.url });
});
```

### 6. Currency Setup

The current setup uses USD. To change to Jamaican Dollars (JMD):

1. In the Stripe dashboard, enable JMD in your settings
2. Update the currency in your backend code to `'jmd'`

### 7. Going Live (Production Mode)

When ready to accept real payments:

1. Complete your Stripe account verification
2. Add your business details
3. Replace test API keys with live keys:
   - Test: `pk_test_...` → Live: `pk_live_...`
   - Test: `sk_test_...` → Live: `sk_live_...`
4. Update Order.js with your live publishable key
5. Test with real cards (in small amounts first!)

## 🔒 Security Best Practices

1. **Never** expose your Secret Key (`sk_test_` or `sk_live_`)
2. **Always** process payments on your backend
3. **Never** store card details in your database
4. **Use** Stripe's built-in fraud detection
5. **Enable** 3D Secure for additional security

## 💰 Pricing

Stripe charges:
- **2.9% + $0.30** per successful card charge (US)
- Different rates may apply for Jamaica

Check [Stripe Pricing](https://stripe.com/pricing) for your region.

## 📞 Need Help?

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe Support:** https://support.stripe.com
- **Contact Developer:** danielminto13@gmail.com

## ✅ Current Status

- ✅ Stripe.js library loaded
- ✅ Payment form created
- ✅ Test mode enabled
- ⚠️ Backend processing needed for live payments
- ⚠️ Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual key

## 🧪 Testing Checklist

- [ ] Updated Stripe publishable key in Order.js
- [ ] Tested with test card 4242 4242 4242 4242
- [ ] Verified payment method creation in Stripe Dashboard
- [ ] Set up backend payment processing (if going live)
- [ ] Tested with live keys in production mode
- [ ] Enabled webhook for payment confirmations

---

**Next Steps:**
1. Get your Stripe API keys
2. Replace the placeholder key in Order.js
3. Test the payment flow
4. Set up backend processing before going live
