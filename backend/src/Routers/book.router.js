import { Router } from "express";
import { BookModel } from '../Models/book.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';

const router= Router();

router.get(
  '/',
  handler(async (req, res) => {
    const books = await BookModel.find({});
    res.send(books);
  })
);

router.post(
  '/',
  admin,
  handler(async (req, res) => {
    const { name, author, genre, publicationYear, imageUrl, isbn } =
      req.body;
      const book = new BookModel({
        name,
        author,
        genre,
        publicationYear,
        imageUrl,
        isbn
      });
      await book.save();

      res.send(book);
    })
  );

  router.put(
    '/',
    admin,
    handler(async (req, res) => {
      const { name, author, genre, publicationYear, imageUrl, isbn } =
        req.body;

        await BookModel.updateOne(
          { _id: id },
          {
          name,
          author,
          genre,
          publicationYear,
          imageUrl,
          isbn
        });
        await book.save();
  
        res.send(book);
      })
    );
    router.delete(
      '/:bookId',
      admin,
      handler(async (req, res) => {
        const { bookId } = req.params;
        await FoodModel.deleteOne({ _id: bookId });
        res.send();
      })
    );
  








router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');
    const books = await BookModel.find({ name: { $regex: searchRegex } });
    res.send(books);
  })
);
router.get(
  '/:bookId',
  handler(async (req, res) => {
    const { bookId } = req.params;
    const book = await BookModel.findById(bookId);
    res.send(book);
  })
);

export default router;