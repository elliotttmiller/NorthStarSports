# Deployment Guide - NorthStar Sports

Comprehensive deployment guide for the NorthStar Sports platform.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
├─────────────────────────────────────────────────────────┤
│  Load Balancer (nginx/Cloudflare)                      │
│         │                        │                      │
│    Frontend App              Backend API                │
│    (Static Files)         (Node.js/Express)            │
│         │                        │                      │
│    CDN Storage              Redis Cloud                 │
│   (Images/Assets)         (Primary Database)           │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Deployment

### Using Docker (Recommended)
```bash
# Clone repository
git clone https://github.com/elliotttmiller/NorthStarSports.git
cd NorthStarSports

# Build and start all services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Manual Deployment
```bash
# Build both applications
npm run build:all

# Start backend
cd backend && npm start &

# Serve frontend
cd frontend && npm run preview &
```

## 📋 Prerequisites

### System Requirements
- **Server**: Linux (Ubuntu 20.04+ recommended)
- **CPU**: 2+ cores
- **RAM**: 4GB+ (8GB recommended)
- **Storage**: 20GB+ SSD
- **Network**: High-speed internet connection

### Required Services
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Redis Cloud** instance or self-hosted Redis
- **Reverse Proxy** (nginx recommended)
- **SSL Certificate** (Let's Encrypt recommended)

### Domain & DNS
- Domain name (e.g., `northstarsports.com`)
- DNS configured to point to your server
- Subdomain for API (e.g., `api.northstarsports.com`)

## 🔧 Environment Configuration

### Backend Environment (.env)
```bash
# Server Configuration
NODE_ENV=production
PORT=4000
HOST=0.0.0.0

# Redis Configuration
REDIS_HOST=your-redis-host.redns.redis-cloud.com
REDIS_PORT=12609
REDIS_PASSWORD=your-secure-redis-password

# Security
JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12

# API Configuration
API_VERSION=v1
API_BASE_URL=https://api.northstarsports.com
CORS_ORIGIN=https://northstarsports.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# External Services (when implemented)
ODDS_API_KEY=your-odds-api-key
PAYMENT_PROCESSOR_KEY=your-payment-key
```

### Frontend Environment (.env.production)
```bash
# API Configuration
VITE_API_URL=https://api.northstarsports.com
VITE_API_VERSION=v1

# Application Configuration
VITE_APP_NAME=NorthStar Sports
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SERVICE_WORKER=true

# External Services
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
VITE_SENTRY_DSN=https://your-sentry-dsn
```

## 🏭 Production Build

### Backend Build Process
```bash
cd backend

# Install production dependencies
npm ci --only=production

# Build TypeScript
npm run build

# Verify build
ls -la dist/
node dist/server.js --check
```

### Frontend Build Process
```bash
cd frontend

# Install dependencies
npm ci

# Build for production
npm run build

# Verify build
ls -la dist/
npm run preview
```

### Build Optimization
```bash
# Analyze bundle size
cd frontend && npm run build:analyze

# Check for unused dependencies
npx depcheck

# Audit dependencies
npm audit --audit-level high
```

## 🐳 Docker Deployment

### Production Docker Compose
Create `docker-compose.prod.yml`:
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/ssl/certs
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: production
    ports:
      - "4000:4000"
    env_file:
      - backend/.env
    depends_on:
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  redis_data:
```

### Docker Build Commands
```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f backend
```

## 🌐 Reverse Proxy Configuration

### Nginx Configuration
Create `/etc/nginx/sites-available/northstarsports`:
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name northstarsports.com www.northstarsports.com api.northstarsports.com;
    return 301 https://$server_name$request_uri;
}

# Frontend HTTPS
server {
    listen 443 ssl http2;
    server_name northstarsports.com www.northstarsports.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/northstarsports.com.crt;
    ssl_certificate_key /etc/ssl/private/northstarsports.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Serve frontend static files
    location / {
        root /var/www/northstarsports/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Handle client-side routing
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public";
    }
}

# Backend API HTTPS
server {
    listen 443 ssl http2;
    server_name api.northstarsports.com;

    # SSL Configuration (same as above)
    ssl_certificate /etc/ssl/certs/northstarsports.com.crt;
    ssl_certificate_key /etc/ssl/private/northstarsports.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Proxy to backend
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
}
```

### Enable Nginx Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/northstarsports /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## 🔒 SSL Certificate Setup

### Using Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d northstarsports.com -d www.northstarsports.com -d api.northstarsports.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Manual SSL Certificate
```bash
# Generate private key
openssl genrsa -out northstarsports.com.key 2048

# Generate certificate signing request
openssl req -new -key northstarsports.com.key -out northstarsports.com.csr

# Install certificate files
sudo cp northstarsports.com.crt /etc/ssl/certs/
sudo cp northstarsports.com.key /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/northstarsports.com.key
```

## 🎯 Application Server Setup

### PM2 Process Manager (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'northstar-backend',
      script: './dist/server.js',
      cwd: './backend',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      max_memory_restart: '1G'
    }
  ]
};
EOF

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

### Systemd Service (Alternative)
```bash
# Create service file
sudo tee /etc/systemd/system/northstar-backend.service << EOF
[Unit]
Description=NorthStar Sports Backend
After=network.target

[Service]
Type=simple
User=northstar
WorkingDirectory=/var/www/northstarsports/backend
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=4000

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl enable northstar-backend
sudo systemctl start northstar-backend
sudo systemctl status northstar-backend
```

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs northstar-backend

# Restart application
pm2 restart northstar-backend
```

### Log Rotation Setup
```bash
# Create logrotate configuration
sudo tee /etc/logrotate.d/northstar << EOF
/var/www/northstarsports/backend/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 northstar northstar
    postrotate
        pm2 reload northstar-backend
    endscript
}
EOF
```

### Health Checks
```bash
# Backend health check
curl -f http://localhost:4000/health

# Frontend health check
curl -f http://localhost/

# Redis health check
redis-cli -h localhost ping
```

## 🔐 Security Hardening

### Server Security
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Install fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

### Application Security
- Keep dependencies updated
- Use environment variables for secrets
- Enable HTTPS only
- Implement rate limiting
- Validate all input data
- Use security headers
- Regular security audits

## 📈 Performance Optimization

### Backend Optimization
```javascript
// Enable compression
app.use(compression());

// Optimize Redis connections
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000
});
```

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization and compression
- CDN for static assets
- Browser caching headers
- Minification and compression

### Database Optimization
```bash
# Redis optimization
redis-cli CONFIG SET maxmemory-policy allkeys-lru
redis-cli CONFIG SET maxmemory 2gb
redis-cli CONFIG REWRITE
```

## 🔄 Backup & Recovery

### Redis Backup
```bash
# Create backup script
cat > backup-redis.sh << EOF
#!/bin/bash
BACKUP_DIR="/var/backups/redis"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
redis-cli --rdb $BACKUP_DIR/dump_$DATE.rdb
find $BACKUP_DIR -name "dump_*.rdb" -mtime +7 -delete
EOF

chmod +x backup-redis.sh

# Schedule daily backups
echo "0 2 * * * /path/to/backup-redis.sh" | crontab -
```

### Application Backup
```bash
# Backup script
cat > backup-app.sh << EOF
#!/bin/bash
BACKUP_DIR="/var/backups/northstar"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/northstarsports
find $BACKUP_DIR -name "app_*.tar.gz" -mtime +14 -delete
EOF
```

## 🚨 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check logs
pm2 logs northstar-backend

# Check port availability
sudo netstat -tlnp | grep :4000

# Check environment variables
pm2 env northstar-backend
```

#### Frontend 404 Errors
```bash
# Check nginx configuration
sudo nginx -t

# Check file permissions
ls -la /var/www/northstarsports/frontend/dist/

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log
```

#### Redis Connection Issues
```bash
# Test Redis connection
redis-cli -h $REDIS_HOST -p $REDIS_PORT ping

# Check Redis logs
sudo tail -f /var/log/redis/redis-server.log
```

### Recovery Procedures

#### Backend Recovery
```bash
# Stop services
pm2 stop northstar-backend

# Restore from backup
tar -xzf /var/backups/northstar/app_YYYYMMDD_HHMMSS.tar.gz

# Restart services
pm2 start northstar-backend
```

#### Database Recovery
```bash
# Stop Redis
sudo systemctl stop redis

# Restore database
cp /var/backups/redis/dump_YYYYMMDD_HHMMSS.rdb /var/lib/redis/dump.rdb

# Start Redis
sudo systemctl start redis
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Code reviewed and tested
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] DNS records configured
- [ ] Backup systems in place

### Deployment
- [ ] Build applications
- [ ] Deploy to servers
- [ ] Configure reverse proxy
- [ ] Start services
- [ ] Verify health checks

### Post-Deployment
- [ ] Test all functionality
- [ ] Monitor performance
- [ ] Check error logs
- [ ] Verify backups
- [ ] Update documentation

## 🎉 Congratulations!

Your NorthStar Sports application is now deployed and ready for production use. Remember to:

- Monitor application health regularly
- Keep dependencies updated
- Maintain regular backups
- Review logs for issues
- Plan for scaling as needed

For ongoing support and updates, refer to the main project documentation or contact the development team.
