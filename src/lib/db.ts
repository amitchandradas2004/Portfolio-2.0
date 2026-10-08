import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.DB_NAME || "portfolio";

let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  console.warn("MONGODB_URI environment variable is missing.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise && uri) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise || Promise.reject(new Error("No MONGODB_URI provided"));
} else {
  const client = new MongoClient(uri || "");
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db | null> {
  try {
    if (!uri) return null;
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return null;
  }
}
