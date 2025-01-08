import React from 'react';
import { Link } from 'react-router-dom';
import classes from './thumbnails.module.css';
 const Thumbnails =({ books }) => {
  console.log('Books in Thumbnails:', books);
  
  if (!Array.isArray(books)) {
    return <div>No books found!</div>;
  }

  return (
    <ul className={classes.list}>
      {books.map(book => (
        <li key={book.id}>
          <Link to={`/book/${book.id}`}>
            <img
              className={classes.image}
              src={`${book.imageUrl}`}
              alt={book.name}
            />

        <div className={classes.content}>
            <div className={classes.name}>
              {book.name}
            </div>
        
            <div className={classes.author}>
              {book.author} 
            </div>
       </div>
    </Link>
           
          
        </li>
      ))}
    </ul>
  );
};
export default Thumbnails;