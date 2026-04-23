import clientPromise from "../../../../lib/mongodb"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const id = parseInt(params.id)

  const client = await clientPromise
  const db = client.db("todo_db")

  const updateDoc: Record<string, unknown> = {}

  if (body.title !== undefined || body.Title !== undefined) {
    updateDoc.Title = body.title ?? body.Title
  }
  if (body.description !== undefined || body.Description !== undefined) {
    updateDoc.Description = body.description ?? body.Description
  }
  if (body.completed !== undefined || body.Completed !== undefined) {
    updateDoc.Completed = body.completed ?? body.Completed
  }

  await db.collection("tasks").updateOne(
    { $or: [{ Id: id }, { id }] },
    { $set: updateDoc }
  )

  return NextResponse.json({ ok: true })
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)

  const client = await clientPromise
  const db = client.db("todo_db")

  await db.collection("tasks").deleteOne({ $or: [{ Id: id }, { id }] })

  return NextResponse.json({ ok: true })
}
