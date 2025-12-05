# Nano Banana 2 MCP Server Setup

This document explains how to set up and use the Nano Banana 2 MCP server for image generation.

## What is This?

The MCP (Model Context Protocol) server allows you to use Nano Banana 2 image generation directly within Cursor or other MCP-compatible clients. This means I can generate images for your mock data automatically!

## Quick Setup

### 1. Install Dependencies

```bash
cd mcp-server/nano-banana-2
npm install
```

### 2. Get Your Nano Banana 2 API Key

1. Sign up for Nano Banana 2 API access
2. Get your API key from the dashboard
3. Note the API endpoint URL

**Note:** This is separate from your Next.js `.env.local` file. The MCP server runs as a separate process and needs its own configuration.

### 3. Configure Cursor

Add the MCP server to your Cursor configuration. The exact location depends on your Cursor setup, but typically:

**Option A: Cursor Settings File (Recommended)**
Create or edit `.cursor/mcp.json` in your project root (or check Cursor's MCP settings):

```json
{
  "mcpServers": {
    "nano-banana-2": {
      "command": "npx",
      "args": ["tsx", "/Users/tyshaw/Downloads/design-blog/mcp-server/nano-banana-2/index.ts"],
      "env": {
        "NANO_BANANA_2_API_KEY": "your-api-key-here",
        "NANO_BANANA_2_API_URL": "https://api.nanobanana2.com/v1"
      }
    }
  }
}
```

**Note:** Using `npx tsx` runs TypeScript directly. Make sure `tsx` is installed (`npm install` in the mcp-server directory).

**Option B: Use .env file in MCP Server Directory**
Alternatively, you can create a `.env` file in `mcp-server/nano-banana-2/`:

```bash
cd mcp-server/nano-banana-2
cp .env.example .env
# Edit .env and add your API key
```

Then configure Cursor without the `env` section (it will read from the `.env` file automatically).

### 4. Restart Cursor

After adding the configuration, restart Cursor to load the MCP server.

## Usage

Once set up, I'll be able to:

1. **Generate images for mock data** - I can call the `generate_batch_images` tool to create all images at once
2. **Generate individual images** - Use `generate_image` for single images
3. **Save images automatically** - Images will be saved to `public/images/` and linked in mock data

## Example: Generating All Mock Data Images

Once the MCP server is configured, you can ask me:

> "Generate images for all mock posts using Nano Banana 2"

And I'll:
1. Read all the image prompts from `scripts/generate-images.js`
2. Call the batch generation tool
3. Download and save images to `public/images/`
4. Update `lib/mockData.ts` to use the local images

## Troubleshooting

### Server Not Found
- Make sure the path to `index.ts` is absolute
- Verify Node.js is in your PATH
- Check that `npm install` completed successfully

### API Errors
- Verify your API key is correct
- Check the API URL matches Nano Banana 2's actual endpoint
- Ensure you have API credits/quota available

### Module Errors
- Run `npm install` in the `mcp-server/nano-banana-2` directory
- Make sure you're using Node.js 18+ (for native fetch support)

## Next Steps

1. Get your Nano Banana 2 API credentials
2. Configure the MCP server in Cursor
3. Ask me to generate images for your mock data!

