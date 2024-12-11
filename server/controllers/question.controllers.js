import Question from '../models/question.models.js';
import Admin from '../models/admin.models.js';

export const addQuestion = async (req, res) => {
    const { question, options, correctAnswer } = req.body;
    // console.log(question, options, correctAnswer);

    try {
        console.log(question, options, correctAnswer);
        const newQuestion = await Question.create({ question, options, correctAnswer });
        console.log(newQuestion);
        
        const admin = await Admin.findById(req.user._id);
        admin.questions.push(newQuestion._id);
        await admin.save();

        res.status(201).json({ success: true, message: 'Question created', newQuestion });
    } catch (error) {
        console.error('Error adding question: ', error.message);
        return res.status(500).json({ success: false, message: 'Failed to add question' });
    }
};

export const deleteQuestion = async (req, res) => {
    const { id } = req.query; // Make sure you're passing 'id' in the query string
    try {
        const deleteQuestion = await Question.findByIdAndDelete(id);

        // Removing the id of the question from the admin's question array
        const admin = await Admin.findByIdAndUpdate(
            req.user._id, 
            { $pull: { questions: id } }, 
            { new: true }
        );

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        if (!deleteQuestion) {
            return res.status(400).json({ success: false, message: 'Question cannot be deleted' });
        }

        res.status(200).json({ success: true, message: 'Question deleted' });
    } catch (error) {
        console.error('Error deleting question: ', error.message);
        return res.status(500).json({ success: false, message: 'Failed to delete question' });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const questionList = await Question.find();
        res.status(200).json({ success: true, message: 'Question list', questionList });
    } catch (error) {
        console.error('Error fetching questions: ', error.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch questions' });
    }
};
