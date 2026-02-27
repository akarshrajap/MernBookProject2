require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 1. Imports
const bookroute = require("./routes/route"); 
const authRoutes = require('./routes/authRoute');
const { protect } = require('./middleware/authMiddleware');

// Log to verify middleware is loaded correctly
console.log("Middleware Check - protect is a:", typeof protect);

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI;

// 2. Load User Model - DOUBLE CHECK THIS PATH
// If your file is dbmodels/User.js, this is correct.
const User = require('./dbmodels/User'); 

// Middleware
// Robust CORS: allow multiple comma-separated FRONTEND_URL values, support '*',
// and allow localhost during development automatically.
const rawFrontends = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawFrontends.split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        // allow non-browser requests (tools, server-to-server)
        if (!origin) return callback(null, true);

        // allow wildcard
        if (allowedOrigins.includes('*') || allowedOrigins.includes('')) return callback(null, true);

        // exact match
        if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);

        // allow localhost in non-production (convenience)
        if (process.env.NODE_ENV !== 'production') {
            try {
                const url = new URL(origin);
                if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return callback(null, true);
            } catch (e) {}
        }

        // reject other origins
        return callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','Origin','Accept','X-Requested-With']
}));

// Friendly CORS error handler to return 403 instead of 500 when origin blocked
app.use((err, req, res, next) => {
    if (err && /CORS policy/.test(err.message)) {
        return res.status(403).json({ message: err.message });
    }
    return next(err);
});

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/books", protect, bookroute);

// basic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// 3. Seed Route with Better Error Logging
app.get('/api/create-admin', async (req, res) => {
    console.log("Step 1: Route hit");
    try {
        if (!User) {
            console.log("Error: User model is undefined!");
            return res.status(500).send("User model not loaded");
        }

        console.log("Step 2: Searching for admin...");
        const userExists = await User.findOne({ email: "admin@test.com" });
        
        if (userExists) {
            console.log("Result: Admin already exists");
            return res.send("Admin already exists!");
        }
        
        console.log("Step 3: Attempting to create user...");
        const user = await User.create({
            email: "admin@test.com",
            password: "password123"
        });
        
        console.log("Step 4: Success!");
        res.status(201).send("User created! Login with: admin@test.com / password123");
    } catch (err) {
        // THIS WILL PRINT THE EXACT REASON FOR THE 500 ERROR
        console.error("!!! CRASH ERROR !!!:", err.message);
        res.status(500).send("Crash detail: " + err.message);
    }
});

// Database Connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
      console.error("Database Connection Error:", err.message);
      process.exit(1); // Stop the server if DB fails
  });


app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
