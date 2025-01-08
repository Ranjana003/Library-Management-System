import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import classes from './dashboard.module.css';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter(item => user.isAdmin || !item.forAdmin)
          .map(item => (
            <Link
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              <img src={item.imageUrl} alt={item.title} />
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}
const allItems = [
  
  {
    title: 'Books',
    imageUrl: '/icons/book.svg',
    url: '/admin/books',
    forAdmin: true,
    bgColor: '#deb887',
    color: 'black',
  },
];