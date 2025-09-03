import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function SharedNote({ uuid }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/notes/share/${uuid}`)
      .then(res => setNote(res.data))
      .catch(err => setNote(null));
  }, [uuid]);

  if (!note) return <Box sx={{ mt: 6, textAlign: 'center' }}><Typography variant="h6">Note not found or loading...</Typography></Box>;

  return (
    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 350, boxShadow: 4, borderRadius: 3, bgcolor: '#e3f2fd' }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>{note.title}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{note.content}</Typography>
          <Typography variant="caption" color="text.secondary">Share UUID: {note.shareUuid}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
