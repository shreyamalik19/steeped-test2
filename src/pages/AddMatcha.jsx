import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export default function AddMatcha() {
  const [form, setForm] = useState({
    brand: '',
    blend: '',
    rating: 0,
    creaminess: 0,
    nuttiness: 0,
    strength: 0,
    astringency: 0,
    floral: 0,
    sweet: 0,
    notes: '',
    repurchase: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'matchaLogs'), {
        ...form,
        userId: auth.currentUser.uid,
        timestamp: Timestamp.now()
      });
      setSubmitted(true);
    } catch (err) {
      alert('Error saving log: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add Matcha Log</h2>
      {submitted ? (
        <p>Matcha log submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="brand" placeholder="Brand" onChange={handleChange} /><br/>
          <input name="blend" placeholder="Blend" onChange={handleChange} /><br/>
          <input type="number" name="rating" placeholder="General Rating" onChange={handleChange} /><br/>
          {[ 'creaminess', 'nuttiness', 'strength', 'astringency', 'floral', 'sweet' ].map(attr => (
            <div key={attr}>
              <label>{attr}</label>
              <input type="range" min="0" max="5" name={attr} onChange={handleChange} />
            </div>
          ))}
          <textarea name="notes" placeholder="Overall Thoughts" onChange={handleChange} /><br/>
          <label>
            <input type="checkbox" name="repurchase" onChange={handleChange} /> Would repurchase
          </label><br/>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
