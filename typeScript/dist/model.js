import { BookModel } from "./bookDb.js";
export class Book {
    constructor(title, author, pages, status, price, pagesRead, format, suggestedBy, finished = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.format = format;
        this.suggestedBy = suggestedBy;
        if (pagesRead > pages) {
            throw new Error("pagesRead cannot exceed total pages.");
        }
        this.pagesRead = pagesRead;
        this.finished = pagesRead === pages ? true : finished;
    }
    static async create(data) {
        const saved = await BookModel.create(data);
        return saved;
    }
    static async getAll() {
        return await BookModel.find();
    }
    static async getById(id) {
        return await BookModel.findById(id);
    }
    static async update(id, data) {
        return await BookModel.findByIdAndUpdate(id, data, { new: true });
    }
    // DELETE
    static async delete(id) {
        return await BookModel.findByIdAndDelete(id);
    }
}
