import mongoose from "mongoose";
import configKeys from "../../../config";
import { MongoMemoryServer } from "mongodb-memory-server";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(configKeys.DB_CLUSTER_URL, {
      dbName: configKeys.DB_NAME,
    });
    console.log(`Database connected successfully`.bg_green);
  } catch (error: any) {
    console.warn(`Primary Mongo connection failed, starting in-memory Mongo for local dev`.bg_yellow.black);
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri, { dbName: configKeys.DB_NAME || 'tutortrek' });
    console.log(`Connected to in-memory MongoDB at ${uri}`.bg_green);
  }
};
export default connectDB;
