import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import RadarChartComponent from '../components/RadarChartComponent';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const q = query(
        collection(db, 'matchaLogs'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(results);
    };
    fetchLogs();
  }, []);

  const toggleFavorite = async (log) => {
    const ref = doc(db, 'matchaLogs', log.id);
    await updateDoc(ref, { favorite: !log.favorite });
    setLogs(logs.map(l => l.id === log.id ? { ...l, favorite: !l.favorite } : l));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Dashboard</h2>
      {logs.length === 0 && <p>No logs yet.</p>}
      {logs.map(log => (
        <div key={log.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{log.brand} - {log.blend} {log.favorite ? '⭐' : ''}</h3>
          <button onClick={() => toggleFavorite(log)}>{log.favorite ? 'Unfavorite' : 'Favorite'}</button>
          <p>Rating: {log.rating}/10</p>
          <RadarChartComponent data={log} />
          <p>{log.notes}</p>
        </div>
      ))}
    </div>
  );
}
