# NorthStar Sports Betting Platform

## Overview

NorthStar Sports is a modern, professional sports betting platform built with Next.js, TypeScript, and Tailwind CSS. It provides users with real-time odds, comprehensive market coverage, and an intuitive betting experience.

## Project Structure

```
northstar-sports/
├── app/                  # Next.js App Router
│   ├── (auth)/          # Authentication routes
│   ├── (dashboard)/      # Dashboard routes
│   ├── (markets)/       # Markets routes
│   ├── (profile)/        # Profile routes
│   ├── (sports)/         # Sports routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/          # Reusable components
│   ├── betting/          # Betting components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   ├── mobile/           # Mobile components
│   ├── sections/         # Page sections
│   ├── ui/               # UI components
│   └── VirtualScrolling.tsx # Virtual scrolling implementation
├── lib/                 # Utility libraries
│   ├── constants.ts      # Constants
│   ├── format.ts         # Formatting utilities
│   ├── mockData.ts       # Mock data generators
│   ├── prisma.ts        # Prisma client
│   ├── supabase.ts       # Supabase client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── prisma/              # Prisma schema
│   └── schema.prisma     # Database schema
├── public/              # Static assets
├── store/               # Zustand stores
│   ├── bet-slip.ts       # Bet slip store
│   ├── mobile-state.ts   # Mobile state store
│   └── ui-state.ts       # UI state store
├── types/               # TypeScript types
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Features

### Core Features

- **Real-time Odds**: Live updates across all major sports and leagues
- **Comprehensive Markets**: Wide range of betting options including spreads, totals, and moneylines
- **User Accounts**: Secure authentication and profile management
- **Bet Slip**: Easy bet management with single and accumulator options
- **Live Betting**: Bet on games in progress with real-time odds updates
- **Responsive Design**: Optimized for all device sizes

### Technical Features

- **Next.js App Router**: Modern routing system
- **TypeScript**: Type-safe codebase
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Prisma**: Database ORM
- **Supabase**: Authentication and database services
- **Virtual Scrolling**: Efficient rendering of large datasets
- **Dark Mode**: Built-in dark theme support

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/northstar-sports.git
   cd northstar-sports
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your Supabase credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
DATABASE_URL="your-supabase-database-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### Database Setup

1. Initialize Prisma:
   ```bash
   npx prisma generate
   ```

2. Apply database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

### Code Structure

#### Components

- **Betting Components**: GameCard, GamesTable, BetSlip, LiveFeed
- **Layout Components**: Header, Footer, Sidebar, MobileBottomNav
- **UI Components**: Button, Card, Input, Badge, etc.
- **Page Sections**: Hero, FeaturedGames, LiveBetting, Promotions

#### Stores

- **Bet Slip Store**: Manages bet selections and stakes
- **UI State Store**: Manages UI state like sidebar visibility
- **Mobile State Store**: Manages mobile-specific state

#### Utilities

- **Format Utilities**: Date, currency, and time formatting
- **Mock Data Generators**: Generate mock data for development
- **TypeScript Types**: Shared type definitions

## Deployment

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t northstar-sports .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 northstar-sports
   ```

## Contributing

We welcome contributions to NorthStar Sports! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Write tests for your changes
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the framework
- Tailwind CSS team for the styling solution
- Zustand team for the state management solution
- Prisma team for the database toolkit
- Supabase team for the backend services
- Lucide team for the icon set
- All contributors who have helped shape NorthStar Sports

## Support

For support, please contact our support team at support@northstarsports.com or visit our help center at [https://northstarsports.com/help](https://northstarsports.com/help).

## Roadmap

- [ ] Add more sports and leagues
- [ ] Implement in-play betting
- [ ] Add live chat support
- [ ] Implement referral program
- [ ] Add mobile app support
- [ ] Implement advanced analytics dashboard

## Changelog

### [1.0.0] - 2024-01-15

- Initial release of NorthStar Sports platform
- Core betting functionality
- User authentication
- Basic UI components
- Responsive design

## Contact

For any questions or feedback, please contact us at:

- Email: info@northstarsports.com
- Twitter: [@NorthStarSports](https://twitter.com/NorthStarSports)
- Website: [https://northstarsports.com](https://northstarsports.com)

---

NorthStar Sports - Your premier destination for professional sports betting. Experience the thrill with industry-leading odds, instant payouts, and unmatched security.
