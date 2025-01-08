import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Thumbnails from '../../Components/Thumbnails/Thumbnails';
import { getAll,search } from '../../services/bookServices';
import Search from '../../Components/Search/Search';
import NotFound from '../../Components/NotFound/NotFound';

const initialState = { books: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'BOOKS_LOADED':
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { books } = state;
  const { searchTerm } = useParams();


  useEffect(() => {
    const loadBooks = searchTerm ? search(searchTerm) : getAll();
    loadBooks.then(books => {console.log('Books loaded:', books);
    dispatch({ type: 'BOOKS_LOADED', payload: books })});
  }, [searchTerm]);

  return (
    <>
      <Search />
      {books.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails books={books} />
    </>
  );
}
