import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MemoryCard } from "./MemoryCard";

export const MemoryTable = ({ memories, deleteMemory, searchMemory}) => {
  const memoriesList = memories; 
  const [memoriesItem, setMemoriesItem] = useState(memoriesList);
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearchClick() {
      if (searchQuery === "") { setMemoriesItem(memoriesList); return; }
      const filterBySearch = memoriesList.filter((item) => {
          if (item.title.toLowerCase()
              .includes(searchQuery.toLowerCase())) { return item; }
      })
      setMemoriesItem(filterBySearch);
  }
  const mystyle = {
      marginLeft: "600px",
      marginTop: "20px",
      fontWeight: "700"
  };

  return (
      <div>
          <div style={mystyle}>
              <input onChange={e => setSearchQuery(e.target.value)}>
              </input>
              <button onClick={handleSearchClick}>Submit</button>
          </div>
          <div>
              {memoriesItem.map((memory) => {
                  return (
                    <div>{memory.title}</div>
                  )
              })
              }

          </div>
      </div>
  );
  //   const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate(""); 

  //   const onSearchSubmit = (e) => {
  //       e.preventDefault();
  //       searchMemory(searchQuery);
  //       navigate("/");
  //   };

  // return (
  //   <div className="container">
  //     <form onSubmit={onSearchSubmit}>
  //         <div className="input-group mb-3">
  //             <div className="input-group-prepend">
  //               <span className="input-group-text" id="basic-addon1">Search</span>
  //             </div>
  //             <input type="text" className="form-control" placeholder="Enter a keyword (i.e. tooth, Christmas, etc.)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
  //             <div className="input-group-append">
  //               <button className="btn btn-outline-secondary" type="submit">Submit</button>
  //             </div>
  //         </div>
  //     </form>
  //     { searchQuery == null ?
  //       <div className="row">
  //         {memories.map((memory) => (
  //           <MemoryCard key={memory.id} memory={memory} deleteMemory={deleteMemory} />
  //         ))}
  //       </div>
  //     :
  //       <div className="row">
  //         {memories.map((memory) => (
  //           <MemoryCard key={memory.id} memory={memory} deleteMemory={deleteMemory} />
  //         ))}
  //       </div>
  //     }
  //   </div>
  // );
};


