import Admin from '../models/admin.models.js';
import Student from '../models/student.models.js';

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const isAdminFound = await Admin.findOne({ email });
  
      if (!isAdminFound) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      const isPasswordCorrect = await isAdminFound.comparePassword(password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      const token = await isAdminFound.generateToken();
      // console.log('Generated Token:', token);
  
      // Set the token in a cookie with proper options
      res.cookie('token',token,{httpOnly:true,maxAge:1000*1000*24});
  
      res.status(200).json({ success: true, message: 'Login successful',token });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const profile = async(req,res) => {
    const token = req.user;

    try {
        const admin = await Admin.findById({_id:token._id}).select('-password');
        res.status(200).json({admin});
    } catch (error) {
        console.error('Error ',error.message);
    }
}

export const fetchStudentList = async(req,res) => {
  try {
    // find method fetches everything from that particular database
    const studentList = await Student.find().select('-password');
    
    if(studentList.length === 0){
      return res.status(200).json({success: true, message: 'No students'});
    }

    res.status(200).json({success: true,message: 'Students List',studentList});
  } catch (error) {
    console.error('Error ',error.message);
  }
}