import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './components/Navigation';
import MemoryPostForm from './components/MemoryPostForm';
import DisplayMemory from './pages/DisplayMemory';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Memories from "./pages/memories";
import Children from "./pages/childrenSubmitForm";
import CreateAccount from "./pages/create-account";
import DisplayChildren from './pages/DisplayChildren';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [memoryPost, setMemoryPost] = useState(null);
  const [child, setChild] = useState();

  return (
    <Router>
      <Navigation isLoggedIn={authenticated} handleLogout={() => setAuthenticated(false)} />
      <nav>
        {!authenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/create-account">Create Account</Link>
          </>
        ) : (
          <>
            <Link to="/">Memories</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </nav>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route path="/create-account" element={<CreateAccount />} />

            {/* Private Routes */}
            {authenticated ? (
              <>
                <Route exact path="/" element={<Home />} />
                <Route path="/memories" element={<Memories setMemoryPost={setMemoryPost} />} />
                <Route path="/children" element={<Children setChild={setChild} />} />
                <Route path="/displayChildren" element={<DisplayChildren child={child} />} />
                <Route path="/display" element={<DisplayMemory memoryPost={memoryPost} />} />
                <Route path="/logout" element={<Home />} />
              </>
            ) : (
              <Route path="*" element={<Login setAuthenticated={setAuthenticated} />} />
            )}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
