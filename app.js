const express = require('express');
const cors = require('cors');

const {
    SuperController,
    BooksController,
    PinjamanController,
} = require('./controllers');
const { authentication, authorization } = require('./helpers/middlewares');
const errorHandler = require('./helpers/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
    '/',
    express.urlencoded({
        extended: false,
    })
);

app.get('/', SuperController.welcome);
app.post('/login', SuperController.login);
app.post('/register', SuperController.register);

// ROUTE BOOKS TANPA LOGIN
app.get('/books', BooksController.getBooks);
app.get('/books/:id', BooksController.getBooksDetail);

app.use(authentication);

// ROUTE BOOKS LOGIN
app.post('/books/create', authorization, BooksController.createBooks);
app.put('/books/:id/edit', authorization, BooksController.putBook);
app.delete('/books/:id', authorization, BooksController.deleteBook);
app.get('/pinjaman', authorization, PinjamanController.getAllPinjaman);
app.put('/pinjaman/:id', authorization, PinjamanController.putPinjamanById);
app.delete('/pinjaman/:id', authorization, PinjamanController.deletePinjaman);

app.post('/pinjaman', PinjamanController.createPinjaman);
app.get('/pinjaman/:id', PinjamanController.getPinjamanById);
app.get('/pinjaman/user/detail', PinjamanController.getPinjamanByUserId);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`This app is listening on port ${port} - Kawah Edukasi`);
});
