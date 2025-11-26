# Usage Guide - Content-Aware Keyword Discovery Agent

## Quick Start

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Run the Application

```bash
cd /Users/yentlvanderdood/.gemini/antigravity/scratch/keyword-discovery-agent
npm run dev
```

The application will be available at `http://localhost:3001` (or port 3000 if available)

### Step 3: Analyze URLs

1. **Enter API Key**: Paste your Gemini API key in the secure input field
2. **Add URLs**: Enter competitor landing page URLs (one per line), for example:
   ```
   https://www.shopify.com/pricing
   https://www.wix.com/ecommerce/website
   https://www.squarespace.com/ecommerce-website
   ```
3. **Click "Analyze & Extract Keywords"**: The app will process each URL
4. **View Results**: Keywords will appear as colorful tags in the results table

### Step 4: Export Results

- **Copy Individual Keywords**: Click the "Copy" button next to any URL
- **Download All Results**: Click "Download CSV" to export everything

## Example Use Cases

### 1. PPC Campaign Research
Analyze competitor landing pages to discover keywords they're targeting:
```
https://competitor1.com/product-page
https://competitor2.com/landing-page
https://competitor3.com/service-page
```

### 2. SEO Content Planning
Extract keywords from top-ranking pages in your niche:
```
https://top-ranking-site.com/blog-post
https://authority-site.com/guide
```

### 3. Market Research
Understand what keywords are associated with different products:
```
https://brand1.com/product-a
https://brand2.com/product-b
```

## Understanding the Results

### Keyword Types
The AI extracts **transactional, high-intent keywords** such as:
- "buy [product]"
- "[product] pricing"
- "best [product] for [use case]"
- "[product] vs [alternative]"
- "affordable [product]"

### What's Excluded
The AI automatically filters out:
- Brand names (navigational queries)
- Generic terms
- Non-commercial keywords

## Troubleshooting

### "Invalid Gemini API Key"
- Verify your API key is correct
- Ensure you've enabled the Gemini API in Google Cloud Console
- Check if your API key has usage limits

### "Failed to Crawl"
Some websites may block automated requests:
- Try different URLs from the same site
- Some sites have strict bot protection
- 403/404 errors indicate the page is inaccessible

### No Keywords Returned
- The page might have very little text content
- Try a different landing page with more content
- Check if the URL is publicly accessible

## Best Practices

### 1. Choose Content-Rich Pages
- Landing pages with product descriptions
- Service pages with detailed information
- Blog posts and guides
- Avoid pages with mostly images/videos

### 2. Batch Processing
- Analyze 5-10 URLs at a time for best results
- Too many URLs may take longer to process

### 3. Review and Refine
- The AI provides suggestions, not definitive keywords
- Review keywords for relevance to your campaign
- Combine with your own keyword research

## Technical Details

### How It Works

1. **Fetching**: Server-side fetch of HTML content
2. **Cleaning**: Regex-based removal of scripts, styles, and HTML tags
3. **AI Analysis**: Gemini 1.5 Flash analyzes visible text
4. **Extraction**: Returns 20 high-intent keywords per URL

### Privacy & Security

- API keys are **never stored** on the server
- Keys are only used for the current session
- All processing happens server-side to protect your API key
- No data is logged or saved

### Rate Limits

- Gemini API has rate limits based on your plan
- Free tier: 60 requests per minute
- If you hit limits, wait a minute and try again

## Advanced Tips

### Custom Analysis
You can modify the prompt in `app/api/analyze/route.ts` to:
- Extract more/fewer keywords
- Focus on specific keyword types
- Target different industries

### Integration
Export CSV files can be imported into:
- Google Ads Keyword Planner
- SEMrush
- Ahrefs
- Your own spreadsheet tools

## Support

For issues or questions:
1. Check the console for error messages
2. Verify your API key is valid
3. Test with a simple, well-known URL first
4. Review the README.md for additional documentation
