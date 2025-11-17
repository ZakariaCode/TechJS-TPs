import mongoose, { Schema } from "mongoose";
import { Status, Format } from "./enum.js";
const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
    price: { type: Number, default: 0 },
    pagesRead: { type: Number, default: 0 },
    format: { type: String, enum: Object.values(Format), required: true },
    suggestedBy: { type: String, default: "" },
    finished: { type: Boolean, default: false }
});
BookSchema.pre("save", function (next) {
    if (this.pagesRead === this.pages) {
        this.finished = true;
    }
    next();
});
export const BookModel = mongoose.model("Book", BookSchema);
