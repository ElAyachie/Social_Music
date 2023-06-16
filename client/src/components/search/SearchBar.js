import { useState } from 'react'

// Search bar on the search music interests page.
const SearchBar = ({ onSearch }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
      e.preventDefault();
      if (text !== '') {
          onSearch({ text });
          setText('');
      }
      else {
          alert("Please enter a valid search.");
      }
    }

    return (
      <form onSubmit={onSubmit}>
          <input
            className="search-bar1"
            type='text'
            placeholder="Search Music..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
      </form>
    );
}

export default SearchBar;