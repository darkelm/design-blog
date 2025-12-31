#!/bin/bash

# Setup script for Nano Banana 2 MCP Server

echo "Setting up Nano Banana 2 MCP Server..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your Nano Banana 2 API key!"
fi

echo ""
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your NANO_BANANA_2_API_KEY"
echo "2. Update NANO_BANANA_2_API_URL if needed"
echo "3. Configure Cursor/Claude Desktop to use this MCP server"
echo "4. See README.md for configuration details"








