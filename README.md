# Keyword Discovery Agent

A Next.js application that analyzes landing pages and generates high-potential Google Ads keywords using OpenAI.

## Features

- 🔍 Analyzes landing page content to extract USP and product offerings
- 🎯 Generates 30 high-potential keywords with transactional/commercial intent
- 📊 Provides match type recommendations (Exact, Phrase, Broad)
- 🚀 Identifies funnel stages (Awareness, Consideration, Conversion)
- ⛔ Suggests negative keywords to filter unprofitable traffic
- 📥 Export results to CSV
- 🎨 Modern, clean UI with real-time processing

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenAI API Key

The app uses OpenAI's API (specifically GPT-4o-mini) for keyword analysis. You need to add your API key:

1. Open the `.env.local` file in the project root
2. Replace `your-openai-api-key-here` with your actual OpenAI API key
3. Get your API key from: https://platform.openai.com/api-keys

Your `.env.local` should look like:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important**: Never commit your `.env.local` file to version control. It's already in `.gitignore`.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter URLs**: Paste one or more landing page URLs (one per line) in the input area
2. **Optional Configuration**:
   - **Campaign Focus**: e.g., "direct e-commerce sales"
   - **Target Audience**: e.g., "Marathon runners"
3. **Analyze**: Click "Analyze Sources" to process the URLs
4. **Review Results**: View keywords organized by match type and funnel stage
5. **Export**: Download results as CSV or copy keywords to clipboard

## Match Types

- **Broad**: Keywords without special formatting
- **"Phrase"**: Keywords wrapped in quotes
- **[Exact]**: Keywords wrapped in brackets

Toggle between match types using the buttons in the header.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel-ready

## API Costs

This app uses OpenAI's GPT-4o-mini model, which is very cost-effective:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens

For typical landing page analysis (30k characters + 30 keywords), expect costs of less than $0.01 per URL.

## Security Note

Since this is an **internal tool**, the OpenAI API key is stored server-side in the `.env.local` file. This means:
- ✅ Users don't need their own API keys
- ✅ Simpler user experience
- ✅ Centralized cost tracking
- ⚠️ Keep the deployment environment secure
- ⚠️ Monitor API usage to prevent abuse

## License

MIT
