import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import SharedNote from './SharedNote';

function App() {
  const [notes, setNotes] = useState([]);

  const handleNoteCreated = (newNote) => {
    setNotes(prev => [...prev, newNote]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <NoteForm onNoteCreated={handleNoteCreated} />
            <NoteList />
          </>
        } />
        <Route path="/share/:uuid" element={<SharedNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
