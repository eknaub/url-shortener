# URL Shortener

A modern URL shortening application built with React and TypeScript, featuring a clean interface for creating and managing shortened URLs.

## Features

- 🔗 **URL Shortening** - Convert long URLs into short, shareable links
- 🌐 **Internationalization** - Support for multiple languages (English, German)
- 📊 **Admin Dashboard** - Manage all shortened URLs with full CRUD operations
- 🎨 **Modern UI** - Built with Material-UI for a polished user experience
- ⚡ **Fast & Efficient** - Powered by Vite for lightning-fast development

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Routing**: React Router v7
- **Internationalization**: i18next
- **Styling**: Emotion + Styled Components

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd url-shortener
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AdminPage/    # Admin-specific components
│   └── NavBar/       # Navigation components
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization configuration
├── models/           # TypeScript type definitions
├── pages/            # Page components
├── services/         # Services like ErrorBoundary
├── shared/           # Shared utilities and constants
└── stores/           # Zustand state management stores
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE)
