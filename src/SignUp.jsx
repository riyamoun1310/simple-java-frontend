import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function SignUp({ onSignUp, setError }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://simple-java-backend.onrender.com';
      const res = await axios.post(`${apiUrl}/api/auth/signup`, {
        username,
        email,
        passwordHash: password,
      });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        setSuccess('Registration successful! You are now signed in.');
        if (setError) setError('');
        if (onSignUp) onSignUp(username);
      } else if (res.data && res.data.message) {
        if (setError) setError(res.data.message);
        setSuccess('');
      } else {
        setSuccess('Registration successful! You can now sign in.');
        if (setError) setError('');
        if (onSignUp) onSignUp(username);
      }
    } catch (err) {
    if (setError) setError(err.response?.data?.message || 'Sign up failed');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>Sign Up</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 1 }}>{success}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 'bold', py: 1 }} disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Box>
    </Paper>
  );
}
