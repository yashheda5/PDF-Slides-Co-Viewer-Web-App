import mongoose from 'mongoose';

// Define the schema for storing PDF metadata and data
const PdfSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer,
});

const PdfModel = mongoose.models.Pdf || mongoose.model('Pdf', PdfSchema);

export default PdfModel;
