import mongoose from "mongoose";

const dbConnect = async () => {
    const mongoUri = "mongodb+srv://tanmay:tanmay1701@cluster0.qbrvhfo.mongodb.net/sleepTrackerDB?retryWrites=true&w=majority";

    try {
        const connect = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;
