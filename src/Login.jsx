import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.message === 'Login successful!') {
        onLogin(email);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>Sign In</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 'bold', py: 1 }} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>
    </Paper>
  );
}
