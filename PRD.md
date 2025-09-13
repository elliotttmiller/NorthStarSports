# NorthStarSports Wagering Studio - Product Requirements Document

A professional, universally adaptive sports betting platform that transforms the traditional sportsbook into an intelligent, synchronized studio environment.

**Experience Qualities**:
1. **Professional** - Clean, sophisticated interface that conveys trust and expertise in sports wagering
2. **Intuitive** - Complex betting functionality presented through clear, logical workflows and information hierarchy
3. **Responsive** - Seamlessly adapts between desktop three-panel studio and focused mobile experience

**Complexity Level**: Complex Application (advanced functionality, accounts)
- This is a full-featured sports betting platform requiring sophisticated state management, real-time data synchronization, multiple interactive panels, and complex betting workflows including parlays, round robins, and prop building.

## Essential Features

### Fixed Header Navbar (Desktop)
- **Functionality**: Persistent top navigation with panel toggles, branding, and quick actions
- **Purpose**: Provides consistent access to core controls and visual orientation
- **Trigger**: Always visible on desktop; panel toggle buttons control side panel visibility
- **Progression**: Toggle interaction → Smooth panel animation → Layout reflow → Focus state indication
- **Success criteria**: Smooth 300ms animations with proper state persistence

### Dynamic Panel System
- **Functionality**: Collapsible left and right panels with smooth animations and state persistence
- **Purpose**: Maximizes workspace flexibility and allows focus modes
- **Trigger**: Header toggle buttons or keyboard shortcuts (⌘[ / ⌘])
- **Progression**: Toggle → Animation → Layout adjustment → State save → Visual feedback
- **Success criteria**: Buttery smooth transitions with proper visual hierarchy and keyboard accessibility

### Left Panel - Sports Library Navigation
- **Functionality**: Hierarchical sports and league navigation with favorites system
- **Purpose**: Quick access to all available betting markets organized by sport and league
- **Trigger**: User clicks on sport categories or uses favorites toggle
- **Progression**: Sport selection → League expansion → Game lines display in center panel
- **Success criteria**: Navigation updates center panel content and maintains selection state

### Center Panel - Dynamic Workspace
- **Functionality**: Context-aware main content area displaying game lines or prop builder
- **Purpose**: Primary workspace for viewing odds, building bets, and managing complex wagering scenarios
- **Trigger**: Navigation changes or mode switching
- **Progression**: Content loads → User interactions → Bet selections → Add to bet slip
- **Success criteria**: Smooth content transitions and immediate bet slip updates

### Right Panel - Action Hub
- **Functionality**: Persistent bet slip and open bets management with advanced betting options
- **Purpose**: Centralized location for bet review, placement, and tracking
- **Trigger**: Bet additions or tab switching
- **Progression**: Bet review → Amount entry → Placement confirmation → Open bets tracking
- **Success criteria**: Real-time synchronization across all panels

### Mobile Responsive Transformation
- **Functionality**: Adaptive layout switching with overlay navigation
- **Purpose**: Optimized mobile experience without losing desktop functionality
- **Trigger**: Viewport size changes
- **Progression**: Desktop layout → Mobile detection → Layout transformation → Touch-optimized interactions
- **Success criteria**: Seamless responsive behavior with no functionality loss

## Edge Case Handling

- **Empty States**: Graceful handling when no games, bets, or favorites are present
- **Network Issues**: Skeleton loaders and retry mechanisms for data fetching
- **Bet Validation**: Real-time validation of bet amounts and combinations
- **State Persistence**: Maintaining bet slip across page refreshes and navigation
- **Responsive Breakpoints**: Smooth transitions between layout modes

## Design Direction
The interface should embody professional sophistication with a monochromatic slate aesthetic, similar to ChatGPT's clean, focused design language that prioritizes content over decorative elements while maintaining visual elegance.

## Color Selection
**Monochromatic (Grayscale with minimal accent)**
- Creates a professional, distraction-free environment that lets betting data and odds take center stage while providing subtle visual hierarchy through carefully calibrated neutral tones.

- **Primary Color**: `oklch(0.205 0 0)` - Deep charcoal for primary actions and high-contrast elements
- **Secondary Colors**: `oklch(0.97 0 0)` - Light gray for secondary actions and backgrounds  
- **Accent Color**: `oklch(0.646 0.222 41.116)` - Warm amber for success states and positive betting indicators
- **Foreground/Background Pairings**: 
  - Background (Pure White `oklch(1 0 0)`): Deep charcoal text (`oklch(0.205 0 0)`) - Ratio 21:1 ✓
  - Card (Pure White `oklch(1 0 0)`): Deep charcoal text (`oklch(0.205 0 0)`) - Ratio 21:1 ✓
  - Primary (Deep Charcoal `oklch(0.205 0 0)`): White text (`oklch(0.985 0 0)`) - Ratio 19.2:1 ✓
  - Secondary (Light Gray `oklch(0.97 0 0)`): Deep charcoal text (`oklch(0.205 0 0)`) - Ratio 18.1:1 ✓
  - Accent (Warm Amber `oklch(0.646 0.222 41.116)`): White text (`oklch(1 0 0)`) - Ratio 5.1:1 ✓

## Font Selection
Clean, highly legible sans-serif typography that prioritizes data density and professional presentation while maintaining excellent readability across betting odds and financial information.

- **Typographic Hierarchy**:
  - H1 (Panel Headers): Inter Medium/20px/tight letter spacing
  - H2 (Section Titles): Inter Medium/16px/normal spacing  
  - H3 (Game Labels): Inter Regular/14px/normal spacing
  - Body (Odds/Data): Inter Regular/13px/tabular numbers
  - Caption (Timestamps): Inter Regular/11px/muted color

## Animations
Purposeful, professional animations that enhance usability without creating distractions, focusing on smooth state transitions and clear visual feedback for betting actions.

- **Purposeful Meaning**: Motion reinforces the studio concept with smooth panel transitions and confident micro-interactions that build trust in the betting process
- **Hierarchy of Movement**: Panel transitions are the primary focus, followed by bet slip updates, then subtle hover states on interactive elements

## Component Selection

- **Components**: 
  - Tabs (for bet slip modes and action hub sections)
  - Accordion (for sports navigation hierarchy)
  - Dialog (for bet confirmation and settings)
  - Card (for game displays and bet containers)
  - Button (for all betting actions with clear primary/secondary hierarchy)
  - Badge (for bet counts and status indicators)
  - Skeleton (for loading states in data-heavy sections)

- **Customizations**: 
  - Custom three-panel grid layout system
  - Enhanced bet slip component with parlay/round robin logic
  - Specialized odds display components with tabular formatting
  - Mobile overlay navigation system

- **States**: 
  - Buttons have subtle press animations and loading spinners for bet placement
  - Interactive odds change on hover with smooth color transitions
  - Active navigation items show clear selected state
  - Form inputs provide immediate validation feedback

- **Icon Selection**: 
  - Phosphor icons for their clean, consistent stroke weights
  - Star icons for favorites system
  - Plus/minus for bet builders
  - Navigation arrows for hierarchical browsing
  - Sports-specific icons for league identification

- **Spacing**: 
  - Consistent 16px base unit with 8px, 12px, 24px, and 32px variations
  - Dense information layout for betting data
  - Generous padding around interactive elements for touch targets

- **Mobile**: 
  - Stacked single-panel view with bottom navigation
  - Slide-in overlays for side navigation and bet slip
  - Touch-optimized button sizes (44px minimum)
  - Collapsible sections to manage content density