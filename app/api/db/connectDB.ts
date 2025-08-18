import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONG_URI as string);
        console.log('MongoDB connected: ${conn.connection.host}');

    } catch (erro: any) {
        console.log("Error connecting to MongoDB: ", erro.message);
        process.exit(1);
    }
};
