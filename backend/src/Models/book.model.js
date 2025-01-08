import { model, Schema } from 'mongoose';

const BookSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isbn: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const BookModel = model('book', BookSchema);