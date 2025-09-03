import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Link, Grid } from '@mui/material';

export default function NoteList({ owner, onShare }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/notes')
      .then(res => {
        // Only show notes for the logged-in user
        setNotes(res.data.filter(n => n.owner && n.owner.username === owner));
      })
      .catch(err => console.error(err));
  }, [owner]);

  const handleShare = (uuid) => {
    if (onShare) onShare(uuid);
    navigator.clipboard.writeText(window.location.origin + '/share/' + uuid);
    alert('Share link copied!');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/${id}?ownerId=${owner}`);
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Your Notes</Typography>
      <Grid container spacing={3} justifyContent="center">
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: '#f5f5fa' }}>
              <CardContent>
                <Typography variant="h6" color="primary">{note.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{note.content}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button size="small" variant="outlined" onClick={() => handleShare(note.shareUuid)}>Share</Button>
                  <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(note.id)}>Delete</Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Share UUID: {note.shareUuid}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
