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
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
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
    setShowLogin(false);
    setError("");
  };

  const handleSignUp = (username) => {
    setUser(username);
    localStorage.setItem('username', username);
    setShowSignUp(false);
    setError("");
  };

  return (
    <BrowserRouter>
      <div className="main-container">
        <h1>My Notes App</h1>
        {!user && (
          <div className="auth-buttons" style={{ marginBottom: 24 }}>
            <button onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Sign In</button>
            <button onClick={() => { setShowSignUp(true); setShowLogin(false); }}>Sign Up</button>
          </div>
        )}
        {user && (
          <div style={{ marginBottom: 24 }}>
            Welcome, <b>{user}</b>! <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <Routes>
          <Route path="/" element={
            <>
              {showLogin && !user && <Login onLogin={handleLogin} setError={setError} />}
              {showSignUp && !user && <SignUp onSignUp={handleSignUp} setError={setError} />}
              {!showLogin && !showSignUp && user && (
                <>
                  <NoteForm owner={user} />
                  <NoteList owner={user} />
                </>
              )}
            </>
          } />
          <Route path="/share/:uuid" element={<SharedNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;