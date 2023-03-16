const { Books } = require('../models');
const { nanoid } = require('nanoid');

class BooksController {
    static async getBooks(req, res, next) {
        try {
            const books = await Books.findAll();
            if (books?.length > 0) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        books,
                    },
                });
            } else {
                throw {
                    message: 'Belum ada buku',
                };
            }
        } catch (error) {
            next(error);
        }
    }

    static async getBooksDetail(req, res, next) {
        try {
            let id = req.params.id;
            const book = await Books.findOne({
                where: {
                    id,
                },
            });
            if (book) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        book,
                    },
                });
            } else {
                res.status(404).send({
                    status: 'not found',
                    message: `Book with id ${id} not found.`,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async createBooks(req, res, next) {
        try {
            const {
                title,
                author,
                publisher,
                year,
                isbn,
                language,
                page,
                length,
                weight,
                width,
                cover,
                description,
                category,
                rating,
            } = req.body;
            await Books.create({
                id: `book-${nanoid(6)}`,
                title,
                author,
                publisher,
                year,
                isbn,
                language,
                page,
                length,
                weight,
                width,
                cover,
                description,
                category,
                rating,
            });
            res.status(201).json({
                message: 'Success Create',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async putBook(req, res, next) {
        let id = req.params.id;
        try {
            const book = await Books.findByPk(id);
            if (book) {
                const {
                    title,
                    author,
                    publisher,
                    year,
                    isbn,
                    language,
                    page,
                    length,
                    weight,
                    width,
                    cover,
                    description,
                    category,
                    rating,
                    is_borrowed
                } = req.body;
                await Books.update(
                    {
                        title,
                        author,
                        publisher,
                        year,
                        isbn,
                        language,
                        page,
                        length,
                        weight,
                        width,
                        cover,
                        description,
                        category,
                        rating,
                        is_borrowed
                    },
                    {
                        where: {
                            id,
                        },
                    }
                );
                res.status(200).json({
                    message: 'Success Put',
                });
            } else {
                res.status(404).send({
                    status: 'not found',
                    message: `Book with id ${id} not found.`,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteBook(req, res, next) {
        let id = req.params.id;
        try {
            const book = await Books.findByPk(id);
            if (book) {
                await Books.destroy({
                    where: {
                        id,
                    },
                });
                res.status(200).json({
                    message: 'Success Delete',
                });
            } else {
                res.status(404).send({
                    status: 'not found',
                    message: `Book with id ${id} not found.`,
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BooksController;
