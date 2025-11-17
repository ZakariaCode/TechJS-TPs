

import { BookModel } from "./bookDb.js";
import { Status, Format } from "./enum.js";

export class Book {
    title: string;
    author: string;
    pages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        status: Status,
        price: number,
        pagesRead: number,
        format: Format,
        suggestedBy: string,
        finished: boolean = false
    ) {
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

    static async create(data: {
        title: string;
        author: string;
        pages: number;
        status: Status;
        price: number;
        pagesRead: number;
        format: Format;
        suggestedBy: string;
    }) {
        const saved = await BookModel.create(data);
        return saved;
    }

    static async getAll() {
        return await BookModel.find();
    }

    static async getById(id: string) {
        return await BookModel.findById(id);
    }


    static async update(id: string, data: Partial<Book>) {
        return await BookModel.findByIdAndUpdate(id, data, { new: true });
    }

    // DELETE
    static async delete(id: string) {
        return await BookModel.findByIdAndDelete(id);
    }
}
