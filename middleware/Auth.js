import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
         return res.status(401).json({ message: 'No token provided.' });
    }

    const tokenValue = token.split(' ')[1];
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
         if (err) {
              return res.status(401).json({ message: 'Failed to authenticate token.' });
         }
         req.user = decoded;
         next();
    });
}

export default authenticateToken;