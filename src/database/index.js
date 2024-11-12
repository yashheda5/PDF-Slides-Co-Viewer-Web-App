import mongoose from "mongoose";

const connectToDb = async () => {
    const url = 'mongodb+srv://yashheda5:w6zglh2bkLINKfKH@cluster0.fnnfy.mongodb.net/';  // Replace with your database name

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Adjust this value if needed
        });
        console.log('Database connection established');
    } catch (e) {
        console.error('Database connection error:', e);
    }
};

export default connectToDb;

// w6zglh2bkLINKfKH
//mongodb://localhost:27017/kalvium