  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
import React, { useState } from "react";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const res = await axios.post(`${apiUrl}/api/notes?ownerId=${owner}`, { title, content });
    if (onNoteCreated) onNoteCreated(res.data);
    setTitle('');
    setContent('');
  };

  return (
    <Box sx={{ p: 3, mt: 4, mb: 4, maxWidth: 500, mx: 'auto', borderRadius: 3, boxShadow: 3, background: '#fff' }}>
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
    </Box>
  );

