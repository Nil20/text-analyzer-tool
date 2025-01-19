'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TextAnalyzer() {
  const [content, setContent] = useState('');
  const [results, setResults] = useState({
    wordCount: 0,
    characterCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    longestWords: [] as string[],
  });
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setError('');

    try {
      const response = await axios.post('/api/analyze', { content });
      const {
        wordCount,
        characterCount,
        sentenceCount,
        paragraphCount,
        longestWords,
      } = response.data;

      setResults({
        wordCount,
        characterCount,
        sentenceCount,
        paragraphCount,
        longestWords,
      });
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing the text. Please try again.');
    }
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
      <button
        onClick={handleAnalyze}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Analyze
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {!error && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>
          <p>
            <strong>Word Count:</strong> {results.wordCount}
          </p>
          <p>
            <strong>Character Count:</strong> {results.characterCount}
          </p>
          <p>
            <strong>Number of Sentences:</strong> {results.sentenceCount}
          </p>
          <p>
            <strong>Number of Paragraphs:</strong> {results.paragraphCount}
          </p>
          <div>
            <strong>Longest Words in Each Paragraph:</strong>
            <ul>
              {results.longestWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
