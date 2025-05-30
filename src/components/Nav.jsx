import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/dashboard">Dashboard</Link> |{' '}
      <Link to="/add-matcha">Add</Link> |{' '}
      <Link to="/search">Search</Link> |{' '}
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
