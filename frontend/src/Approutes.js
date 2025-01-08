import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import BookPage from './Pages/Book/BookPage';
import LoginPage from './Pages/Login/LoginPage';
import AuthRoute from './Components/AuthRoute/AuthRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import BooksAdminPage from './Pages/BooksAdmin/BooksAdminPage';
import AdminRoute from './Components/AdminRoute/AdminRoute';
import BookEditPage from './Pages/BookEdit/BookEditPage';


export default function Approutes() {
  return (
   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/search/:searchTerm" element={<HomePage />} />
     <Route path="/book/:id" element={<BookPage />} />
     <Route path="/login" element={<LoginPage />} />
     <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
     <Route
        path="/admin/Books/:searchTerm?"
        element={
          <AdminRoute>
            <BooksAdminPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/addBook"
        element={
          <AdminRoute>
            <BookEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editBook/:bookId"
        element={
          <AdminRoute>
            <BookEditPage />
          </AdminRoute>
        }
      />
      
    </Routes>
  );
}
     
  