import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
  console.log(`MONGO CONNECTED: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
