import React, { useState } from 'react'
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

// Using an API the page loads in all the results from the users search query.
function SearchMusic() {
  const [musicResults, loading] = useState([]);

  // General API fetch for music
  // Input: Artist, song, albums, ect.
  // Output: Populates the music results array and displays it to the user
  const searchMusic = (search) => {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search.text, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "2269dea1a3msha88d9bf6b6f0a40p19ba1cjsn31b64c781ad0",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.data);
      // Index the search result array so that we can reference the values.
      let indexedData = data.data;
      indexedData.forEach((item, i) => {
        item.id = i;
        i += 1;
      });
      loading({
        musicResults: indexedData
      });
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  return (
    <div>
      {console.log(musicResults)}
      <SearchBar onSearch={searchMusic} />
      {
        ( loading ? (
        (musicResults.musicResults != null) 
          ? (<SearchResults musicResults={musicResults.musicResults} />) : (<h5>Nothing here?  <br /> Use the above box to search for something!</h5>)
        ) : (
          <h5>Loading...</h5>
        ))
      }
    </div>
  )
}

export default SearchMusic;