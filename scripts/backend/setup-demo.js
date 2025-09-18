const redis = require("redis");

async function clearAndSetupDemo() {
  try {
    const client = redis.createClient({
      password: "7RZU6JTT3ZHi6qh3GE0U87kWQG5GHbAL",
      socket: {
        host: "redis-12609.c261.us-east-1-4.ec2.redns.redis-cloud.com",
        port: 12609,
      },
    });

    await client.connect();
    console.log("✅ Connected to Redis");

    // Clear potentially corrupted keys
    await client.del("betslip:demo:history");
    console.log("🗑️  Cleared corrupted betslip history");

    // Create demo user
    const demoUser = {
      id: "demo",
      username: "demo",
      email: "demo@example.com",
      balance: 1000,
      createdAt: new Date().toISOString(),
    };
    await client.set("user:demo", JSON.stringify(demoUser));
    console.log("👤 Created demo user");

    // Initialize empty arrays for demo data
    await client.set("bets:demo", JSON.stringify([]));
    await client.set("betslip:demo:history", JSON.stringify([]));
    console.log("📊 Initialized demo data arrays");

    // Check existing active betslip
    const activeBetslip = await client.get("betslip:demo:active");
    console.log("🎯 Active betslip:", activeBetslip ? "exists" : "none");

    await client.disconnect();
    console.log("✅ Setup complete");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

clearAndSetupDemo();
