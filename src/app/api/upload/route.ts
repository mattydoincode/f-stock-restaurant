import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Upload API — not yet implemented" },
    { status: 501 }
  );
}
