import React from "react";

export const Search = ({ memories, deleteMemory }) => {
    return (
        <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Search</span>
        </div>
        <input type="text" class="form-control" placeholder="Enter a keyword (i.e. tooth, Christmas, etc.)" aria-label="Username" aria-describedby="basic-addon1"></input>
        </div>
    );
};