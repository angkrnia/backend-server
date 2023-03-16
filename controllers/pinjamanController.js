const { Books, Pinjaman, User } = require('../models');
const { nanoid } = require('nanoid');

class PinjamanController {
    static async getAllPinjaman(req, res, next) {
        try {
            const pinjaman = await Pinjaman.findAll({
                include: [
                    {
                        model: Books,
                        attributes: ['title'],
                    },
                    {
                        model: User,
                        attributes: ['fullname'],
                    },
                ],
            });
            if (pinjaman?.length > 0) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        pinjaman: pinjaman.map((pinjaman) => {
                            return {
                                id: pinjaman.id,
                                buku: pinjaman.Book.title,
                                peminjam: pinjaman.User.fullname,
                                tanggal_pinjam: pinjaman.tanggal_pinjam,
                                tanggal_kembali: pinjaman.tanggal_kembali,
                                lama_pinjam: Number(pinjaman.lama_pinjam),
                                denda: pinjaman.denda,
                                status: pinjaman.status,
                                createdAt: pinjaman.createdAt,
                                updatedAt: pinjaman.updatedAt,
                            };
                        }),
                    },
                });
            } else {
                res.status(404).send({
                    status: 'not found',
                    message: `Pinjaman not found.`,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getPinjamanByUserId(req, res, next) {
        try {
            const { id } = req.user;
            const pinjaman = await Pinjaman.findAll({
                where: {
                    UserId: id,
                },
                include: [
                    {
                        model: Books,
                        attributes: ['title'],
                    },
                    {
                        model: User,
                        attributes: ['fullname'],
                    },
                ],
            });
            if (pinjaman?.length > 0) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        pinjaman: pinjaman.map((pinjaman) => {
                            return {
                                id: pinjaman.id,
                                buku: pinjaman.Book.title,
                                peminjam: pinjaman.User.fullname,
                                tanggal_pinjam: pinjaman.tanggal_pinjam,
                                tanggal_kembali: pinjaman.tanggal_kembali,
                                lama_pinjam: Number(pinjaman.lama_pinjam),
                                denda: pinjaman.denda,
                                status: pinjaman.status,
                                createdAt: pinjaman.createdAt,
                                updatedAt: pinjaman.updatedAt,
                            };
                        }),
                    },
                });
            } else {
                res.status(404).send({
                    status: 'not found',
                    message: `Pinjaman not found.`,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getPinjamanById(req, res, next) {
        try {
            const { id } = req.params;
            const pinjaman = await Pinjaman.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: Books,
                        attributes: ['title'],
                    },
                    {
                        model: User,
                        attributes: ['fullname'],
                    },
                ],
            });
            if (pinjaman) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        pinjaman: {
                            id: pinjaman.id,
                            buku: pinjaman.Book.title,
                            peminjam: pinjaman.User.fullname,
                            tanggal_pinjam: pinjaman.tanggal_pinjam,
                            tanggal_kembali: pinjaman.tanggal_kembali,
                            lama_pinjam: Number(pinjaman.lama_pinjam),
                            denda: pinjaman.denda,
                            status: pinjaman.status,
                            createdAt: pinjaman.createdAt,
                            updatedAt: pinjaman.updatedAt,
                        },
                    },
                });
            } else {
                res.status(404).send({
                    status: 'not found',
                    message: `Pinjaman not found.`,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async createPinjaman(req, res, next) {
        try {
            const { id } = req.user;
            const { book_id, telepon, alamat, lama_pinjam } = req.body;
            const bookIsAvailable = await Books.findOne({
                where: {
                    id: book_id,
                    is_borrowed: false,
                },
            });
            if (!bookIsAvailable) {
                throw {
                    name: 'BookIsNotAvailable',
                };
            }
            await Pinjaman.create({
                id: nanoid(10),
                BookId: book_id,
                UserId: id,
                telepon,
                alamat,
                lama_pinjam,
                tanggal_pinjam: new Date(),
            });
            await Books.update(
                {
                    is_borrowed: true,
                },
                {
                    where: {
                        id: book_id,
                    },
                }
            );
            res.status(201).send({
                message: 'Buku berhasil dipinjam!',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async putPinjamanById(req, res, next) {
        try {
            const { id } = req.params;
            const { status, telepon, alamat, lama_pinjam } = req.body;
            const tanggal_kembali = new Date();
            const pinjaman = await Pinjaman.findOne({
                where: {
                    id,
                },
            });
            const selisih_hari = Math.ceil(
                (tanggal_kembali - pinjaman.tanggal_pinjam) /
                    (1000 * 60 * 60 * 24)
            );
            let denda = 0;
            if (selisih_hari > pinjaman.lama_pinjam) {
                denda = (selisih_hari - pinjaman.lama_pinjam) * 10000;
            }
            if (!pinjaman) {
                throw {
                    name: 'PinjamanNotFound',
                };
            }
            await Pinjaman.update(
                {
                    telepon,
                    alamat,
                    lama_pinjam,
                    status,
                    denda,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            if (status === 'Dikembalikan') {
                await Books.update(
                    {
                        is_borrowed: false,
                    },
                    {
                        where: {
                            id: pinjaman.BookId,
                        },
                    }
                );
            }
            res.status(200).send({
                message: 'Pinjaman berhasil diupdate!',
                denda,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deletePinjaman(req, res, next) {
        try {
            const { id } = req.params;
            const pinjaman = await Pinjaman.findOne({
                where: {
                    id,
                },
            });
            if (!pinjaman) {
                throw {
                    name: 'PinjamanNotFound',
                };
            }
            await Pinjaman.destroy({
                where: {
                    id,
                },
            });
						if(pinjaman.status !== 'Dikembalikan'){
							await Books.update(
									{
											is_borrowed: false,
									},
									{
											where: {
													id: pinjaman.BookId,
											},
									}
							);
						}
            res.status(200).send({
                message: 'Pinjaman berhasil dihapus!',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = PinjamanController;
