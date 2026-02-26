const User = require('../dbmodels/User');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    // pull name along with email/password from request body
    const { name, email, password } = req.body;

    try {
        // Create user (password will be hashed by User model pre-save hook)
        const user = await User.create({ name, email, password });
        
        res.status(201).json({ 
            token: generateToken(user._id), 
            user: { 
                id: user._id,
                name: user.name,            // include name in response
                email: user.email, 
                role: user.role 
            } 
        });
    } catch (err) { 
        // Handle duplicate email error (MongoDB Error Code 11000)
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(400).json({ message: err.message }); 
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user and explicitly select password (since select: false is in the model)
        const user = await User.findOne({ email }).select('+password');

        // 2. Check if user exists and password matches
        if (user && (await user.comparePassword(password))) {
            res.json({
                token: generateToken(user._id),
                user: { 
                    id: user._id, 
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            // Generic message for security
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error during login" });
    }
};