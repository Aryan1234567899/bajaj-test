import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonData);
      fetch('/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      })
      .then(response => response.json())
      .then(data => setResponseData(data));
    } catch (error) {
      console.error('Invalid JSON:', error);
      setResponseData({ error: 'Invalid JSON' });
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilters(event.target.value);
  };

  return (
    <div>
      <h1>Full Stack Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          JSON Data:
          <textarea value={jsonData} onChange={(e) => setJsonData(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <div>
          <h2>Response:</h2>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highestLowercaseAlphabet">Highest Lowercase Alphabet</option>
          </select>
          <p>
            {selectedFilters.includes('numbers') && <span>Numbers: {JSON.stringify(responseData.numbers)}</span>}
            {selectedFilters.includes('alphabets') && <span>Alphabets: {JSON.stringify(responseData.alphabets)}</span>}
            {selectedFilters.includes('highestLowercaseAlphabet') && <span>Highest Lowercase Alphabet: {JSON.stringify(responseData.highest_lowercase_alphabet)}</span>}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;