import React, { useState } from 'react';

import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  const res = await axios.post('https://simple-java-backend.onrender.com/api/notes', { title, content });
    if (onNoteCreated) onNoteCreated(res.data);
    setTitle('');
    setContent('');
  };

  return (
    <Paper elevation={4} sx={{ p: 3, mt: 4, mb: 4, maxWidth: 500, mx: 'auto', borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>Create Note</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1, fontWeight: 'bold' }}>
          Add Note
        </Button>
      </Box>
    </Paper>
  );
}
