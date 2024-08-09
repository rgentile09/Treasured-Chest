import React, { useState } from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './components/Navigation';
import MemoryPostForm from './components/MemoryPostForm';
import DisplayMemory from './components/DisplayMemory';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Memories from "./pages/memories";
import Children from "./pages/children";
import CreateAccount from "./pages/create-account";


function App() {

  const [memoryPost, setMemoryPost] = useState(null);

  return (
    <Router>
        <Navigation />
      <div className="App">
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/children" element={<Children />} />
            <Route path="/display" element={<DisplayMemory memoryPost={memoryPost} />} />
            <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
     </div>
   </Router>
       );
}

export default App
