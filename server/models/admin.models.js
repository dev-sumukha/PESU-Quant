import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'admin',
        },
        questions:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }]
    }, { timestamps: true }
);

adminSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const saltRound = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, saltRound);
        }

        next();
    } catch (error) {
        console.error('Error ',error.message);
    }
});

adminSchema.methods.generateToken = async function(){
    // the sign method creates the token
    try {
        return jwt.sign({_id: this._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
    } catch (error) {
        console.log(error);
    }
}

adminSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;