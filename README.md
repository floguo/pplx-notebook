# Perplexity Notebook

DISCLAIMER: This project is unaffiliated with Perplexity AI.
Code provided as-is -- this is for prototyping and learning purposes only.

Prototype concept: An AI-powered note-taking and study assistant that helps you learn from documents and web content. Create persistent knowledge bases from your study materials and interact with them through natural language.

## Features

- 📝 **Smart Notebooks**: Create notebooks that understand your documents
- 📑 **PDF Processing**: Upload and extract content from PDF documents
- 🔍 **Context-Aware**: Ask questions about your materials with AI assistance
- 📅 **Date Extraction**: Automatically identify important dates and deadlines
- ✍️ **Study Guide Generation**: Generate comprehensive study guides from your materials
- 🔗 **Web Integration**: Add web content as reference material

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: Radix UI primitives
- **Motion**: Framer Motion
- **PDF Processing**: PDF.js
- **AI**: Google Gemini Pro

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

Create a `.env.local` file:

```bash
GOOGLE_API_KEY=your_gemini_api_key
```

## Project Structure

```
app/
├── notebook/     # Notebook pages and functionality
│   └── [id]/    # Individual notebook views
├── api/         # API routes for AI and file processing
components/      # Reusable UI components
lib/            # Utilities and shared logic
```

## License

MIT License
