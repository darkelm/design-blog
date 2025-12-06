# Google Analytics Setup Guide

This guide explains how to set up Google Analytics alongside Vercel Analytics.

---

## Quick Setup

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new property for your blog
5. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Measurement ID to Environment Variables

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Restart Development Server

```bash
npm run dev
```

Google Analytics will automatically start tracking!

---

## What Gets Tracked

### Automatic Tracking
- ✅ **Page views** - Every page navigation
- ✅ **Page paths** - URL paths for each page
- ✅ **User sessions** - Session duration and engagement

### Custom Events (Already Implemented)
- ✅ **Share events** - When users share articles (Twitter, LinkedIn, native share)
- ✅ **Copy link** - When users copy article links

### Available Events

You can track custom events using the `event` utility:

```tsx
import { event } from '@/lib/analytics'

// Track a custom event
event({
  action: 'click',
  category: 'navigation',
  label: 'header_link',
})
```

---

## Privacy & GDPR Compliance

### Important Considerations

1. **Cookie Consent**: If you have EU visitors, you may need cookie consent
2. **IP Anonymization**: Consider enabling IP anonymization in GA settings
3. **Data Retention**: Configure data retention settings in GA
4. **Privacy Policy**: Update your privacy policy to mention GA

### Recommended Settings

In Google Analytics Admin:
1. Enable **IP Anonymization** (Admin → Data Settings → Data Collection)
2. Set **Data Retention** to 14 months (Admin → Data Settings → Data Retention)
3. Enable **User and event data deletion** (Admin → Data Settings → Data Deletion)

---

## Viewing Analytics

### Google Analytics Dashboard
- Go to [analytics.google.com](https://analytics.google.com)
- Select your property
- View reports:
  - **Realtime** - Current visitors
  - **Acquisition** - Traffic sources
  - **Engagement** - User behavior
  - **Monetization** - Revenue (if applicable)

### Vercel Dashboard
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Select your project
- View:
  - **Analytics** - Pageviews, traffic sources
  - **Speed Insights** - Core Web Vitals, performance

---

## What Each Tool Provides

### Google Analytics (Content Analytics)
- ✅ Which posts are most popular
- ✅ User behavior (scroll depth, time on page)
- ✅ Traffic sources (organic, social, direct)
- ✅ User demographics (age, location, device)
- ✅ Conversion tracking (if configured)
- ✅ Custom events and goals

### Vercel Analytics (Performance Analytics)
- ✅ Page load times
- ✅ Core Web Vitals (LCP, FID, CLS, INP)
- ✅ Error rates
- ✅ Real User Monitoring (RUM)
- ✅ Performance scores
- ✅ Geographic performance data

---

## Troubleshooting

### Google Analytics Not Working?

1. **Check Measurement ID**: Make sure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. **Check Environment**: Restart dev server after adding env variable
3. **Check Browser Console**: Look for GA script errors
4. **Use GA Debugger**: Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension

### Testing Events

Use Google Analytics Debugger or check the Network tab:
- Look for requests to `google-analytics.com/g/collect`
- Check `gtag` calls in browser console

---

## Disabling Google Analytics

If you want to disable Google Analytics:

1. Remove `NEXT_PUBLIC_GA_MEASUREMENT_ID` from `.env.local`
2. Or set it to empty: `NEXT_PUBLIC_GA_MEASUREMENT_ID=`
3. Restart dev server

The `GoogleAnalytics` component will automatically not render if the ID is missing.

---

## Best Practices

1. **Don't track PII**: Never send personally identifiable information
2. **Respect user privacy**: Consider cookie consent for EU users
3. **Use events wisely**: Don't over-track (can slow down site)
4. **Review regularly**: Check analytics weekly/monthly
5. **Combine insights**: Use both GA and Vercel Analytics together

---

## Example: Tracking Article Reads

You can add custom tracking for article engagement:

```tsx
// In ArticleContent component
import { event } from '@/lib/analytics'
import { useEffect, useRef } from 'react'

export function ArticleContent({ post }: { post: Post }) {
  const readRef = useRef(false)

  useEffect(() => {
    // Track when user scrolls past 75% of article
    const handleScroll = () => {
      const scrollPercent = 
        (window.scrollY / document.documentElement.scrollHeight) * 100
      
      if (scrollPercent > 75 && !readRef.current) {
        readRef.current = true
        event({
          action: 'article_read',
          category: 'engagement',
          label: post.slug,
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [post.slug])

  // ... rest of component
}
```

---

## Resources

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [GDPR Compliance Guide](https://support.google.com/analytics/answer/9019185)

