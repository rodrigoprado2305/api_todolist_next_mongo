import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI ?? process.env.MONGO_URI

if (!uri) {
  throw new Error("Missing MongoDB URI. Set MONGODB_URI or MONGO_URI in .env.local")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri)
  ;(global as any)._mongoClientPromise = client.connect()
}

clientPromise = (global as any)._mongoClientPromise

export default clientPromise
