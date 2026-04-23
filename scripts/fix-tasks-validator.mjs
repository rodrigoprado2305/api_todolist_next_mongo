/**
 * Corrige o $jsonSchema da coleção `tasks`: com additionalProperties:false
 * é obrigatório declarar `_id`, senão todo insertOne falha (MongoDB adiciona _id).
 *
 * Uso: node --env-file=.env.local scripts/fix-tasks-validator.mjs
 */
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || process.env.MONGO_URI
if (!uri) throw new Error("Defina MONGODB_URI (ex.: node --env-file=.env.local ...)")

const client = new MongoClient(uri)
await client.connect()
const db = client.db("todo_db")

const validator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["Id", "Title", "Completed"],
    additionalProperties: false,
    properties: {
      _id: { bsonType: "objectId" },
      Id: { bsonType: "int" },
      Title: { bsonType: "string", maxLength: 200 },
      Description: { bsonType: ["string", "null"] },
      Completed: { bsonType: "bool" }
    }
  }
}

const r = await db.command({
  collMod: "tasks",
  validator,
  validationLevel: "strict",
  validationAction: "error"
})
console.log("collMod ok:", r.ok === 1)
await client.close()
