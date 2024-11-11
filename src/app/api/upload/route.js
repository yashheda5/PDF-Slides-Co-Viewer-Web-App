import connectToDb from "@/database";
import PdfModel from "@/models/Pdf";  // Import the Pdf model
import { NextResponse } from "next/server";

// Connect to the database
connectToDb();

export async function POST(req) {
    try {
        const formData = await req.formData();
        const pdfFile = formData.get("pdf");

        // Ensure a file is uploaded and it is of type PDF
        if (!pdfFile || pdfFile.type !== "application/pdf") {
            return NextResponse.json({ message: "Invalid file type. Please upload a PDF." }, { status: 400 });
        }

        // Save file to MongoDB
        const pdf = new PdfModel({
            filename: pdfFile.name,
            contentType: pdfFile.type,
            data: Buffer.from(await pdfFile.arrayBuffer()),
        });

        await pdf.save();
        return NextResponse.json({ message: "PDF uploaded successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.json({ message: "Failed to upload PDF", error: error.message }, { status: 500 });
    }
}
