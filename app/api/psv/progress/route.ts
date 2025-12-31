import { NextRequest, NextResponse } from "next/server";

/**
 * PSV Quest Progress API
 * 
 * Stub for future database integration.
 * Currently, progress is stored client-side in localStorage.
 * This route provides endpoints for when server-side storage is needed.
 */

export async function GET(_request: NextRequest) {
  // Stub: In future, fetch user progress from database
  return NextResponse.json({
    message: "Progress API stub - currently using localStorage",
    implementation: "client-side",
    endpoints: {
      GET: "Fetch user progress (stub)",
      POST: "Save user progress (stub)",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Stub: In future, save progress to database
    // For now, just acknowledge the request
    return NextResponse.json({
      success: true,
      message: "Progress save acknowledged (stub - using localStorage)",
      received: {
        timestamp: new Date().toISOString(),
        dataSize: JSON.stringify(body).length,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
