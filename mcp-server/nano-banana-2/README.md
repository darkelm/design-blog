# Nano Banana 2 MCP Server

MCP (Model Context Protocol) server for generating images using Nano Banana 2.

## Setup

### 1. Install Dependencies

```bash
cd mcp-server/nano-banana-2
npm install
```

### 2. Configure Environment Variables

**Option A: Via Cursor Configuration (Recommended)**
Add environment variables directly in your Cursor MCP config (see step 4 below). This keeps credentials in one place.

**Option B: Via .env File**
Create a `.env` file in this directory:

```bash
cp .env.example .env
# Edit .env and add your API key
```

**Note:** This `.env` file is separate from your Next.js `.env.local` file. The MCP server runs as a separate process.

### 3. Build (Optional)

```bash
npm run build
```

### 4. Configure Cursor/Claude Desktop

Add to your MCP client configuration:

**For Cursor:**
Add to your Cursor settings (`.cursor/mcp.json` or similar):

```json
{
  "mcpServers": {
    "nano-banana-2": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/design-blog/mcp-server/nano-banana-2/index.ts"],
      "env": {
        "NANO_BANANA_2_API_KEY": "your-api-key-here",
        "NANO_BANANA_2_API_URL": "https://api.nanobanana2.com/v1"
      }
    }
  }
}
```

**Note:** Using `npx tsx` allows running TypeScript directly without compilation. Alternatively, you can build first (`npm run build`) and use `node dist/index.js`.

**For Claude Desktop:**
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nano-banana-2": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/design-blog/mcp-server/nano-banana-2/index.ts"],
      "env": {
        "NANO_BANANA_2_API_KEY": "your-api-key-here",
        "NANO_BANANA_2_API_URL": "https://api.nanobanana2.com/v1"
      }
    }
  }
}
```

## Usage

Once configured, you can use the MCP server tools:

### Generate Single Image

```typescript
// Tool: generate_image
{
  "prompt": "Vibrant cartoon robot heads pattern on white background",
  "width": 1200,
  "height": 675,
  "style": "cartoon"
}
```

### Generate Batch Images

```typescript
// Tool: generate_batch_images
{
  "prompts": [
    {
      "id": "feat-1",
      "prompt": "Vibrant cartoon robot heads pattern",
      "width": 1200,
      "height": 675
    },
    {
      "id": "rec-1",
      "prompt": "Abstract design system visualization",
      "width": 1200,
      "height": 675
    }
  ]
}
```

## API Integration

The server expects Nano Banana 2 API to:

1. Accept POST requests to `/generate` endpoint
2. Use Bearer token authentication
3. Accept JSON body with `prompt`, `width`, `height`, `style`
4. Return JSON with `image_url` or `url` field

If your API differs, update the `generateImage` method in `index.ts`.

## Troubleshooting

- **"API key not set"**: Make sure `NANO_BANANA_2_API_KEY` is set in environment
- **Connection errors**: Verify the API URL is correct
- **Module errors**: Run `npm install` in the mcp-server/nano-banana-2 directory

