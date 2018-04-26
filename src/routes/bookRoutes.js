const express = require('express');
const bookService = require('../services/goodreadsService');
const bookController = require('../controllers/bookControllers');

const bookRouter = express.Router();

const router = (nav) => {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
};
module.exports = router;
