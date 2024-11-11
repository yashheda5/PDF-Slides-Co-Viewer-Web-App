import connectToDb from "@/database";
import PdfModel from "@/models/Pdf";
import { NextResponse } from "next/server";

connectToDb();

export async function GET() {
  try {
    const pdf = await PdfModel.findOne().sort({ _id: -1 }).exec(); // Get the latest uploaded PDF
    if (!pdf) {
      return NextResponse.json({ message: "No PDF found." }, { status: 404 });
    }

    return new NextResponse(pdf.data, {
      headers: {
        "Content-Type": pdf.contentType,
        "Content-Disposition": `inline; filename="${pdf.filename}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return NextResponse.json({ message: "Failed to retrieve PDF", error: error.message }, { status: 500 });
  }
}
