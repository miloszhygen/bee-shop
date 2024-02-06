/*
    import { connectToDatabase } from "@/utils/connectToDatabase";

    const { client } = await connectToDatabase();
    const db = client.db(`${process.env.MONGODB_CLIENT_DB}`);

    const collection = db.collection(
      `${process.env.MONGODB_CLIENT_COLLECTION_TRANSACTIONS}`
    );

*/

import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        };
      })
      .catch((err) => {
        console.error("Failed to connect to the database", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.error("Failed to connect to the database", err);
    throw err;
  }

  return cached.conn;
}
