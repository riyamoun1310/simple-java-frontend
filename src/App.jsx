import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import SharedNote from './SharedNote.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Persist user session
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser(username);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('username', username);
    setShowLogin(true);
    setError("");
  };

  const handleSignUp = (username) => {
    setUser(username);
    localStorage.setItem('username', username);
    setShowLogin(true);
    setError("");
  };

  if (!user) {
    return (
      <div className="auth-container">
        {showLogin ? (
          <>
            <Login onLogin={handleLogin} setError={setError} />
            <p>Don't have an account? <button onClick={() => setShowLogin(false)}>Sign Up</button></p>
          </>
        ) : (
          <>
            <SignUp onSignUp={handleSignUp} setError={setError} />
            <p>Already have an account? <button onClick={() => setShowLogin(true)}>Login</button></p>
          </>
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="main-container">
        <header>
          <h1>My Notes App</h1>
          <div>
            Welcome, {user}! <button onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <main>
          <NoteForm owner={user} />
          <NoteList owner={user} />
        </main>
        <Routes>
          <Route path="/share/:uuid" element={<SharedNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;