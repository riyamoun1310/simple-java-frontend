import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function Login({ onLogin, setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://simple-java-backend.onrender.com';
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        passwordHash: password,
      });
      console.log('Login response:', res.data);
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        if (onLogin) onLogin(username);
        if (setError) setError('');
      } else if (res.data && res.data.message) {
        if (setError) setError(res.data.message);
      } else {
        if (setError) setError('Login failed: No token received');
      }
    } catch (err) {
  if (setError) setError(err.response?.data?.message || 'Login failed');
  console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>Sign In</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 'bold', py: 1 }} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>
    </Paper>
  );
}
