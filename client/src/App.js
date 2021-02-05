import { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => setUrl(e.target.value);

  // Post to back-end API and receive shortened URL
  const shortenUrl = () => {
    setLoading(true);
    fetch(`${API_URL}/url?url=${url}`, {
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        // Set shortened URL to display to user
        setShortUrl(data.shortUrl);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Maximo Macchi Rethink Interview Question #3 - URL Shortener</h2>
        <h4>Enter the URL you'd like to shorten below:</h4>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          className="url-input"
          autoFocus={true}
        ></input>
        {/* Disable button so user can't submit multiple queries */}
        <button onClick={shortenUrl} disabled={loading} className="button">
          {loading ? 'Creating Short URL...' : 'Shorten URL'}
        </button>
        <h5>{shortUrl ? 'Shortened URL:' : ''}</h5>
        <a className="link" href={shortUrl}>
          {shortUrl}
        </a>
      </header>
    </div>
  );
}

export default App;
