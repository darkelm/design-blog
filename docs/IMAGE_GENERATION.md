# Image Generation for Mock Data

This document outlines how to generate images for all mock posts using Nano Banana 2.

## Setup

1. **Get Nano Banana 2 API Access**
   - Sign up for Nano Banana 2 API access
   - Get your API key
   - Note the API endpoint URL

2. **Configure Environment Variables**
   ```bash
   # Add to .env.local
   NANO_BANANA_2_API_KEY=your_api_key_here
   NANO_BANANA_2_API_URL=https://api.nanobanana2.com/v1/generate
   ```

3. **Install Dependencies** (if needed)
   ```bash
   npm install node-fetch  # or use built-in fetch in Node 18+
   ```

## Image Prompts

Each mock post has a specific image prompt designed to match its content:

### Featured Post
- **feat-1**: "Injecting some personality into our agentic future"
  - Prompt: Vibrant cartoon robot heads pattern on white background, retro-futuristic style, pink and blue colors, playful and technological

### Recent Posts
- **rec-1**: "Building a Design System That Actually Scales"
  - Prompt: Abstract design system visualization, modular components, clean and scalable, modern UI elements

- **rec-2**: "What We Learned from 50 User Interviews"
  - Prompt: Healthcare professionals conducting user interviews, warm and approachable, medical setting, diverse people

- **rec-3**: "Our Favorite Figma Plugins This Quarter"
  - Prompt: Figma interface with plugins, design tools, colorful and modern, digital workspace

- **rec-4**: "Designing for Global Accessibility: Part 1"
  - Prompt: Global accessibility symbols, diverse cultures, inclusive design elements, world map with accessibility icons

- **rec-5**: "Rethinking Color Theory for Healthcare"
  - Prompt: Color theory visualization for healthcare, medical color palette, calming and professional, healthcare aesthetics

- **rec-6**: "How to Use AI to Design Better Products"
  - Prompt: AI and design tools integration, futuristic workspace, AI assistants helping designers, modern tech

### Case Studies
- **cs-1**: "Redesigning the Medication Tracker Experience"
  - Prompt: Medication tracker app interface, clean healthcare UI, pill bottles and calendar, patient-friendly design

- **cs-2**: "Accessibility-First: Our Mobile App Overhaul"
  - Prompt: Mobile app accessibility features, screen readers, high contrast, inclusive design, mobile interface

### Process Posts
- **proc-1**: "From Sketch to Ship: Our Design Process"
  - Prompt: Design process timeline, sketch to final product, iteration stages, creative workflow

- **proc-2**: "Collaboration Secrets: Design X Engineering"
  - Prompt: Design and engineering collaboration, team working together, code and design merging, partnership

- **proc-3**: "Running Effective Design Critiques"
  - Prompt: Design critique session, team giving feedback, design boards, collaborative workspace

### Research Posts
- **res-1**: "Understanding Patient Anxiety in Digital Health"
  - Prompt: Patient anxiety visualization, healthcare app usage, emotional design, supportive interface

- **res-2**: "The Role of Trust in Healthcare UX"
  - Prompt: Trust in healthcare UX, medical professionals and patients, trustworthy design, healthcare relationship

- **res-3**: "Quantitative vs Qualitative: Finding the Balance"
  - Prompt: Research methods balance, quantitative charts and qualitative stories, data visualization

### Tools Posts
- **tools-1**: "Figma Tokens: The Most Powerful Design System Plugin"
  - Prompt: Figma Tokens plugin interface, design system tokens, color and typography tokens, design tools

- **tools-2**: "Setting Up Your Design Handoff Workflow"
  - Prompt: Design handoff workflow, design to development process, collaboration tools, seamless transition

- **tools-3**: "Automating Design System Documentation"
  - Prompt: Automated documentation, design system docs, auto-generated content, documentation tools

### Interviews
- **int-1**: "In Conversation with Our New Head of Design"
  - Prompt: Professional headshot of design leader, modern office, confident and inspiring, design professional

- **int-2**: "How a Nurse Became Our Best UX Advocate"
  - Prompt: Nurse turned UX advocate, healthcare professional, empathetic and knowledgeable, healthcare design

### Perspectives
- **persp-1**: "How We Redesigned Our Patient Dashboard from the Ground Up"
  - Prompt: Patient dashboard redesign, healthcare interface, modern and accessible, user-centered design

- **persp-2**: "The Future of Design Tools: What We're Excited About"
  - Prompt: Future design tools, emerging technologies, innovative interfaces, next-generation design

### Spotlight
- **spot-1**: "Sarah Chen • Senior Product Designer"
  - Prompt: Professional portrait of senior product designer, modern workspace, creative professional, design industry

- **spot-2**: "Michael Torres • Design Systems Lead"
  - Prompt: Professional portrait of design systems lead, tech workspace, systems thinking, design leadership

- **spot-3**: "Priya Sharma • UX Researcher"
  - Prompt: Professional portrait of UX researcher, research workspace, analytical and empathetic, user research

## Usage

1. **Update the script** (`scripts/generate-images.js`) with your Nano Banana 2 API details
2. **Run the script**:
   ```bash
   node scripts/generate-images.js
   ```
3. **Update mockData.ts** to use local images instead of Unsplash URLs

## Image Specifications

- **Format**: JPG
- **Dimensions**: 1200x675 (16:9 aspect ratio)
- **Location**: `public/images/{postId}.jpg`
- **Naming**: Use the post ID (e.g., `feat-1.jpg`, `rec-1.jpg`)

## After Generation

Once images are generated, update `lib/mockData.ts` to use local images:

```typescript
feature_image: id === 'feat-1' 
  ? '/images/feat-1.jpg'
  : `/images/${id}.jpg`
```

