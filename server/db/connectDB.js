import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        const res = await mongoose.connect(process.env.MONGOURI);
        console.log('Database connected successfully');
    } catch (e) {
        console.log(e);
        process.exit(1); // Exit process with failure
    }
}

