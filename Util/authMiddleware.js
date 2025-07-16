const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Rappa_rappa';

const validateJWT = (req,res,next) => {
    try {

        const authHeader = req.headers.authorization; // Get the authorization header from the request
        // Check if the header exists and starts with 'DSV '
        if(!authHeader || !authHeader.startsWith('DSV ')){
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[1];  

        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded;
        next();

    } catch (error) {

        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        
    }
}


module.exports = validateJWT