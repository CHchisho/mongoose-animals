import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL as string);
    console.log('DB connected successfully');
    return connection;
  } catch (error) {
    console.error('Connection to db failed: ', (error as Error).message);
    throw error;
  }
};

export default mongoConnect;
