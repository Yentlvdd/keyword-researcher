import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Define the structure for our response
interface KeywordData {
    keyword: string;
    matchType: string;
    funnelStage: string;
}

interface AnalysisResult {
    url: string;
    keywords: KeywordData[];
    negativeKeywords: string[];
    status: 'success' | 'failed';
    error?: string;
}

// Initialize OpenAI with API key from environment variable
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

// Cleaning subsystem - removes scripts, styles, and HTML tags
function cleanHTML(html: string): string {
    let cleaned = html;

    // Remove Scripts
    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi, '');

    // Remove Styles
    cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style\s*>/gi, '');

    // Remove Tags
    cleaned = cleaned.replace(/<[^>]+>/g, ' ');

    // Clean up extra whitespace
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
}

// Fetch and analyze a single URL
async function analyzeURL(url: string, focus?: string, audience?: string, region?: string, timeframe?: string): Promise<AnalysisResult> {
    try {
        // Step A: Fetch the HTML content
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();

        // Step B: Clean the HTML
        const cleanText = cleanHTML(html);
        const truncatedText = cleanText.slice(0, 15000); // Limit context window

        // Step C: Generate Keywords with OpenAI
        const prompt = `
Context & Data:
My Landing Page (Content Source): [See Text Below]
Campaign Focus/Goal: ${focus || 'General Traffic'}
Target Audience: ${audience || 'General Audience'}
Target Region: ${region || 'Global'}
Timeframe/Seasonality: ${timeframe || 'General / Evergreen'}

The Task:
Please analyze the content of my landing page to understand my Unique Selling Proposition (USP) and product offering. Based on this analysis, generate a list of 30 high-potential Google Ads keywords.

Apply the following parameters to your generation:
1. Search Intent: Focus primarily on Transactional and Commercial intent.
2. Localization: Prioritize spelling and terminology relevant to the Target Region (e.g. "trousers" vs "pants").
3. Seasonality: Prioritize keywords relevant to the Timeframe/Season (e.g. "winter coats" vs "jackets").
4. Exclusions (Negative Keywords): Identify 5-10 terms that are semantically related but likely unprofitable (e.g., "free," "second hand," "definition") and list them separately.

Output Format:
Return a JSON object with two properties:
1. "keywords": An array of objects, each with:
   - "keyword": The actual search term.
   - "matchType": Recommended match type (Exact, Phrase, or Broad).
   - "funnelStage": (Awareness, Consideration, Conversion).
   - "volumePotential": Estimate the search volume potential (High, Medium, Low) based on general popularity.
2. "negativeKeywords": An array of strings (the negative keywords).

Landing Page Text:
${truncatedText}
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert Google Ads keyword researcher. You analyze landing pages and generate high-converting keyword lists with proper match types and funnel stages. Always respond with valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const responseText = completion.choices[0].message.content || '{}';

        // Parse the JSON response
        const data = JSON.parse(responseText);

        return {
            url,
            keywords: Array.isArray(data.keywords) ? data.keywords : [],
            negativeKeywords: Array.isArray(data.negativeKeywords) ? data.negativeKeywords : [],
            status: 'success'
        };

    } catch (error) {
        console.error(`Error analyzing ${url}:`, error);
        return {
            url,
            keywords: [],
            negativeKeywords: [],
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file.' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { urls, focus, audience } = body;

        // Validate input
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: 'Invalid or missing URLs' },
                { status: 400 }
            );
        }

        // Process all URLs
        const results = await Promise.all(
            urls.map(url => analyzeURL(url, focus, audience))
        );

        return NextResponse.json({ results });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
