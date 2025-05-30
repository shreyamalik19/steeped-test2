import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Steeped</h1>
      <p>Your matcha-tasting journal and discovery app.</p>
      <Link to="/register"><button>Create Account</button></Link>
      <br/><br/>
      <Link to="/login"><button>Log In</button></Link>
    </div>
  );
}
