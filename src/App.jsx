import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import SharedNote from './SharedNote.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Routes>
          {/* Home Page: NoteForm + NoteList */}
          <Route path="/" element={
            <>
              <h1>My Notes App</h1>
              <NoteForm />
              <NoteList />
            </>
          } />
          {/* Shared Note Page */}
          <Route path="/share/:uuid" element={<SharedNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;