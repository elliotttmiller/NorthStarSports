# NorthStar Sports - Scripts Documentation

Utility scripts for development, testing, and deployment workflows.

## 📁 Scripts Directory Structure

```
scripts/
├── backend/              # Backend-specific scripts
│   ├── create-demo-user.js
│   ├── setup-demo.js
│   ├── test-express.js
│   └── test-all-endpoints.ps1
├── dev-start.py         # Development server orchestrator
├── start.py             # Legacy startup script
├── dev-tools.ps1        # PowerShell development utilities
└── env-sync.ps1         # Environment synchronization
```

## 🚀 Main Development Scripts

### dev-start.py - Development Orchestrator

**Primary development server management script**

```bash
# Start both frontend and backend with monitoring
python scripts/dev-start.py

# With custom configuration
python scripts/dev-start.py --frontend-port 3000 --backend-port 5000
```

**Features:**

- Health checks for Redis, backend, and frontend
- Process management with graceful shutdown
- Enhanced logging with timestamps and colors
- Environment validation
- Automatic browser opening
- Development utilities integration

**Options:**

- `--no-browser` - Skip automatic browser opening
- `--frontend-port PORT` - Custom frontend port (default: 5173)
- `--backend-port PORT` - Custom backend port (default: 4000)
- `--verbose` - Enable detailed logging
- `--redis-check` - Perform Redis connection test

### start.py - Legacy Startup Script

**Original project startup script (kept for compatibility)**

```bash
# Basic project startup
python scripts/start.py
```

**Features:**

- Simple backend and frontend startup
- Basic process management
- Environment validation
- Browser launching

## 🔧 PowerShell Utilities

### dev-tools.ps1 - Development Utilities

**Collection of PowerShell functions for development workflow**

```powershell
# Source the utilities
. .\scripts\dev-tools.ps1

# Available functions:
Start-DevEnvironment    # Start development servers
Stop-DevEnvironment     # Stop all development processes
Restart-Backend         # Restart backend only
Restart-Frontend        # Restart frontend only
Test-AllEndpoints       # Test all API endpoints
Clean-NodeModules       # Clean and reinstall dependencies
Build-All               # Build both frontend and backend
Deploy-Local            # Local deployment test
```

### env-sync.ps1 - Environment Synchronization

**Synchronize environment variables between development and production**

```powershell
# Sync environment files
.\scripts\env-sync.ps1

# Options:
.\scripts\env-sync.ps1 -Source "backend\.env.example" -Target "backend\.env"
.\scripts\env-sync.ps1 -Validate  # Validate existing env files
```

**Features:**

- Environment file validation
- Missing variable detection
- Secure credential prompting
- Backup creation before sync

## 🧪 Backend Testing Scripts

### test-express.js - Express Server Test

**Standalone Express server testing utility**

```bash
# Run Express server tests
node scripts/backend/test-express.js
```

**Tests:**

- Server startup and shutdown
- Route availability
- Middleware functionality
- Error handling
- Performance metrics

### test-all-endpoints.ps1 - API Endpoint Testing

**Comprehensive API testing script using PowerShell**

```powershell
# Test all endpoints
.\scripts\backend\test-all-endpoints.ps1

# Test specific endpoints
.\scripts\backend\test-all-endpoints.ps1 -Endpoints "user,games"

# With custom base URL
.\scripts\backend\test-all-endpoints.ps1 -BaseUrl "http://localhost:4000"
```

**Features:**

- User management endpoint tests
- Game and betting endpoint tests
- Key-value store endpoint tests
- Response validation
- Performance timing
- Error reporting

## 🎭 Demo and Setup Scripts

### create-demo-user.js - Demo User Creation

**Creates demo user data via API endpoints**

```bash
# Create demo user with default data
node scripts/backend/create-demo-user.js

# Create multiple demo users
node scripts/backend/create-demo-user.js --count 5

# With custom user data
node scripts/backend/create-demo-user.js --username "testuser" --balance 1000
```

**Options:**

- `--username USERNAME` - Custom username
- `--email EMAIL` - Custom email
- `--balance AMOUNT` - Initial balance
- `--count NUMBER` - Number of users to create

### setup-demo.js - Demo Environment Setup

**Sets up complete demo environment with sample data**

```bash
# Setup complete demo environment
node scripts/backend/setup-demo.js

# Reset and setup fresh demo
node scripts/backend/setup-demo.js --reset
```

**Setup includes:**

- Demo users with various balances
- Sample games and odds
- Mock betting history
- Test key-value data
- Redis data structure validation

## 📝 Script Usage Examples

### Daily Development Workflow

```bash
# 1. Start development environment
python scripts/dev-start.py

# 2. Run tests before making changes
.\scripts\backend\test-all-endpoints.ps1

# 3. Make your changes...

# 4. Test changes
npm run test:all

# 5. Setup demo data for testing
node scripts/backend/setup-demo.js

# 6. Validate environment
.\scripts\env-sync.ps1 -Validate
```

### Production Deployment Testing

```bash
# 1. Build applications
npm run build:all

# 2. Test production builds locally
.\scripts\dev-tools.ps1
Deploy-Local

# 3. Test all endpoints in production mode
.\scripts\backend\test-all-endpoints.ps1 -BaseUrl "http://localhost:4000"

# 4. Validate environment configuration
.\scripts\env-sync.ps1 -Validate
```

### Debugging and Troubleshooting

```bash
# Test Express server functionality
node scripts/backend/test-express.js

# Check specific API endpoints
.\scripts\backend\test-all-endpoints.ps1 -Endpoints "health,games"

# Reset demo data
node scripts/backend/setup-demo.js --reset

# Clean development environment
.\scripts\dev-tools.ps1
Clean-NodeModules
```

## ⚙️ Configuration

### Script Configuration Files

Scripts can be configured via environment variables or config files:

```bash
# .env configuration for scripts
SCRIPT_DEFAULT_BACKEND_PORT=4000
SCRIPT_DEFAULT_FRONTEND_PORT=5173
SCRIPT_BROWSER_COMMAND=chrome
SCRIPT_REDIS_TIMEOUT=5000
SCRIPT_API_TIMEOUT=30000
```

### PowerShell Execution Policy

Ensure PowerShell can execute scripts:

```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user (if needed)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🔍 Debugging Scripts

### Enable Debug Mode

```bash
# Python scripts with debug
python scripts/dev-start.py --verbose

# Node.js scripts with debug
DEBUG=* node scripts/backend/create-demo-user.js
```

### Common Issues and Solutions

#### PowerShell Script Issues

```powershell
# If script won't run due to execution policy
powershell -ExecutionPolicy Bypass -File scripts\dev-tools.ps1
```

#### Python Script Issues

```bash
# Ensure Python dependencies
pip install requests psutil colorama

# Use specific Python version
python3 scripts/dev-start.py
```

#### Node.js Script Issues

```bash
# Ensure in correct directory
cd backend && node ../scripts/backend/test-express.js

# Check Node.js version
node --version  # Should be 18+
```

## 📊 Script Performance Monitoring

### Logging and Metrics

All scripts include comprehensive logging:

- **Python scripts**: Color-coded console output with timestamps
- **PowerShell scripts**: Structured output with progress indicators
- **Node.js scripts**: JSON-formatted logs with performance metrics

### Log Files Location

```
logs/
├── dev-start.log        # Development orchestrator logs
├── script-execution.log # General script execution logs
└── api-tests.log        # API testing results
```

## 🤝 Contributing to Scripts

### Adding New Scripts

1. **Create script in appropriate directory**
2. **Follow existing naming conventions**
3. **Include comprehensive help/usage info**
4. **Add error handling and logging**
5. **Document in this README**

### Script Standards

```bash
# Include header comment with description
#!/usr/bin/env python3
"""
Script Name - Brief Description
Purpose and usage instructions
"""

# Include error handling
try:
    main_function()
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

# Include help option
if '--help' in sys.argv:
    print(__doc__)
    sys.exit(0)
```

## 📚 Additional Resources

- [Python subprocess documentation](https://docs.python.org/3/library/subprocess.html)
- [PowerShell scripting guide](https://docs.microsoft.com/en-us/powershell/)
- [Node.js child_process documentation](https://nodejs.org/api/child_process.html)
- [Cross-platform scripting best practices](https://docs.github.com/en/actions/using-workflows)

---

For questions about scripts or to report issues, please refer to the main project documentation or open an issue on GitHub.
