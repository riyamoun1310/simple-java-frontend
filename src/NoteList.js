import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Card, CardContent, Typography, Box, Link, Grid } from '@mui/material';

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>All Notes</Typography>
      <Grid container spacing={3} justifyContent="center">
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: '#f5f5fa' }}>
              <CardContent>
                <Typography variant="h6" color="primary">{note.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{note.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Share Link: <Link href={`/share/${note.shareUuid}`}>{note.shareUuid}</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
