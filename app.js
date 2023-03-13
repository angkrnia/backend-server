const express = require('express');
const cors = require('cors');

const { SuperController, BooksController } = require('./controllers');
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
app.get('/content/data', SuperController.getContent);
app.get('/content/data/:id', SuperController.getContentDetail);

// ROUTE BOOKS TANPA LOGIN
app.get('/books', BooksController.getBooks);
app.get('/books/:id', BooksController.getBooksDetail);

app.use(authentication);

// ROUTE BOOKS LOGIN
app.post('/books/create', authorization, BooksController.createBooks);
app.put('/books/:id/edit', authorization, BooksController.putBook);
app.delete('/books/:id', authorization, BooksController.deleteBook);

app.post('/content/create', SuperController.createContent);
app.put('/content/update/:id', authorization, SuperController.putContent);
app.delete('/content/delete/:id', authorization, SuperController.deleteContent);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`This app is listening on port ${port} - Kawah Edukasi`);
});
