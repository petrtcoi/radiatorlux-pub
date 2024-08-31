import mongoose from "mongoose";

// ------------ Types

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};
declare global {
  var mongoose: Cached;
}

// --------- Connect to the database

async function connectDb() {
  const MONGO_URI = process.env.MONGO_URI;

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then(async mongoose => {
      console.log("Db connected");

      // const db = mongoose.connection.db;
      // const serverStatus = await db.command({ serverStatus: 1 });
      // console.log("serverStatus:", serverStatus);

      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;
