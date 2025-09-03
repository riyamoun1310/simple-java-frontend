import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        username,
        email,
        passwordHash: password,
      });
      setSuccess('Registration successful!');
      setError('');
      if (onSignUp) onSignUp(username);
    } catch (err) {
      setError('Username or email already exists');
      setSuccess('');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
      </Box>
    </Box>
  );
}
