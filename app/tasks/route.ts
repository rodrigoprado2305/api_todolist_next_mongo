import { Int32 } from "mongodb"
import clientPromise from "../../lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  const client = await clientPromise
  const db = client.db("todo_db")

  const tasks = await db.collection("tasks").find().toArray()
  const normalized = tasks.map((task: any) => ({
    id: task.Id ?? task.id,
    title: task.Title ?? task.title,
    description: task.Description ?? task.description ?? "",
    completed: task.Completed ?? task.completed ?? false
  }))

  return NextResponse.json(normalized)
}

export async function POST(req: Request) {
  const body = await req.json()

  const client = await clientPromise
  const db = client.db("todo_db")

  const idDocs = await db
    .collection("tasks")
    .find({}, { projection: { id: 1, Id: 1 } })
    .toArray()
  const nextId =
    idDocs.reduce((max, t: { id?: number; Id?: number }) => {
      return Math.max(max, t.Id ?? t.id ?? 0)
    }, 0) + 1

  const newTask = {
    Id: new Int32(nextId),
    Title: String(body.title ?? body.Title ?? ""),
    Description: body.description ?? body.Description ?? "",
    Completed: Boolean(body.completed ?? body.Completed ?? false)
  }

  await db.collection("tasks").insertOne(newTask)

  return NextResponse.json({
    id: nextId,
    title: newTask.Title,
    description: newTask.Description ?? "",
    completed: newTask.Completed
  })
}
