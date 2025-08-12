db = db.getSiblingDB("authdb"); // Database name for Auth service

print("📥 Seeding users collection...");

db.createCollection("users");

db.users.insertMany([
  {
    username: "admin",
    password: "hashed_password_admin",
    email: "admin@example.com",
    role: "admin"
  },
  {
    username: "john_doe",
    password: "hashed_password_john",
    email: "john@example.com",
    role: "user"
  },
  {
    username: "jane_smith",
    password: "hashed_password_jane",
    email: "jane@example.com",
    role: "user"
  }
]);

print("✅ Users seeded successfully!");
