import { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => setUrl(e.target.value);

  const shortenUrl = () => {
    fetch(`${API_URL}/url?url=${url}`, {
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setShortUrl(data.shortUrl);
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
        <button onClick={shortenUrl} className="button">
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
