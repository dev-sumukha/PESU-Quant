//9901667316

import Admin from '../models/admin.models.js';
import Student from '../models/student.models.js';

export const userLogin = async(req,res) =>{
    const { email, password } = req.body;

    // first finding the admin
    try {
        const admin = await Admin.findOne({ email });

        if(admin){
            const isPasswordCorrect = await admin.comparePassword(password);

            if(!isPasswordCorrect){
                return res.status(400).json({success: false, message:'Invalid credentials'});
            }

            const token = await admin.generateToken();

            return res.status(200).json({success: true, message:'Admin Found',token});
        } else {
            // if admin is not found we will search on student
            const student = await Student.findOne({ email });

            if(student){
                const isPasswordCorrect = await student.comparePassword(password);
                
                if(!isPasswordCorrect){
                    return res.status(400).json({success: false, message:'Invalid credentials'});
                }

                const token = await student.generateToken();

                return res.status(200).json({success: true, message:'Student Found',token});
            } else {
                return res.status(400).json({success: false, message:'User not found'});
            }
        }
    } catch (error) {
        console.error('Error ',error.message);
    }
}

export const userProfile = async (req, res) => {
    const token = req.user;

    try {
        // Try to find an Admin by the token ID
        const admin = await Admin.findById(token._id).select('-password');

        if (admin) {
            return res.status(200).json({
                success: true,
                isAdmin: true,
                user: admin // Returning as 'user' to keep it generic
            });
        }

        // Try to find a Student by the token ID if Admin wasn't found
        const student = await Student.findById(token._id).select('-password');

        if (student) {
            return res.status(200).json({
                success: true,
                isAdmin: false,
                user: student // Keeping consistent naming
            });
        }

        // If neither Admin nor Student is found, return 404
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    } catch (error) {
        // Log the error and return a server error response
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
