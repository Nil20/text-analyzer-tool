'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TextAnalyzer() {
  const initialResults = {
    wordCount: 0,
    characterCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    longestWords: [] as string[],
  };
  const [content, setContent] = useState('');
  const [results, setResults] = useState(initialResults);
  const [error, setError] = useState('');

  const handleAnalyze = async (type: string) => {
    if (!content.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setError('');

    const API_BASE_URL = 'http://localhost:4000';
    try {
      let endpoint = '';
      switch (type) {
        case 'wordCount':
          endpoint = `${API_BASE_URL}/api/number-of-words`;
          break;
        case 'characterCount':
          endpoint = `${API_BASE_URL}/api/number-of-characters`;
          break;
        case 'sentenceCount':
          endpoint = `${API_BASE_URL}/api/number-of-sentences`;
          break;
        case 'paragraphCount':
          endpoint = `${API_BASE_URL}/api/number-of-paragraphs`;
          break;
        case 'longestWords':
          endpoint = `${API_BASE_URL}/api/longest-words`;
          break;
        default:
          throw new Error('Unknown analysis type');
      }

      const response = await axios.post(endpoint, { content });
      const data = response.data;

      setResults(() => ({
        ...initialResults,
        [type]: data[type],
      }));
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing the text. Please try again.');
    }
  };

  const resetResults = () => {
    setError('');
    setContent('');
    setResults(initialResults);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text Analyzer</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your text here..."
        rows={10}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <div style={{ marginBottom: '10px' }}>
        {[
          'wordCount',
          'characterCount',
          'sentenceCount',
          'paragraphCount',
          'longestWords',
        ].map((type) => (
          <button
            key={type}
            onClick={() => handleAnalyze(type)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Analyze {type.replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
      <button
        onClick={resetResults}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'gray',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reset
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {!error && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>
          {results.wordCount !== 0 && (
            <p>
              <strong>Word Count:</strong> {results.wordCount}
            </p>
          )}
          {results.characterCount !== 0 && (
            <p>
              <strong>Character Count:</strong> {results.characterCount}
            </p>
          )}
          {results.sentenceCount !== 0 && (
            <p>
              <strong>Sentence Count:</strong> {results.sentenceCount}
            </p>
          )}
          {results.paragraphCount !== 0 && (
            <p>
              <strong>Paragraph Count:</strong> {results.paragraphCount}
            </p>
          )}
          {results.longestWords.length > 0 && (
            <div>
              <strong>Longest Words in Each Paragraph:</strong>
              <ul>
                {results.longestWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
