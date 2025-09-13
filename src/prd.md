# NorthStar Sports Wagering Studio - PRD

## Project Overview

**Mission Statement**: Create a comprehensive, universally adaptive betting studio that provides an elegant and powerful interface for sports wagering across all devices.

**Success Indicators**: 
- Seamless experience across mobile and desktop
- Intuitive navigation and bet placement
- Real-time synchronization between all panels
- Professional, modern design system

**Experience Qualities**: Sophisticated, Intuitive, Responsive

## Core Features Implemented

### Universal Adaptive Layout
- **Desktop Experience**: Three-panel layout (Sports Navigation | Game Lines | Bet Slip)
- **Mobile Experience**: Focused view with animated overlays
- **Responsive Breakpoint**: 1024px (lg: breakpoint)

### Sports Navigation (Left Panel)
- Hierarchical sports categorization
- Favorites system with star toggle
- Collapsible accordion structure
- League selection with visual feedback

### Game Lines Workspace (Center Panel)
- Data-dense table layout for games
- Spread, Total, and Moneyline betting options
- Loading skeletons for smooth UX
- Quick bet placement with visual feedback

### Bet Slip & Management (Right Panel)
- Tabbed interface: Bet Slip | My Bets
- Straight and Parlay betting modes
- Round Robin options
- Real-time bet management
- Stake input and calculation

### Mobile Experience
- Header with toggle buttons
- Smooth slide-in overlays
- Bottom navigation bar
- Touch-optimized interactions

## Design System

### Monochromatic Slate Palette
- **Background**: Pure white (oklch(1 0 0))
- **Foreground**: Deep charcoal (oklch(0.205 0 0))
- **Primary Actions**: Deep charcoal backgrounds
- **Secondary Actions**: Light gray backgrounds
- **Accent**: Warm amber for success states
- **Destructive**: Error red for warnings

### Typography
- **Font Family**: Inter with system font fallbacks
- **Hierarchy**: Clear distinction between headings, body, and UI text
- **Tabular Numbers**: Enabled for odds and monetary values

### Animation & Motion
- **Panel Transitions**: 300ms ease-out animations
- **Overlay Slides**: Framer Motion powered smooth transitions
- **Bet Addition**: AnimatePresence for graceful state changes
- **Loading States**: Skeleton loaders for perceived performance

## Technical Architecture

### State Management
- **Global State**: React Context (BettingContext)
- **Local State**: useState for UI-only state
- **Persistence**: useKV hooks for user preferences and bet data
- **Synchronization**: All panels react to global state changes

### Component Hierarchy
```
App.tsx (Root)
├── BettingProvider (Global State)
├── SideNavPanel (Sports Navigation)
├── WorkspacePanel (Game Lines)
│   ├── GameLinesTable
│   └── PropBuilder
├── ActionHubPanel (Bet Management)
│   ├── BetSlip
│   └── MyBets
├── MobileOverlay (Mobile Panels)
└── MobileBottomNav (Mobile Navigation)
```

### Key Technologies
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + Radix UI Colors
- **Components**: Radix UI primitives + shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Phosphor Icons
- **State**: React Context + useKV hooks

## User Experience Flow

### Desktop Flow
1. User sees three-panel layout immediately
2. Clicks sport/league in left panel → center updates
3. Clicks bet button in center → bet appears in right panel
4. Manages bets in right panel tabs

### Mobile Flow
1. User sees focused workspace with header controls
2. Taps sports button → left overlay slides in
3. Selects league → overlay closes, workspace updates
4. Taps bet slip button → right overlay slides in
5. Manages bets in overlay

## Success Metrics

✅ **Universal Adaptation**: Single codebase, dual experiences
✅ **State Synchronization**: Real-time updates across all panels
✅ **Professional Polish**: Smooth animations and micro-interactions
✅ **Performance**: Skeleton loaders and optimized re-renders
✅ **Accessibility**: Proper ARIA labels and keyboard navigation
✅ **Type Safety**: Full TypeScript coverage

## Future Enhancements

- Live odds updates
- User authentication
- Bet history tracking
- Advanced prop builder
- Social betting features
- Payment integration

---

**Status**: ✅ COMPLETE - Production Ready
**Build Date**: 2024-12-12
**Version**: 1.0.0