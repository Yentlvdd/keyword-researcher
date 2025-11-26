# Quick Start Guide

## Step-by-Step Usage

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Start the Application

```bash
cd keyword-discovery-agent
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Enter Your API Key

Paste your Gemini API key in the "Gemini API Key" field at the top of the page.

⚠️ **Security Note**: Your API key is only used for the current session and is never stored.

### 4. Add URLs to Analyze

In the "Competitor or Landing Page URLs" text area, enter URLs one per line:

```
https://www.example.com/product-page
https://www.competitor.com/landing-page
https://www.another-site.com/service
```

### 5. Analyze

Click the **"Analyze & Extract Keywords"** button. The application will:

1. Fetch the HTML content from each URL
2. Clean the HTML to extract visible text
3. Send the text to Gemini AI for keyword extraction
4. Display the results in a table

### 6. Review Results

The results table shows:
- **Source URL**: The analyzed page
- **Extracted Keywords**: Up to 20 high-intent keywords (first 5 shown as tags)
- **Action**: Copy button to copy all keywords to clipboard

### 7. Export Results

Click **"Download CSV"** to export all results to a CSV file for further analysis in Excel, Google Sheets, or other tools.

## Example Use Cases

### PPC Campaign Research
Analyze competitor landing pages to discover keywords they're targeting, then use these insights for your own campaigns.

### SEO Content Planning
Extract keywords from high-performing pages to inform your content strategy.

### Market Research
Understand what search terms are associated with different products or services in your industry.

## Troubleshooting

### "Failed to Crawl" Error
Some websites block automated requests. Try:
- Using a different URL from the same site
- Checking if the URL is publicly accessible
- Verifying the URL is correct

### "Invalid Gemini API Key"
- Double-check you copied the entire API key
- Ensure the key is active in Google AI Studio
- Try generating a new key

### No Keywords Returned
- The page might not have enough content
- The content might be loaded via JavaScript (not accessible to server-side fetching)
- Try a different page with more text content

## Tips for Best Results

1. **Use Landing Pages**: Product pages, service pages, and landing pages typically yield better keywords than homepages
2. **Analyze Multiple Competitors**: Get a broader view of the keyword landscape
3. **Review and Refine**: The AI extracts keywords automatically, but you should review them for relevance
4. **Combine with Other Tools**: Use these keywords as a starting point for further research with tools like Google Keyword Planner

## API Rate Limits

Be aware of Gemini API rate limits based on your tier:
- Free tier: 15 requests per minute
- Paid tier: Higher limits based on your plan

If analyzing many URLs, you may need to batch them to stay within limits.
