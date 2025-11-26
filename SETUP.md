# Quick Setup Guide

## ✅ Conversion Complete!

Your app has been successfully converted from Gemini to OpenAI.

## 🔑 Next Step: Add Your OpenAI API Key

1. **Get your OpenAI API key**:
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-proj-...`)

2. **Add the key to your environment file**:
   - Open `.env.local` in the project root
   - Replace `your-openai-api-key-here` with your actual key
   - Save the file

   Example:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

## 🎉 What Changed?

### Removed:
- ❌ Gemini API Key input field
- ❌ `@google/generative-ai` package
- ❌ Complex model fallback chain
- ❌ User-side API key management

### Added:
- ✅ OpenAI integration with GPT-4o-mini
- ✅ Server-side API key (more secure)
- ✅ Cleaner, simpler UI
- ✅ More reliable JSON parsing
- ✅ Better error handling

## 💰 Cost Estimate

GPT-4o-mini is very affordable:
- **Input**: ~$0.15 per 1M tokens
- **Output**: ~$0.60 per 1M tokens
- **Per URL analysis**: < $0.01

## 🚀 Ready to Use!

Once you've added your API key, the app will work immediately. No more API key errors!

The UI is now cleaner with just two optional fields:
- Campaign Focus (e.g., "direct e-commerce sales")
- Target Audience (e.g., "Marathon runners")

Just paste URLs and click "Analyze Sources"!
