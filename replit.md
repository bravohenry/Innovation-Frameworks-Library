# Innovation Frameworks Library (创新框架库)

## Project Overview
A bilingual (Chinese/English) innovation methodology knowledge base built with React + Vite + HeroUI + Tailwind CSS. This project provides a comprehensive collection of business and innovation frameworks organized by chapters and sections.

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.11
- **UI Library**: HeroUI 2.8.3
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 5.3.4
- **Charts**: Chart.js with react-chartjs-2
- **Language**: TypeScript 5.7.3

## Project Structure
```
├── src/
│   ├── components/      # React components
│   │   ├── interactive/ # Interactive framework diagrams
│   │   ├── layout/      # Layout components (Navbar, Sidebar, Layout)
│   │   └── ui/          # UI components (Cards, Buttons)
│   ├── contexts/        # React contexts (I18n)
│   ├── data/            # Framework data
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
│   ├── diagrams/        # Framework diagrams (SVG)
│   └── templates/       # PowerPoint templates
├── docs/                # Build output directory
└── vite.config.ts       # Vite configuration
```

## Development Setup
The project has been configured to run in Replit environment with:
- Vite dev server running on `0.0.0.0:5000`
- Base path set to `/` (for Replit, changed from `/Innovation-Frameworks-Library/` for GitHub Pages)
- Host verification bypassed for proxy compatibility (`allowedHosts: true`)

## Features
- **Bilingual Support**: Full Chinese and English translations
- **Interactive Diagrams**: 
  - Porter's Five Forces
  - PESTLE Analysis
  - SWOT/sSWOT Analysis
  - RACI Chart
  - Gantt Chart
  - North Star Framework
  - Five Dysfunctions of a Team
  - Business Opportunity Statement
- **Export Capabilities**: PNG and CSV export for frameworks
- **Template Downloads**: PowerPoint templates for various frameworks
- **Search Functionality**: Search across all frameworks
- **Chapter Navigation**: Organized by strategic topics

## Running the Project
The workflow is configured to run `npm run dev` which starts the Vite development server on port 5000.

## Recent Changes
- Updated Vite configuration for Replit environment (October 24, 2025)
- Fixed duplicate key issue in I18nContext.tsx
- Configured workflow to serve on port 5000
- Added proper .gitignore entries for build artifacts
