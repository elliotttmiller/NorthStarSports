// Create demo user via API endpoints
import http from 'http';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`${method} ${path} - Status: ${res.statusCode}`);
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function createDemoUser() {
  try {
    console.log('🚀 Creating demo user via API...');
    
    // Create demo user
    const demoUser = {
      id: 'demo',
      username: 'demo',
      email: 'demo@example.com',
      balance: 1000,
      createdAt: new Date().toISOString()
    };
    
    const userResult = await makeRequest('/api/v1/redis/user/demo', 'POST', demoUser);
    console.log('👤 Demo user created:', userResult);
    
    // Initialize empty bets array
    const betsResult = await makeRequest('/api/v1/redis/bets/demo', 'POST', []);
    console.log('📊 Empty bets array initialized:', betsResult);
    
    console.log('✅ Demo user setup complete!');
    
  } catch (error) {
    console.error('❌ Error creating demo user:', error.message);
  }
}

createDemoUser();
