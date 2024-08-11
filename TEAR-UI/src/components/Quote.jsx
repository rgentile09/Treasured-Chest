import React, { useState, useEffect } from 'react';

const Quote = () => {
    window.addEventListener("load", function(){
        fetch("https://api.quotable.io/random?tags=love|life|happiness|family").then(function(response) {
            response.json().then(function(json) {
            const destination = document.getElementById("destination");
                destination.innerHTML = `
                <div>
                    <h2 style="color: white;">"${json.content}"</h2>
                    <h3>- ${json.author}</h3>
                </div>`;
            });
        });
     });
};

export default Quote;