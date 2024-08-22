import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './components/Navigation';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import MemoryPage from "./pages/MemoryPage";
import { AddMemoryPage } from "./components/AddMemoryPage";
import { AddChildPage } from './components/AddChildPage';
import CreateAccount from "./pages/create-account";
import DisplayMemory from './pages/DisplayMemory';
import { fetchMemories, memoryPost, addMemory } from './services/memoryService';
import MemoryDetail from './components/MemoryDetail';
import FirstsPage from './pages/FirstsPage';
import ChildDetail from './components/ChildDetail';
import ChildTable from './components/ChildTable';
import ChildrenPage from './pages/ChildrenPage';
import Questionnaire from './pages/questionnaire';
import { useDarkMode } from './components/DarkModeContext'; 
import { UpdateMemoryForm } from './components/UpdateMemoryForm';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [memories, setMemories] = useState([]);
  const [child, setChild] = useState([]);
  const [children, setChildren] = useState([]);
  const { isDarkMode, toggleDarkMode } = useDarkMode(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memoriesData = await fetchMemories();
        setMemories(memoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Navigation isLoggedIn={authenticated} handleLogout={() => setAuthenticated(false)} />
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <header className="App-header">
      
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path="/create-account" element={<CreateAccount />} />

            {/* Private Routes */}
            {authenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/memories" element={<MemoryPage memories={memories} setMemories={setMemories} />} />
                <Route path="/memory" element={<AddMemoryPage addMemory={addMemory} />} />
                <Route path="/add-memory" element={<DisplayMemory memoryPost={memoryPost} />} />
                <Route path="/memory/:memoryId" element={<MemoryDetail memories={memories} />} />
                <Route path="/memories/:memoryId/edit" element={<UpdateMemoryForm />} />
                <Route path="/firsts" element={<FirstsPage />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/add-child" element={<AddChildPage addChild={setChild} />} />
                <Route path="/displayChildren" element={<ChildrenPage children={children} setChildren={setChildren} />} />
                <Route path="/children/:childId" element={<ChildDetail children={children} />} />
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




