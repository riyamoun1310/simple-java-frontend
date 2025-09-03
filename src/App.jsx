import React, { useState } from 'react';
import './App.css';
import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import SharedNote from './SharedNote.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [sharedUuid, setSharedUuid] = useState('');

  return (
    <div className="main-container">
      <header>
        <h1>My Notes App</h1>
        {!user && (
          <div className="auth-buttons">
            <button onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Login</button>
        {user && <div>Welcome, {user}! <button onClick={() => setUser(null)}>Logout</button></div>}
      </header>

      {showLogin && !user && <Login onLogin={u => { setUser(u); setShowLogin(false); }} />}
  {showSignUp && !user && <SignUp onSignUp={u => { setUser(u); setShowSignUp(false); }} />}

  {!showLogin && !showSignUp && user && (
        <>
          <NoteForm onNoteCreated={() => {}} owner={user} />
          <NoteList owner={user} onShare={uuid => { setSharedUuid(uuid); setShowShared(true); }} />
        </>
      )}

      {showShared && sharedUuid && (
        <SharedNote uuid={sharedUuid} />
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';
import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import SharedNote from './SharedNote.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [sharedUuid, setSharedUuid] = useState('');

  return (
    <div className="main-container">
      <header>
        <h1>My Notes App</h1>
        {!user && (
          <div className="auth-buttons">
            <button onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Login</button>
            <button onClick={() => { setShowSignUp(true); setShowLogin(false); }}>Sign Up</button>
          </div>
        )}
        {user && (
          <div>
            Welcome, {user}! <button onClick={() => setUser(null)}>Logout</button>
          </div>
        )}
      </header>

      {showLogin && !user && (<Login onLogin={u => { setUser(u); setShowLogin(false); }} />)}
      {showSignUp && !user && (<SignUp onSignUp={u => { setUser(u); setShowSignUp(false); }} />)}

      {!showLogin && !showSignUp && user && (
        <React.Fragment>
          <NoteForm onNoteCreated={() => {}} owner={user} />
          <NoteList owner={user} onShare={uuid => { setSharedUuid(uuid); setShowShared(true); }} />
        </React.Fragment>
      )}

      {showShared && sharedUuid && (
        <SharedNote uuid={sharedUuid} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import SharedNote from './SharedNote.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [sharedUuid, setSharedUuid] = useState('');

  return (
    <div className="main-container">
      <header>
        <h1>My Notes App</h1>
        {!user && (
          <div className="auth-buttons">
            <button onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Login</button>
            <button onClick={() => { setShowSignUp(true); setShowLogin(false); }}>Sign Up</button>
          </div>
        )}
        {user && <div>Welcome, {user}! <button onClick={() => setUser(null)}>Logout</button></div>}
      </header>

      {showLogin && !user && <Login onLogin={u => { setUser(u); setShowLogin(false); }} />}
      {showSignUp && !user && <SignUp onSignUp={u => { setUser(u); setShowSignUp(false); }} />}

      {!showLogin && !showSignUp && user && (
        <>
          <NoteForm onNoteCreated={() => {}} owner={user} />
          <NoteList owner={user} onShare={uuid => { setSharedUuid(uuid); setShowShared(true); }} />
        </>
      )}

      {showShared && sharedUuid && (
        <SharedNote uuid={sharedUuid} />
      )}
    </div>
  );
}

export default App;
