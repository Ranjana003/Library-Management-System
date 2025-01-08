import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../services/bookServices';
import classes from './bookpage.module.css';
import NotFound from '../../Components/NotFound/NotFound';


export default function BookPage() {
    const [book, setBook] = useState({});
    const { id } = useParams();

useEffect(() => {
    getById(id).then(setBook);
  }, [id]);
  return (
    <>
        {!book ? (
        <NotFound  message="Book Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${book.imageUrl}`}
            alt={book.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>Name: {book.name}</span>
              <span className={classes.name}>Author: {book.author}</span>
              <span className={classes.name}>Genre: {book.genre}</span>
              <span className={classes.name}>Publication Year:{book.publicationYear}</span>
              <span className={classes.name}>ISBN: {book.isbn}</span>
              </div>
              </div>
              </div>

            )}
    </>
  );
}