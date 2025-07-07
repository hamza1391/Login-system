import mongoose from "mongoose";

export const database = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected to MongoDB", connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
