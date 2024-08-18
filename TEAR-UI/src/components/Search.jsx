import React, { useState} from "react";
import { MemoryTable } from "./MemoryTable";

export const Search = ({ memories, searchMemory, handleSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        searchMemory(searchQuery);
        // navigate("/");
    };

    return (
        <form onSubmit={onSearchSubmit}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Search</span>
                </div>
                <input type="text" className="form-control" placeholder="Enter a keyword (i.e. tooth, Christmas, etc.)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Submit</button>
                </div>
            </div>
        </form>
    );
};

