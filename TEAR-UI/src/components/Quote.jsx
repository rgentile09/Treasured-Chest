import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random?tags=love|life|happiness|family');
      const data = await response.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <div>
      <h1>Quote of the Day</h1>
      <p>{quote.content}</p>
      <p><em>- {quote.author}</em></p>
      <button onClick={fetchQuote}>Get New Quote</button>
    </div>
  );
    // window.addEventListener("load", function(){
    //     fetch("https://api.quotable.io/random?tags=love|life|happiness|family").then(function(response) {
    //         response.json().then(function(json) {
    //         const destination = document.getElementById("destination");
    //         let index = 0; 
    //         destination.addEventListener("click", function() {
    //             destination.innerHTML = `
    //                 <div>
    //                 <h3>Planet ${json[index].content}</h3>
    //                 </div>
    //             `;
    //             index = (index + 1) % json.length; 
    //         });
    //     });
    //     });
    // });
};

export default Quote;