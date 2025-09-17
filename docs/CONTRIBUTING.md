# Contributing to NorthStar Sports

We welcome contributions to the NorthStar Sports project! This document provides guidelines for contributing to our codebase.

## 🤝 Code of Conduct

### Our Standards
- **Be respectful** and inclusive in all interactions
- **Be collaborative** and constructive in feedback
- **Be professional** in all communications
- **Focus on the code**, not the person

### Unacceptable Behavior
- Harassment, discrimination, or inappropriate conduct
- Offensive comments or personal attacks
- Publishing private information without consent
- Any conduct that would be inappropriate in a professional setting

## 🚀 Getting Started

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/NorthStarSports.git
   cd NorthStarSports
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/elliotttmiller/NorthStarSports.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   ```
5. **Set up environment variables**:
   ```bash
   cp backend/.env.example backend/.env
   # Configure your Redis credentials and other settings
   ```

### Running the Development Environment
```bash
# Start both frontend and backend
python scripts/dev-start.py

# Or start individually:
# Backend: cd backend && npm run dev
# Frontend: cd frontend && npm run dev
```

## 📋 Contribution Workflow

### 1. Create an Issue (Optional but Recommended)
Before starting work on a significant change:
- Check existing issues to avoid duplication
- Create a new issue describing the problem or feature
- Discuss the approach with maintainers
- Get approval for major changes before implementation

### 2. Create a Feature Branch
```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/add-user-authentication`
- `bugfix/fix-bet-calculation`
- `docs/update-api-documentation`
- `refactor/improve-game-service`

### 3. Make Your Changes
Follow our coding standards (see below) and:
- Write clear, concise commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure your code passes all checks

### 4. Test Your Changes
```bash
# Run all tests
npm run test:all

# Lint all code
npm run lint:all

# Type check TypeScript
npm run type-check:all

# Test individual components
cd backend && npm test
cd frontend && npm test
```

### 5. Commit Your Changes
Use conventional commit messages:
```bash
git add .
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve bet calculation rounding error"
git commit -m "docs: update API documentation for user endpoints"
git commit -m "refactor: improve game service error handling"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- Clear title and description
- Link to related issues
- Description of changes made
- Testing instructions
- Screenshots (if UI changes)

## 💻 Coding Standards

### General Guidelines
- **Write self-documenting code** with clear variable and function names
- **Follow existing patterns** and conventions in the codebase
- **Keep functions small** and focused on a single responsibility
- **Use TypeScript** for all new code
- **Write comprehensive tests** for new features

### TypeScript Style
```typescript
// ✅ Good: Clear interfaces and type annotations
interface UserProfile {
  id: string;
  username: string;
  email: string;
  balance: number;
  createdAt: Date;
}

const createUser = async (userData: CreateUserRequest): Promise<UserProfile> => {
  // Implementation
};

// ❌ Avoid: Any types and unclear naming
const doStuff = (data: any): any => {
  // Implementation
};
```

### React Component Style
```tsx
// ✅ Good: Functional components with TypeScript
interface GameCardProps {
  game: Game;
  onBetClick: (betType: BetType, selection: string) => void;
  isLoading?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  onBetClick, 
  isLoading = false 
}) => {
  // Component implementation
};

// ❌ Avoid: Class components and inline styles
export class GameCard extends React.Component {
  render() {
    return <div style={{ color: 'red' }}>...</div>;
  }
}
```

### CSS/Styling
- Use **TailwindCSS** classes instead of custom CSS when possible
- Follow **mobile-first** responsive design principles
- Use **CSS custom properties** for consistent theming
- Prefer **utility classes** over custom styles

```tsx
// ✅ Good: TailwindCSS utilities
<div className="flex items-center justify-between p-4 bg-card border rounded-lg">
  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
</div>

// ❌ Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px', backgroundColor: '#ffffff' }}>
  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
</div>
```

## 🧪 Testing Guidelines

### Unit Tests
Write unit tests for:
- Utility functions
- Service functions
- Custom hooks
- Complex components

```typescript
// Example test
import { formatOdds } from '../lib/formatters';

describe('formatOdds', () => {
  it('should format positive odds correctly', () => {
    expect(formatOdds(150)).toBe('+150');
  });

  it('should format negative odds correctly', () => {
    expect(formatOdds(-110)).toBe('-110');
  });
});
```

### Integration Tests
Test API endpoints and component interactions:

```typescript
// Backend API test
describe('POST /api/v1/user', () => {
  it('should create a new user with valid data', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'securepassword123'
    };

    const response = await request(app)
      .post('/api/v1/user')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.username).toBe(userData.username);
  });
});
```

### Frontend Component Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BetSlipContext } from '../context/BetSlipContext';
import { GameCard } from '../components/GameCard';

describe('GameCard', () => {
  it('should call onBetClick when bet button is clicked', () => {
    const mockOnBetClick = jest.fn();
    const mockGame = { /* game data */ };

    render(
      <BetSlipContext.Provider value={mockBetSlipValue}>
        <GameCard game={mockGame} onBetClick={mockOnBetClick} />
      </BetSlipContext.Provider>
    );

    const betButton = screen.getByText('Lakers -5.5');
    fireEvent.click(betButton);

    expect(mockOnBetClick).toHaveBeenCalledWith('spread', 'home');
  });
});
```

## 📝 Documentation

### Code Documentation
- Add **JSDoc comments** for public functions and complex logic
- Update **README files** when changing functionality
- Include **inline comments** for complex algorithms or business logic

```typescript
/**
 * Calculates the potential payout for a bet based on odds and amount
 * @param odds - American odds format (e.g., -110, +150)
 * @param amount - Bet amount in dollars
 * @returns Potential payout including original stake
 */
export const calculatePayout = (odds: number, amount: number): number => {
  // Complex calculation logic with inline comments
  if (odds < 0) {
    // Negative odds: risk |odds| to win 100
    return amount + (amount * 100 / Math.abs(odds));
  } else {
    // Positive odds: risk 100 to win odds
    return amount + (amount * odds / 100);
  }
};
```

### API Documentation
- Update `docs/API.md` when adding or changing endpoints
- Include request/response examples
- Document error codes and edge cases

## 🔍 Code Review Process

### For Contributors
- **Self-review** your code before submitting
- **Test thoroughly** on different devices/browsers
- **Write clear PR descriptions** with context and reasoning
- **Respond to feedback** constructively and promptly
- **Keep PRs focused** - one feature/fix per PR

### For Reviewers
- **Focus on code quality**, not personal preferences
- **Provide constructive feedback** with specific suggestions
- **Test the changes** when possible
- **Approve when ready** or request specific changes
- **Be respectful** and educational in comments

### Review Checklist
- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes without migration plan
- [ ] Performance impact is acceptable
- [ ] Security considerations are addressed

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.0.1): Bug fixes, backward compatible

### Release Workflow
1. **Feature freeze** for release candidate
2. **Testing period** with release candidate
3. **Bug fixes** only during testing period
4. **Create release** with changelog
5. **Deploy to production** after approval

## 🐛 Bug Reports

### Before Submitting
1. **Search existing issues** to avoid duplicates
2. **Reproduce the bug** consistently
3. **Test on multiple browsers/devices** if relevant

### Bug Report Template
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., Windows 10, macOS 12.0]
- Browser: [e.g., Chrome 96, Firefox 95]
- Node.js version: [e.g., 18.0.0]
- App version: [e.g., 1.2.3]

**Additional Context**
Screenshots, logs, or other context.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this solve? What's the use case?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Any alternative solutions you've considered.

**Additional Context**
Mockups, examples, or other context.
```

## ❓ Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check README files and docs/ directory
- **Code Comments**: Look for inline explanations in complex code

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project README acknowledgments

Thank you for contributing to NorthStar Sports! 🚀
