# Payment Integration Guide

## Overview
This guide explains how to integrate Stripe payment processing with your Nuxt/Supabase application for handling SaaS subscriptions.

## Required Payment Form Fields

### Essential Fields (PCI Compliant)
1. **Cardholder Name** - Full name as it appears on the card
2. **Card Number** - 16-digit credit/debit card number
3. **Expiry Date** - MM/YY format
4. **Security Code (CVV/CVC)** - 3-4 digit security code

### Billing Address (Required for AVS - Address Verification)
1. **Street Address** - Billing address line 1
2. **City** - Billing city
3. **State/Province** - Billing state or province
4. **ZIP/Postal Code** - Billing postal code
5. **Country** - Billing country

### Additional User Information
1. **Email Address** - For receipts and account creation
2. **Phone Number** (Optional) - For additional verification

## Payment Processing Requirements

### 1. Stripe Integration

#### Setup Steps:
```bash
# Install Stripe SDK
npm install @stripe/stripe-js stripe
```

#### Environment Variables:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Frontend Integration:
```javascript
// Use Stripe Elements or Payment Element
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
```

### 2. Supabase Integration

#### Database Schema:
```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  stripe_subscription_id TEXT UNIQUE,
  status TEXT,
  plan_id TEXT,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payment methods table
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  stripe_payment_method_id TEXT,
  last4 TEXT,
  brand TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. API Endpoints Needed

#### `/api/create-checkout-session`
- Creates a Stripe Checkout session
- Returns session ID for redirect

#### `/api/create-subscription`
- Creates a subscription using Payment Intent
- Handles SCA (Strong Customer Authentication)

#### `/api/webhook`
- Handles Stripe webhooks
- Updates subscription status in database

### 4. Security Considerations

#### PCI Compliance:
- **Never store card details directly** - Use Stripe Elements
- **Use HTTPS** - Required for production
- **Tokenization** - Convert card details to tokens client-side
- **Server-side validation** - Validate all payment data server-side

#### Best Practices:
1. **3D Secure Authentication** - Use Stripe's built-in SCA handling
2. **Fraud Detection** - Enable Stripe Radar
3. **Address Verification (AVS)** - Verify billing address
4. **CVV Verification** - Always require CVV
5. **Rate Limiting** - Prevent abuse of payment endpoints

### 5. Subscription Management

#### Features to Implement:
1. **Trial Periods** - 30-day free trials
2. **Plan Changes** - Upgrade/downgrade subscriptions
3. **Cancellations** - Handle immediate or end-of-period
4. **Payment Failures** - Retry logic and dunning emails
5. **Invoices** - Generate and email invoices
6. **Tax Handling** - Use Stripe Tax for automatic calculation

### 6. Testing

#### Test Card Numbers:
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

#### Webhook Testing:
```bash
# Use Stripe CLI for local testing
stripe listen --forward-to localhost:3000/api/webhook
```

## Implementation Checklist

- [ ] Set up Stripe account and get API keys
- [ ] Install Stripe SDK and configure environment variables
- [ ] Create database tables for customers and subscriptions
- [ ] Implement Stripe Elements or Payment Element on frontend
- [ ] Create API endpoints for payment processing
- [ ] Set up webhook handling for subscription events
- [ ] Implement subscription management UI
- [ ] Add error handling and retry logic
- [ ] Test with Stripe test cards
- [ ] Enable Stripe Radar for fraud protection
- [ ] Set up email notifications for payment events
- [ ] Implement invoice generation
- [ ] Add subscription analytics and reporting

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements](https://stripe.com/docs/payments/elements)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Supabase + Stripe Example](https://github.com/supabase/supabase/tree/master/examples/stripe-subscription)
- [PCI Compliance Guide](https://stripe.com/docs/security/pci-compliance)

## Notes

The current implementation in the pricing page is a UI demonstration. To process actual payments:

1. Replace the form with Stripe Elements or redirect to Stripe Checkout
2. Never handle raw card data on your servers
3. Use Stripe's secure tokenization for all card operations
4. Implement proper webhook handling for subscription lifecycle events
5. Store only references (Stripe IDs) in your database, never card details