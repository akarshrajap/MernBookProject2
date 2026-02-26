const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token;

    // 1. Check for the Token in the Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Attach User ID to the request object
            req.user = decoded;

            console.log("Middleware: Token verified. Moving to route...");
            
            // 4. CRITICAL: This must be called to move to your book controller
            next(); 
        } catch (error) {
            console.error("Middleware Error: Token failed verification", error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.warn("Middleware Warning: No token found in headers");
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};