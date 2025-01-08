import { connect, set } from 'mongoose';
import { UserModel } from '../Models/user.model.js';
import { BookModel } from '../Models/book.model.js';
import { sample_users } from '../data.js';
import { sample_books } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);
export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedBooks();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};
async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }
  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
  console.log('Users seed is done!');
}
async function seedBooks() {
  const books = await BookModel.countDocuments();
  if (books > 0) {
    console.log('Books seed is already done!');
    return;
  }
  for (const book of sample_books) {
    book.imageUrl = `/books/${book.imageUrl}`;
    await BookModel.create(book);
  }
  console.log('Books seed Is Done!');
}