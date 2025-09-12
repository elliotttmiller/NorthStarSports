# NorthStar Sports Design System

> **Complete Design System v1.0** - Professional visual identity and component specifications for the NorthStar Sports betting platform.

## 🎯 Project Overview

The NorthStar Sports Design System provides a comprehensive, mobile-first design foundation that ensures consistent, professional, and accessible user experiences across all devices. This system serves as the single source of truth for all development work on the platform.

## 📦 Repository Structure

```
📁 NorthStarSports/
├── 📄 design_system_v1.0.html      # Main design system documentation
├── 📄 design_system_v1.0.pdf       # Professional PDF style guide (1.4MB)
├── 📄 README.md                     # This file
│
├── 📁 components/                   # Component specifications & proofs
│   ├── proof_component_buttons.html
│   ├── proof_component_bet_card.html
│   ├── proof_component_form_input.html
│   ├── proof_color_palette.html
│   └── proof_typography_scale.html
│
├── 📁 mockups/                      # UI mockups & prototypes
│   ├── mockup_home.html
│   ├── mockup_my_bets_populated.html
│   ├── mockup_my_bets_empty.html
│   ├── mockup_bet_slip.html
│   ├── wireframes.html
│   └── interactive_prototype.html
│
├── 📁 proofs/                       # Visual verification screenshots
│   ├── PROOF_COLOR_PALETTE.png
│   ├── PROOF_TYPOGRAPHY_SCALE.png
│   ├── PROOF_COMPONENT_BUTTONS.png
│   ├── PROOF_COMPONENT_BET_CARD.png
│   ├── PROOF_COMPONENT_FORM_INPUT.png
│   ├── PROOF_HOME_DASHBOARD.png
│   ├── PROOF_MY_BETS_POPULATED.png
│   ├── PROOF_MY_BETS_EMPTY.png
│   ├── PROOF_BET_SLIP_MINIMIZED.png
│   ├── PROOF_BET_SLIP_MAXIMIZED.png
│   └── PROOF_USER_FLOW.png
│
└── 📁 docs/                         # Project documentation
    ├── redesign_blueprint.md
    ├── VERIFICATION_REPORT.md
    ├── verification_report.html
    └── user_flow_diagram.html
```

## 🎨 Design System Components

### Color Palette
- **Primary**: Blue variants (#0066CC, #3385D6, #004499) for CTAs and branding
- **Secondary**: Orange variants (#FF6B35, #FF8C5E, #CC4F1C) for accents
- **Neutral**: 8-step grayscale system for all text and surface needs
- **Status**: Success, error, and warning colors for betting outcomes
- **WCAG 2.1 AA Compliant**: All color combinations meet accessibility standards

### Typography System
- **Font Stack**: System fonts for optimal cross-platform performance
- **Hierarchy**: Complete scale from H1 (2.5rem) to Caption (0.75rem)
- **Mobile-First**: Rem-based sizing for accessibility and responsiveness

### Core Components

#### Button System
- **Variants**: Primary, Secondary, Destructive
- **States**: Default, Hover, Disabled
- **Specifications**: Consistent padding, border-radius, and hover effects

#### Bet Card Component
- **States**: Active, Won, Lost
- **Types**: Straight, Parlay, Teaser, Live betting
- **Mobile-Optimized**: Card-based layout replaces legacy table format

#### Form Input System
- **Types**: Text, Number, Email, Password, Textarea, Select
- **States**: Default, Focus, Error, Disabled
- **Accessibility**: Proper ARIA attributes and focus management

## 🚀 Getting Started

### Viewing the Design System
1. Open `design_system_v1.0.html` in a web browser for the complete interactive style guide
2. Reference `design_system_v1.0.pdf` for the professional printable version

### Using Components
Each component includes:
- Complete CSS specifications
- Usage guidelines
- State variations
- Accessibility notes
- Visual examples

### Mobile-First Implementation
All components are designed mobile-first (375px viewport) and scale up to tablet and desktop breakpoints.

## 📱 Platform Focus

**Primary Target**: Mobile browsers (iOS Safari, Android Chrome)
**Viewport**: 375px base width with responsive scaling
**Experience**: Touch-optimized betting interface for sports wagering

## 🔧 Technical Specifications

### CSS Architecture
- CSS Custom Properties for consistent theming
- Rem-based sizing for accessibility
- Mobile-first media queries
- Component-based organization

### Accessibility Standards
- WCAG 2.1 AA compliance
- Proper focus management
- Color contrast ratios ≥ 4.5:1
- Screen reader compatible markup

### Browser Support
- iOS Safari 14+
- Android Chrome 90+
- Desktop fallback support

## 📋 Development Guidelines

### Naming Conventions
- **Brand Name**: "NorthStar Sports" (full)
- **Short Form**: "NSS" (logos, file names)
- **Classes**: BEM methodology recommended
- **Files**: kebab-case naming

### Component Usage
1. Reference design system specifications
2. Implement mobile-first responsive design
3. Include all interaction states
4. Test accessibility compliance
5. Validate against provided proofs

## 🎯 Key Features Implemented

### User Experience
- **Modern Bet Slip**: Progressive enhancement from minimized to maximized states
- **Unified My Bets**: Combined pending and history with tab-based navigation
- **Live Game Carousels**: Horizontal scrolling for active and upcoming games
- **Touch-Optimized**: All interactions designed for mobile touch interfaces

### Visual Design
- **Professional Aesthetic**: Clean, modern design suitable for financial applications
- **Trust-Building**: Conservative color palette and typography choices
- **Status Clarity**: Clear visual indicators for bet states (won, lost, pending)

## 📊 Project Status

✅ **Phase 1 Complete**: Color palette and typography system established
✅ **Phase 2 Complete**: Core component specifications defined  
✅ **Phase 3 Complete**: Mockups and user flow documentation
✅ **Phase 4 Complete**: Comprehensive design system compilation

**Current State**: Ready for development team implementation
**Next Steps**: High-fidelity component development using these specifications

## 💡 Usage Notes

- All components follow the established design system specifications
- No one-off styles should be created - everything derives from this system
- Mobile-first approach is mandatory for all implementations
- Accessibility requirements are non-negotiable

## 📞 Support

This design system serves as the definitive reference for all NorthStar Sports platform development. All styling decisions should trace back to these specifications to maintain visual consistency and professional quality across the entire user experience.

---

*NorthStar Sports Design System v1.0 | December 2024 | Complete & Ready for Implementation*