#!/usr/bin/env node

/**
 * MCP Server for Nano Banana 2 Image Generation
 * 
 * This server provides tools for generating images using Nano Banana 2
 * and can be used with MCP-compatible clients like Cursor or Claude Desktop.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

interface GenerateImageParams {
  prompt: string
  width?: number
  height?: number
  style?: string
}

class NanoBanana2MCPServer {
  private server: Server
  private apiKey: string
  private apiUrl: string

  constructor() {
    this.server = new Server(
      {
        name: 'nano-banana-2',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    )

    // Get API credentials from environment
    this.apiKey = process.env.NANO_BANANA_2_API_KEY || ''
    this.apiUrl = process.env.NANO_BANANA_2_API_URL || 'https://api.nanobanana2.com/v1'

    this.setupHandlers()
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_image',
            description: 'Generate an image using Nano Banana 2 based on a text prompt',
            inputSchema: {
              type: 'object',
              properties: {
                prompt: {
                  type: 'string',
                  description: 'Text description of the image to generate',
                },
                width: {
                  type: 'number',
                  description: 'Image width in pixels (default: 1200)',
                  default: 1200,
                },
                height: {
                  type: 'number',
                  description: 'Image height in pixels (default: 675)',
                  default: 675,
                },
                style: {
                  type: 'string',
                  description: 'Image style (e.g., "realistic", "cartoon", "abstract")',
                  enum: ['realistic', 'cartoon', 'abstract', 'minimal', 'vibrant'],
                },
              },
              required: ['prompt'],
            },
          },
          {
            name: 'generate_batch_images',
            description: 'Generate multiple images at once for mock data',
            inputSchema: {
              type: 'object',
              properties: {
                prompts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      prompt: { type: 'string' },
                      width: { type: 'number', default: 1200 },
                      height: { type: 'number', default: 675 },
                    },
                    required: ['id', 'prompt'],
                  },
                  description: 'Array of image generation requests with IDs',
                },
              },
              required: ['prompts'],
            },
          },
        ],
      }
    })

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      if (!this.apiKey) {
        throw new Error('NANO_BANANA_2_API_KEY environment variable is not set')
      }

      try {
        switch (name) {
          case 'generate_image':
            return await this.generateImage(args as unknown as GenerateImageParams)

          case 'generate_batch_images':
            return await this.generateBatchImages(args as unknown as { prompts: Array<{ id: string; prompt: string; width?: number; height?: number }> })

          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        }
      }
    })
  }

  private async generateImage(params: GenerateImageParams) {
    const { prompt, width = 1200, height = 675, style } = params

    try {
      // Call Nano Banana 2 API
      const response = await fetch(`${this.apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          width,
          height,
          style,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      
      // Return image URL or base64 data
      return {
        content: [
          {
            type: 'text',
            text: `Image generated successfully!\n\nPrompt: ${prompt}\nDimensions: ${width}x${height}\nImage URL: ${data.image_url || data.url || 'See response data'}`,
          },
          ...(data.image_url ? [{
            type: 'image',
            data: data.image_url,
            mimeType: 'image/jpeg',
          }] : []),
        ],
      }
    } catch (error) {
      throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  private async generateBatchImages(params: { prompts: Array<{ id: string; prompt: string; width?: number; height?: number }> }) {
    const { prompts } = params
    const results = []

    for (const item of prompts) {
      try {
        const result = await this.generateImage({
          prompt: item.prompt,
          width: item.width || 1200,
          height: item.height || 675,
        })
        results.push({
          id: item.id,
          success: true,
          result,
        })
      } catch (error) {
        results.push({
          id: item.id,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: `Batch generation complete!\n\nGenerated ${results.filter(r => r.success).length} of ${results.length} images.\n\nResults:\n${results.map(r => `- ${r.id}: ${r.success ? '✓ Success' : `✗ Failed: ${r.error}`}`).join('\n')}`,
        },
      ],
    }
  }

  async run() {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    console.error('Nano Banana 2 MCP server running on stdio')
  }
}

// Run the server
const server = new NanoBanana2MCPServer()
server.run().catch(console.error)

