
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import SharedNote from './SharedNote.jsx';

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
