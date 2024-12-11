import jwt from 'jsonwebtoken';
import Admin from '../models/admin.models.js';

// export const authMiddleware = (req, res, next) => {
//   // Access token from cookies
//   const token = req.cookies.token; // Change 'token' to the name of your cookie if different

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized - No token provided' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded; // Add the decoded token payload to req.user
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error('Error verifying token:', error.message);
//     return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//   }
// }

export const authMiddleware = (req, res, next) => {
    // Access token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the token after "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Add the decoded token payload to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};


export const roleCheck = (roles)=>async(req,res,next)=>{
    // checking the user is authenticated by the the above middleware
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized - No user info',isAdmin: false });
    }

    try {
        const admin = await Admin.findById(req.user._id);
    
        // Check if admin exists
        if (!admin) {
          return res.status(404).json({ message: 'Admin not found' });
        }
    
        // Check if user has one of the required roles
        if (!roles.includes(admin.role)) {
          return res.status(403).json({ message: 'Forbidden - Insufficient permissions',isAdmin: false  });
        }
    
        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        console.error('Error fetching admin details:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
      }
}