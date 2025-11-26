# Project Structure

## Overview
This is a Next.js application built with TypeScript and Tailwind CSS that extracts keywords from landing pages using Google's Gemini AI.

## Directory Structure

```
keyword-discovery-agent/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # Backend API route for URL analysis
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main UI component
├── public/                       # Static assets
├── node_modules/                 # Dependencies
├── .next/                        # Next.js build output
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration for Tailwind
├── eslint.config.mjs             # ESLint configuration
├── README.md                     # Main documentation
├── QUICK_START.md                # Quick start guide
└── PROJECT_STRUCTURE.md          # This file

```

## Key Files

### Frontend

#### `app/page.tsx`
The main UI component featuring:
- API key input (password field)
- Bulk URL input (textarea)
- Analyze button with loading state
- Results table with keyword tags
- Copy to clipboard functionality
- CSV export functionality
- Error handling and validation

**Key Features:**
- Modern gradient background (slate-900 to purple-900)
- Glassmorphism effects with backdrop blur
- Responsive design
- Smooth animations and transitions
- Loading states with spinner

### Backend

#### `app/api/analyze/route.ts`
Server-side API route that handles:
- URL fetching with proper User-Agent headers
- HTML cleaning using regex patterns
- Gemini AI integration
- Error handling for failed crawls
- API key validation

**Cleaning Subsystem:**
1. Remove `<script>` tags: `/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi`
2. Remove `<style>` tags: `/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style\s*>/gi`
3. Strip HTML tags: `/<[^>]+>/g`
4. Normalize whitespace

**AI Configuration:**
- Model: `gemini-1.5-flash`
- Response format: `application/json`
- Prompt: PPC specialist persona with specific instructions

### Styling

#### `app/globals.css`
Global styles including:
- Tailwind CSS v4 imports
- CSS custom properties for theming
- Smooth scrolling
- Font smoothing

#### `app/layout.tsx`
Root layout with:
- Metadata (title, description)
- Font configuration (Geist Sans, Geist Mono)
- Global CSS import

## Data Flow

1. **User Input** → User enters API key and URLs in the frontend
2. **Validation** → Frontend validates inputs before submission
3. **API Request** → POST request to `/api/analyze` with API key and URLs
4. **Server Processing** → For each URL:
   - Fetch HTML content
   - Clean HTML to extract visible text
   - Send to Gemini AI for keyword extraction
   - Parse JSON response
5. **Response** → Return results array to frontend
6. **Display** → Frontend renders results in table format
7. **Export** → User can copy keywords or download CSV

## API Interface

### Request
```typescript
POST /api/analyze
Content-Type: application/json

{
  "apiKey": "string",
  "urls": ["string", "string", ...]
}
```

### Response
```typescript
{
  "results": [
    {
      "url": "string",
      "keywords": ["string", ...],
      "status": "success" | "failed",
      "error": "string" // optional, only if status is "failed"
    },
    ...
  ]
}
```

## Dependencies

### Production
- `next`: ^16.0.4 - React framework
- `react`: ^19.2.0 - UI library
- `react-dom`: ^19.2.0 - React DOM renderer
- `@google/generative-ai`: ^0.24.1 - Gemini AI SDK

### Development
- `typescript`: ^5 - Type safety
- `tailwindcss`: ^4 - Styling framework
- `@types/node`: ^20 - Node.js type definitions
- `@types/react`: ^19 - React type definitions
- `@types/react-dom`: ^19 - React DOM type definitions
- `eslint`: ^9 - Code linting
- `eslint-config-next`: 16.0.4 - Next.js ESLint config

## Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment

- **Node.js**: 18+ required
- **Package Manager**: npm
- **Port**: 3000 (default)

## Security Considerations

1. **API Key Handling**: 
   - API key is entered by user in the UI
   - Never stored in environment variables or database
   - Sent to backend only for API calls
   - Used as password input field (hidden)

2. **CORS**: 
   - Backend API route handles fetching to avoid CORS issues
   - Server-side requests don't expose user's IP to target sites

3. **Error Messages**: 
   - Generic error messages to avoid information leakage
   - Detailed errors logged server-side only

## Performance Optimizations

1. **Parallel Processing**: All URLs analyzed concurrently using `Promise.all()`
2. **Text Truncation**: Content limited to 30,000 characters to avoid token limits
3. **Efficient Cleaning**: Regex-based HTML cleaning is fast and lightweight
4. **JSON Response**: Gemini configured for JSON output for easy parsing

## Future Enhancements

Potential improvements:
- Rate limiting to prevent abuse
- Caching of results
- Batch processing with progress indicators
- Keyword filtering and categorization
- Integration with keyword research tools
- Historical analysis and tracking
- Multi-language support
- Advanced cleaning options (e.g., remove specific elements)
