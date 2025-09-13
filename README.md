# Bright Social - Frontend

A modern social media platform built with Next.js.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** (version 9.0 or higher) or **yarn** or **pnpm**
- **Git**

You can check if you have these installed by running:
```bash
node --version
npm --version
git --version
```

## 🚀 Quick Start

1. **Clone the project**
   ```bash
   git clone https://github.com/ngbaduyy10/bright-social_fe.git
   cd bright-social_fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   ```
   Add your backend URL to `.env`:
   ```env
   BE_URL=your_backend_api_url
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

### `/src` Directory

- **`/app`** - Next.js pages and routing
  - `layout.tsx` - Main app layout
  - `page.tsx` - Home page
  - `(auth)/` - Login and register pages

- **`/components`** - Reusable UI components
  - `atoms/` - Basic components (buttons, inputs)
  - `molecules/` - Simple component combinations
  - `organisms/` - Complex components
  - `templates/` - Page layouts
  - `ui/` - Base UI components

- **`/hooks`** - Custom React hooks

- **`/lib`** - Utility functions and helpers

- **`/models`** - Data models and interfaces

- **`/types`** - TypeScript type definitions

- **`/utils`** - API utilities and validation

- **`/styles`** - Global CSS and styling

## 🛠️ Available Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run code linting
```

## 🎨 Tech Stack

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Validation