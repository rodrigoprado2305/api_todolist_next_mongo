import clientPromise from "../../../lib/mongodb"
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

  const lastTask = await db.collection("tasks").find().sort({ Id: -1 }).limit(1).next()
  const nextId = (lastTask?.Id ?? lastTask?.id ?? 0) + 1

  const newTask = {
    Id: nextId,
    Title: body.title ?? body.Title,
    Description: body.description ?? body.Description ?? "",
    Completed: body.completed ?? body.Completed ?? false
  }

  await db.collection("tasks").insertOne(newTask)

  return NextResponse.json({
    id: newTask.Id,
    title: newTask.Title,
    description: newTask.Description,
    completed: newTask.Completed
  })
}
