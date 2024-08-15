// import React, { useState } from 'react';
// import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Navigation from './components/Navigation';
// import MemoryPostForm from './components/MemoryPostForm';
// import DisplayMemory from './pages/DisplayMemory';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";
// import Home from "./pages";
// import Login from "./pages/login";
// import Memories from "./pages/memories";
// import Children from "./pages/children";
// import CreateAccount from "./pages/create-account";
// import DisplayChildren from './pages/DisplayChildren';

// function App() {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [memoryPost, setMemoryPost] = useState(null);
//   const [child, setChild] = useState();

//   return (
//     <Router>
//       <Navigation isLoggedIn={authenticated} handleLogout={() => setAuthenticated(false)} />
//       <nav>
//         {!authenticated ? (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/create-account">Create Account</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/">Memories</Link>
//             <Link to="/logout">Logout</Link>
//           </>
//         )}
//       </nav>
//       <div className="App">
//         <header className="App-header">
//           <Routes>
//             {/* Public Routes */}
//             <Route
//               path="/login"
//               element={<Login setAuthenticated={setAuthenticated} />}
//             />
//             <Route path="/create-account" element={<CreateAccount />} />

//             {/* Private Routes */}
//             {authenticated ? (
//               <>
//                 <Route exact path="/" element={<Home />} />
//                 <Route path="/memories" element={<Memories setMemoryPost={setMemoryPost} />} />
//                 <Route path="/children" element={<Children setChild={setChild} />} />
//                 <Route path="/displayChildren" element={<DisplayChildren child={child} />} />
//                 <Route path="/display" element={<DisplayMemory memoryPost={memoryPost} />} />
//                 <Route path="/logout" element={<Home />} />
//               </>
//             ) : (
//               <Route path="*" element={<Login setAuthenticated={setAuthenticated} />} />
//             )}
//           </Routes>
//         </header>
//       </div>
//     </Router>
//   );
// }

// export default App;

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
// import Memories from "./pages/memories";
import MemoryPage from "./pages/MemoryPage";
import { AddMemoryPage } from "./components/AddMemoryPage";
import Children from "./pages/children";
import CreateAccount from "./pages/create-account";
import DisplayChildren from './pages/DisplayChildren';
import DisplayMemory from './pages/DisplayMemory';
import { fetchMemories, memoryPost  } from './services/memoryService';
import MemoryDetail from './components/MemoryDetail';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [memories, setMemories] = useState([]);
  const [child, setChild] = useState();

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

  const addMemory = async (memory) => {
    try {
      const newMemory = await memoryPost(memory);
      setMemories([...memories, newMemory]);
    } catch (error) {
      console.error("Error adding memory:", error);
    }
  };

  return (
    <Router>
      <Navigation isLoggedIn={authenticated} handleLogout={() => setAuthenticated(false)} />
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
                <Route exact path="/" element={<><Home /><MemoryPage memories={memories} setMemories={setMemories} /></>} />
                <Route path="/memories" element={<AddMemoryPage addMemory={addMemory} />} />
                <Route path="/add-memory" element={<DisplayMemory memoryPost={memoryPost} />} />
                <Route path="/memory/:memoryId" element={<MemoryDetail memories={memories} />} />

                {/* <Route path="/memories" element={<Memories setMemoryPost={setMemoryPost} />} /> */}
                <Route path="/children" element={<Children setChild={setChild} />} />
                <Route path="/displayChildren" element={<DisplayChildren child={child} />} />
                {/* <Route path="/display" element={<DisplayMemory memoryPost={memoryPost} />} /> */}
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
