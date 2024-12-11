import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const studentSchema = new mongoose.Schema(
  {
    fullname:{
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
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
    scores: [{
      score: {
        type: Number,
        default: 0
      }
    }],
    answers: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      },
      selectedAnswer: {
        type: String,
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

studentSchema.pre('save', async function (next) {

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
  }
}

const Student = mongoose.model('Student', studentSchema);

export default Student;