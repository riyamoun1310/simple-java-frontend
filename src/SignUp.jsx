import React, { useState } from 'react';

export default function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.id) {
        onSignUp(email);
      } else {
        setError('Sign up failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
