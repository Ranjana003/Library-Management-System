import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';
export default function Search() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? '');
  }, [searchTerm]);

  const search = async () => {
    if (term) {
      navigate(`/search/${term}`);  // This ensures the URL is like '/search/k'
    } else {
      navigate('/');  // If no search term, reset to the homepage
    }
  };
  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Search Books!"
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && search()}
        value={term}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}