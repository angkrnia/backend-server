module.exports = (app) => {
		const { SuperController, BooksController } = require('../controllers');
		const { authentication, authorization } = require('../helpers/middlewares');
		const errorHandler = require('../helpers/errorHandler');

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
}