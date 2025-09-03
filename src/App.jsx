import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function SharedNote({ uuid }) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios.get(`${apiUrl}/api/notes/share/${uuid}`)
      .then(res => {
        setNote(res.data);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uuid]);

  if (loading) return <Box sx={{ mt: 6, textAlign: 'center' }}><Typography variant="h6">Loading...</Typography></Box>;
  if (error || !note) return <Box sx={{ mt: 6, textAlign: 'center' }}><Typography variant="h6">404: Note Not Found</Typography></Box>;

  return (
    // ... baaki ka code same hai
    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 350, boxShadow: 4, borderRadius: 3, bgcolor: '#e3f2fd' }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>{note.title}</Typography>
          <Typography variant="body1">{note.content}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}