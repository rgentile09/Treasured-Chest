import React from "react";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            
            <a className="navbar-brand" href="/login">
                <div className="logo-link">
                    <img className="logo" src="src/assets/treasured-chest-logo.svg"></img>
                    <h2>Treasured Chest</h2>
                </div>
             </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

           <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/DisplayChildren">Children</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/memories">Add a Memory</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/children">Add a child</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/questionaire">Questionaire</a>
                    </li>
             </ul>
           </div>  
        </nav>
        
    )
}

export default Navigation