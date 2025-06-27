import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminInstance } from "@/lib/firebase";
import { VariablesModifiers } from "@/constants/attributes-and-defenses";

export async function GET() {
  try {
    const admin = getFirebaseAdminInstance();
    const db = admin.firestore();

    const docRef = db.collection("variables").doc("defenses");
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as VariablesModifiers;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching defenses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const admin = getFirebaseAdminInstance();
    const db = admin.firestore();

    const docRef = db.collection("variables").doc("defenses");
    await docRef.set(body, { merge: true });

    return NextResponse.json({
      success: true,
      message: "Defenses updated successfully",
    });
  } catch (error) {
    console.error("Error updating defenses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
