async function errorHandler(err, req, res, next) {
    switch (err.name) {
        case `SequelizeValidationError`:
            res.status(400).json({ message: err.errors[0].message });
            break;
        case `SequelizeUniqueConstraintError`:
            res.status(400).json({ message: err.errors[0].message });
            break;
        case `Content Not Found`:
            res.status(404).json({ message: err.name });
            break;
        case `Invalid Credentials`:
            res.status(401).json({ message: err.name });
            break;
        case `Unauthorized Access`:
            res.status(401).json({ message: err.name });
            break;
        case `Forbidden Access`:
            res.status(403).json({ message: err.name });
            break;
        case 'TokenExpiredError':
            res.status(401).json({ message: `Token expired` });
            break;
        case 'Username already exists':
            res.status(400).json({ message: err.name });
            break;
        case 'BookIsNotAvailable':
            res.status(400).json({ message: 'Buku tidak bisa dipinjam' });
            break;
        case 'PinjamanNotFound':
            res.status(404).json({ message: 'Pinjaman tidak ditemukan' });
            break;
        default:
            res.status(500).json({ message: `Internal Server Error` });
            break;
    }
}

module.exports = errorHandler;
