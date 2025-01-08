import { useEffect, useState } from 'react';
import classes from './booksAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/bookServices';
import NotFound from '../../Components/NotFound/NotFound';
import Search from '../../Components/Search/Search';
import { toast } from 'react-toastify';
import Title from '../../Components/Title/Title';

export default function BooksAdminPage() {
  const [books, setBooks] = useState();
  const { searchTerm } = useParams();

  useEffect(() => {
    loadBooks();
  }, [searchTerm]);

  const loadBooks = async () => {
    const books = searchTerm ? await search(searchTerm) : await getAll();
    setBooks(books);
  };

  const BooksNotFound = () => {
    if (books && books.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/books" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };

  const deleteBook = async book => {
    const confirmed = window.confirm(`Delete book ${book.name}?`);
    if (!confirmed) return;

    await deleteById(book.id);
    toast.success(`"${book.name}" Has Been Removed!`);
    setBooks(books.filter(f => f.id !== book.id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage books" margin="1rem auto" />
        <Search
          searchRoute="/admin/books/"
          defaultRoute="/admin/books"
          margin="1rem 0"
          placeholder="Search books"
        />
        <Link to="/admin/addbook" className={classes.add_book}>
          Add book +
        </Link>
        <booksNotFound />
        {books &&
          books.map(book => (
            <div key={book.id} className={classes.list_item}>
              <img src={book.imageUrl} alt={book.name} />
              <Link to={'/book/' + book.id}>{book.name}</Link>
              <div className={classes.actions}>
                <Link to={'/admin/editbook/' + book.id}>Edit</Link>
                <Link onClick={() => deleteBook(book)}>Delete</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}