import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Link, Grid, Button, TextField } from '@mui/material';

export default function NoteList({ owner, onShare }) {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://simple-java-backend.onrender.com';
    const token = localStorage.getItem('token');
    axios.get(`${apiUrl}/api/notes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setNotes(res.data.filter(n => n.owner && n.owner.username === owner));
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert('Error: ' + err.response.data.message);
        }
      });
  }, [owner]);

  const handleShare = (uuid) => {
    if (onShare) onShare(uuid);
    navigator.clipboard.writeText(window.location.origin + '/share/' + uuid);
    alert('Share link copied!');
  };

  const handleDelete = async (id) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://simple-java-backend.onrender.com';
    const token = localStorage.getItem('token');
    await axios.delete(`${apiUrl}/api/notes/${id}?ownerId=${owner}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = async (id) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://simple-java-backend.onrender.com';
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`${apiUrl}/api/notes/${id}?ownerId=${owner}`, {
        title: editTitle,
        content: editContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.map(n => n.id === id ? res.data : n));
      setEditId(null);
      setEditTitle("");
      setEditContent("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert('Error: ' + err.response.data.message);
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Your Notes</Typography>
      <Grid container spacing={3} justifyContent="center">
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: '#f5f5fa' }}>
              <CardContent>
                {editId === note.id ? (
                  <>
                    <TextField label="Title" fullWidth value={editTitle} onChange={e => setEditTitle(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Content" fullWidth multiline rows={4} value={editContent} onChange={e => setEditContent(e.target.value)} sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button size="small" variant="contained" color="primary" onClick={() => handleUpdate(note.id)}>Save</Button>
                      <Button size="small" variant="outlined" onClick={() => setEditId(null)}>Cancel</Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" color="primary">{note.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>{note.content}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button size="small" variant="outlined" onClick={() => handleShare(note.shareUuid)}>Share</Button>
                      <Button size="small" color="success" variant="outlined" onClick={() => handleEdit(note)}>Edit</Button>
                      <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(note.id)}>Delete</Button>
                    </Box>
                  </>
                )}
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
