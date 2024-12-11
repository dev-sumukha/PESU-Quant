import Student from '../models/student.models.js';
import Question from '../models/question.models.js';

export const register = async(req, res) => {
    const { fullname,username,email,password } = req.body;
    try {
        const student = await Student.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if(student){
            return res.status(400).json({ success: false, message: 'Student exists' });
        }

        const newStudent = await Student.create({ fullname,username,email,password });

        res.status(201).json({ success: true, message: 'Student registered', newStudent });
    } catch (error) {
        console.error('Error', error.message);
    }
}

export const login = async(req,res) => {
    // identifier can be username or email
    const { identifier, password } = req.body;

    try {
        const student = await Student.findOne({
            $or:[
                {email:identifier},
                {username:identifier}
            ]
        });

        if(!student){
            return res.status(400).json({ success: false, message: 'Student does not exists' });
        }

        const token = await student.generateToken();
        const isPasswordCorrect = await student.comparePassword(password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message: 'Unauthorised'});
        }

        res.cookie('token',token,{httpOnly:true,maxAge:1000*1000*24});

        res.status(200).json({ success: true, message: 'Student logged in',token});
    } catch (error) {
        console.error('Error ',error.message);
    }
}

export const profile = async(req,res) => {

}

export const quiz_question = async(req,res) => {
    try {
        const questionList = await Question.find().select('-correctAnswer');
        res.status(200).json({success: true,message:'Question List',questionList});
    } catch (error) {
        console.error('Error ',error.message);
    }
}

// pick the questionID and search for that question
// after finding the question compare the solution

const evaluateQuiz = async (studentSolutions) => {
    try {
      let score = 0;
  
      // Use for...of loop to handle async/await properly
      for (const solution of studentSolutions) {
        const checkQuestion = await Question.findById(solution.questionId);  // Assuming the key is questionId
  
        if (checkQuestion) {
          // Check if the student's selected answer is correct
          if (checkQuestion.correctAnswer === solution.selectedAnswer) {
            score += 1; // Increment score if the answer is correct
          }
        }
      }
  
      return score
    } catch (error) {
      console.error('Error', error.message);
    }
  };

export const handleQuizSubmit = async(req,res) => {
    
    const { studentId, answers } = req.body;
    try {
        const student = await Student.findById(studentId);
        const quizResult = await evaluateQuiz(answers);

        await student.scores.push({ score: quizResult });
        await student.save();

        res.status(200).json({success: true, message: 'Score updated',student});
    } catch (error) {
        console.error('Error ',error.message);
    }
}