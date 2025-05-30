import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        username,
        createdAt: new Date()
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: "2rem" }}>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Register</button>
    </form>
  );
}
