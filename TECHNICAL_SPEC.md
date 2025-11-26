# Technical Specification

## Application Name
Content-Aware Keyword Discovery Agent

## Purpose
Extract high-intent, transactional keywords from competitor landing pages using AI-powered analysis.

## Technical Requirements Met

### ✅ Framework
- **Next.js 16** with App Router architecture
- Server-side rendering and API routes
- TypeScript for type safety

### ✅ Styling
- **Tailwind CSS v4** for utility-first styling
- Clean, modern, minimal interface
- Responsive design for all screen sizes
- Gradient backgrounds and glassmorphism effects

### ✅ Language
- **TypeScript** throughout the application
- Strict type checking enabled
- Interface definitions for all data structures

### ✅ AI Integration
- **Google Gemini API** using `@google/generative-ai` SDK v0.24.1
- Model: `gemini-1.5-flash` (optimized for speed and cost)
- JSON response format for reliable parsing

## Architecture

### Frontend (UI)

#### Header Section
- ✅ Application title with gradient text effect
- ✅ Secure password input field for Gemini API Key
- ✅ Link to Google AI Studio for API key generation

#### Input Area
- ✅ Large textarea for bulk URL input (one per line)
- ✅ Clear label: "Competitor or Landing Page URLs"
- ✅ Placeholder text with example URLs
- ✅ Primary action button: "Analyze & Extract Keywords"
- ✅ Loading state with animated spinner
- ✅ Disabled state during processing

#### Results Area
- ✅ Responsive table with three columns:
  - Source URL (with truncation for long URLs)
  - Extracted Keywords (displayed as styled tags, showing first 5)
  - Action (Copy button for successful results)
- ✅ "Download CSV" button for exporting all results
- ✅ Error states displayed inline for failed crawls

### Backend Logic (API Route)

#### Endpoint: `/api/analyze`
- ✅ POST method only
- ✅ Accepts JSON payload with `apiKey` and `urls` array
- ✅ Returns JSON response with results array

#### Processing Pipeline

**Step A: Fetching**
- ✅ Server-side HTML fetching using native `fetch()`
- ✅ Custom User-Agent header to avoid bot detection
- ✅ Handles HTTP errors (403, 404, etc.)

**Step B: Cleaning Subsystem**
The application implements a strict three-stage cleaning process:

1. **Remove Scripts**
   ```typescript
   /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi
   ```
   - Removes all `<script>` tags and their contents
   - Case-insensitive matching
   - Handles nested content

2. **Remove Styles**
   ```typescript
   /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style\s*>/gi
   ```
   - Removes all `<style>` tags and their contents
   - Case-insensitive matching
   - Handles nested content

3. **Remove Tags**
   ```typescript
   /<[^>]+>/g
   ```
   - Strips all remaining HTML tags
   - Leaves only visible text content

4. **Normalize Whitespace**
   - Replaces multiple spaces with single space
   - Trims leading/trailing whitespace

**Step C: Intelligence (Gemini)**

Configuration:
```typescript
{
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json'
  }
}
```

Prompt Strategy:
```
Act as a PPC Specialist. Analyze the following landing page text. 
Extract 20 high-intent, transactional keywords that a user would 
search to find this product. Do not include navigational queries 
(brand names). Format the output as a JSON array of strings.
```

**Step D: Return**
- ✅ Parses JSON response from Gemini
- ✅ Returns structured data to frontend
- ✅ Includes error information for failed requests

## Error Handling

### Frontend Validation
- ✅ Checks for empty API key
- ✅ Validates URL input (at least one URL required)
- ✅ Displays user-friendly error messages

### Backend Error Handling

1. **Invalid API Key**
   - ✅ Tests API key validity before processing
   - ✅ Returns 401 status with clear error message
   - ✅ Prevents wasted API calls

2. **Failed Crawls**
   - ✅ Returns status "Failed to Crawl" for HTTP errors
   - ✅ Includes HTTP status code in error message
   - ✅ Continues processing other URLs

3. **Network Issues**
   - ✅ Catches and logs errors
   - ✅ Returns 500 status for server errors
   - ✅ Provides generic error message to client

4. **Parsing Errors**
   - ✅ Handles invalid JSON responses
   - ✅ Returns empty keywords array on failure
   - ✅ Logs detailed error information

## Data Structures

### Request Interface
```typescript
{
  apiKey: string;
  urls: string[];
}
```

### Response Interface
```typescript
{
  results: AnalysisResult[];
}

interface AnalysisResult {
  url: string;
  keywords: string[];
  status: 'success' | 'failed';
  error?: string;
}
```

## Performance Characteristics

### Concurrency
- All URLs processed in parallel using `Promise.all()`
- No sequential bottlenecks
- Scales with number of URLs

### Optimization
- Text truncated to 30,000 characters to avoid token limits
- Efficient regex-based HTML cleaning
- Minimal data transfer between client and server

### Rate Limiting
- Subject to Gemini API rate limits
- Free tier: ~15 requests per minute
- Paid tier: Higher limits based on plan

## Security Features

### API Key Security
- ✅ Password input field (hidden from view)
- ✅ Never stored in localStorage or cookies
- ✅ Only sent to backend for API calls
- ✅ Not logged or persisted

### CORS Protection
- ✅ Server-side fetching prevents CORS issues
- ✅ User's IP not exposed to target sites
- ✅ Controlled request headers

### Input Validation
- ✅ API key format validation
- ✅ URL array validation
- ✅ Sanitized error messages

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Requires JavaScript enabled
- ✅ Responsive design for mobile and desktop

## Deployment Considerations

### Environment
- Node.js 18+ required
- npm for package management
- No database required

### Build Output
- Static pages: `/` (homepage)
- Dynamic routes: `/api/analyze`
- Optimized for production with Next.js build

### Hosting Options
- Vercel (recommended for Next.js)
- AWS Amplify
- Netlify
- Any Node.js hosting platform

## Testing Checklist

- ✅ TypeScript compilation successful
- ✅ Production build successful
- ✅ No console errors in browser
- ✅ Responsive design verified
- ✅ API route accessible
- ✅ Error handling tested
- ✅ CSV export functional
- ✅ Copy to clipboard working

## Compliance

### Data Privacy
- No user data stored
- No cookies used
- No analytics tracking
- API key handled securely

### Accessibility
- Semantic HTML structure
- Form labels properly associated
- Keyboard navigation supported
- Color contrast meets WCAG guidelines

## Limitations

1. **Content Access**
   - Cannot access JavaScript-rendered content
   - Some sites may block automated requests
   - Requires publicly accessible URLs

2. **API Constraints**
   - Subject to Gemini API rate limits
   - Token limits may affect very long pages
   - API key required for operation

3. **Keyword Quality**
   - AI-generated results may need manual review
   - Quality depends on page content quality
   - May include some irrelevant keywords

## Future Enhancements

### Potential Features
- User authentication and API key storage
- Historical analysis and tracking
- Keyword filtering and categorization
- Integration with Google Keyword Planner
- Batch processing with progress indicators
- Export to multiple formats (JSON, Excel)
- Competitor comparison views
- Keyword difficulty scoring

### Technical Improvements
- Rate limiting middleware
- Redis caching for results
- Queue system for large batches
- WebSocket for real-time updates
- Advanced HTML parsing (Cheerio/JSDOM)
- Proxy rotation for better access
- Multi-language support

## Conclusion

This application successfully meets all specified requirements:
- ✅ Next.js with App Router
- ✅ Tailwind CSS styling
- ✅ TypeScript throughout
- ✅ Google Gemini AI integration
- ✅ Server-side crawling to avoid CORS
- ✅ Strict HTML cleaning with regex
- ✅ Comprehensive error handling
- ✅ Modern, responsive UI
- ✅ CSV export functionality
- ✅ Production-ready build

The application is ready for deployment and use.
