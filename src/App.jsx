import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddMatcha from './pages/AddMatcha';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Nav from './components/Nav';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-matcha" element={<AddMatcha />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
