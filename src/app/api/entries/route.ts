import { NextResponse } from "next/server";
import { Entry } from "@/types/Entry";
import { db } from "@/db";
import { coffeeTable } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET: fetch all entries
 */
export async function GET() {
  const entries = await db.select().from(coffeeTable);
  return NextResponse.json(entries);
}

/**
 * POST: create a new entry
 */

export async function POST(req: Request) {
  try {
    // Parse body
    const body = await req.json();

    // Build object matching your schema
    const user: typeof coffeeTable.$inferInsert = {
      verificationid: body.verificationid,
      department: body.department,
      quantity: body.quantity,
      cost: body.cost,
    };

    // Insert into DB
    const [inserted] = await db.insert(coffeeTable).values(user).returning();

    return NextResponse.json(
      { message: "Entry added", entry: inserted },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting entry:", error);
    return NextResponse.json(
      { error: "Failed to add entry" },
      { status: 500 }
    );
  }
}
/**
 * PUT: update an entry (by verificationid)
 */
export async function PUT(req: Request) {
  try {
    const data: Entry = await req.json();

    // Update the entry based on ID
    if (typeof data.id !== "number") {
      return NextResponse.json({ error: "Valid id required" }, { status: 400 });
    }

    const updated = await db
      .update(coffeeTable)
      .set({
        verificationid: data.verificationid,
        department: data.department,
        quantity: data.quantity,
        cost: data.cost,
      })
      .where(eq(coffeeTable.id, data.id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Entry updated",
      entry: updated[0],
    });
  } catch (error) {
    console.error("Error updating entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

// DELETE: remove an entry by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const deleted = await db
      .delete(coffeeTable)
      .where(eq(coffeeTable.id, Number(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Entry deleted",
      entry: deleted[0],
    });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}