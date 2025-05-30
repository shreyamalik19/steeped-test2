import React from 'react';
import { auth } from '../firebase';

export default function Profile() {
  const user = auth.currentUser;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile</h2>
      <p>Email: {user?.email}</p>
      <p>Username: (coming soon)</p>
      <button onClick={() => auth.signOut()}>Log Out</button>
    </div>
  );
}
