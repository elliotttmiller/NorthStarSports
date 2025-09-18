# NorthStar Sports Development Guide

## 🚀 Quick Start

1. **Setup Environment:**

   ```powershell
   .\env-sync.ps1 -Action Generate
   ```

2. **Install Dependencies:**

   ```powershell
   .\dev-tools.ps1 -Action Install -Target All
   ```

3. **Start Development:**
   ```powershell
   python dev-start.py
   ```

## 🔧 Development Scripts

### Python Scripts

- `dev-start.py` - Enhanced development server orchestration
- `start.py` - Original simple startup script (legacy)

### PowerShell Scripts

- `dev-tools.ps1` - Comprehensive development utilities
- `env-sync.ps1` - Environment configuration management
- `test-all-endpoints.ps1` - API endpoint testing

## 📋 Available Commands

### Development Tools (`dev-tools.ps1`)

```powershell
# Build projects
.\dev-tools.ps1 -Action Build -Target All

# Run tests
.\dev-tools.ps1 -Action Test -Target All

# Clean build artifacts
.\dev-tools.ps1 -Action Clean -Target All

# Install dependencies
.\dev-tools.ps1 -Action Install -Target All

# Lint code
.\dev-tools.ps1 -Action Lint -Target All

# Check project status
.\dev-tools.ps1 -Action Status

# Create backup
.\dev-tools.ps1 -Action Backup

# Full reset (clean + install + build)
.\dev-tools.ps1 -Action Reset
```

### Environment Management (`env-sync.ps1`)

```powershell
# Sync environment files
.\env-sync.ps1 -Action Sync

# Validate configuration
.\env-sync.ps1 -Action Validate

# Generate new env files
.\env-sync.ps1 -Action Generate

# Backup current env files
.\env-sync.ps1 -Action Backup
```

### Enhanced Dev Server (`dev-start.py`)

```bash
# Start full stack with browser
python dev-start.py

# Start without browser
python dev-start.py --no-browser

# Start only backend
python dev-start.py --backend-only

# Start only frontend
python dev-start.py --frontend-only

# Run comprehensive tests
python dev-start.py --test

# Build both projects
python dev-start.py --build

# Clean build artifacts
python dev-start.py --clean

# Show status
python dev-start.py --status
```

## 🏗️ Project Structure

```
northstar-sports/
├── backend/                 # Node.js TypeScript API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utilities
│   ├── tests/               # Backend tests
│   └── package.json
├── frontend/                # React TypeScript SPA
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API integration
│   │   ├── hooks/           # Custom hooks
│   │   ├── context/         # React context
│   │   └── utils/           # Utilities
│   └── package.json
├── dev-start.py            # Enhanced orchestration
├── dev-tools.ps1           # Development utilities
├── env-sync.ps1            # Environment management
└── test-all-endpoints.ps1  # API testing
```

## 🔌 API Integration

The frontend includes a comprehensive API service (`frontend/src/services/apiService.ts`) with:

- **Centralized Configuration:** Environment-aware API settings
- **Type Safety:** Full TypeScript support for API calls
- **Error Handling:** Comprehensive error management with retries
- **Request Logging:** Development-friendly request/response logging
- **React Hooks:** `useApi()` hook for component integration

### Example Usage:

```typescript
import { ApiService, useApi } from '../services/apiService';

// In a React component
function UserList() {
  const { loading, error, executeRequest } = useApi();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const result = await executeRequest(() => ApiService.getUsers());
    if (result) setUsers(result);
  };

  useEffect(() => { loadUsers(); }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render users */}</div>;
}
```

## ⚙️ Environment Configuration

### Backend (.env)

```bash
NODE_ENV=development
PORT=4000
REDIS_HOST=redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com
REDIS_PORT=19041
REDIS_PASSWORD=your_redis_password
REDIS_USERNAME=your_redis_username
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5000
API_VERSION=v1
```

### Frontend (.env)

```bash
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_NAME="NorthStar Sports"
VITE_APP_VERSION=1.0.0
VITE_LOG_LEVEL=info
VITE_ENABLE_DEBUG=true
```

## 🧪 Testing

### Backend Tests

- Unit tests with Jest
- API endpoint testing with SuperTest
- Type checking with TypeScript compiler

### Frontend Tests

- Component tests with React Testing Library
- Unit tests with Jest
- Type checking with TypeScript compiler

### Integration Tests

- Comprehensive API endpoint testing
- Cross-browser compatibility (via debug configurations)

## 📊 Monitoring & Debugging

### VS Code Integration

- Workspace configured for multi-project development
- Debug configurations for backend, frontend, and full-stack
- Integrated terminal tasks for common operations
- Recommended extensions for optimal development experience

### Logging

- Structured logging with Pino (backend)
- Development-friendly console logging (frontend)
- Request/response logging for API calls
- Color-coded log levels for better visibility

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts:**

   ```powershell
   # Check what's using the ports
   netstat -ano | findstr :4000
   netstat -ano | findstr :5000

   # Kill processes if needed
   .\dev-tools.ps1 -Action Status
   ```

2. **Redis Connection Issues:**

   ```powershell
   # Validate environment
   .\env-sync.ps1 -Action Validate

   # Check Redis credentials in .env files
   ```

3. **Dependency Issues:**

   ```powershell
   # Full reset
   .\dev-tools.ps1 -Action Reset
   ```

4. **Type Errors:**
   ```powershell
   # Type check only
   .\dev-tools.ps1 -Action Lint -Target All
   ```

## 🔄 Git Workflow

The workspace is configured for efficient Git operations:

- Auto-fetch enabled
- Smart commit suggestions
- Organized commit staging

### Recommended Workflow:

1. Create feature branch
2. Make changes
3. Run tests: `.\dev-tools.ps1 -Action Test -Target All`
4. Check status: `.\dev-tools.ps1 -Action Status`
5. Commit and push
6. Create pull request

## 📚 Additional Resources

- **Backend Documentation:** `backend/README.md`
- **Frontend Documentation:** `frontend/README.md`
- **API Documentation:** Available at `http://localhost:4000/api/docs` when running
- **Redis Documentation:** `backend/REDIS_DATA_MODEL.md`
- **Security Guidelines:** `backend/SECURITY.md` and `frontend/SECURITY.md`

## 💡 Tips

1. **Use VS Code Workspace:** Open `northstar-sports.code-workspace` for the best experience
2. **Leverage Tasks:** Use Ctrl+Shift+P → "Tasks: Run Task" for quick operations
3. **Debug Full Stack:** Use the compound debug configuration for simultaneous debugging
4. **Monitor Performance:** API requests include timing information in development mode
5. **Environment Sync:** Run `.\env-sync.ps1 -Action Validate` regularly to ensure configuration consistency
