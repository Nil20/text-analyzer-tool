'use client';

import { useState } from 'react';
import axios from 'axios';

interface ITexts {
  id: number;
  content: string;
}

export default function TextAnalyzer() {
  const API_BASE_URL = 'http://localhost:4000';
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
  const [texts, setTexts] = useState<ITexts[]>([]);

  const fetchTexts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/texts`);
      setTexts(response.data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching saved texts.');
    }
  };

  const handleSaveText = async () => {
    if (!content.trim()) {
      setError('Cannot save empty text.');
      return;
    }

    try {
      setError('');
      await axios.post(`${API_BASE_URL}/texts`, { content });
      setContent('');
      fetchTexts();
    } catch (err) {
      console.error(err);
      setError('An error occurred while saving the text.');
    }
  };

  const handleUpdateText = async (id: number) => {
    if (!content.trim()) {
      setError('Cannot update with empty text.');
      return;
    }

    try {
      setError('');
      await axios.put(`${API_BASE_URL}/texts/${id}`, { content });
      setContent('');
      fetchTexts();
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating the text.');
    }
  };

  const handleDeleteText = async (id: number) => {
    try {
      setError('');
      await axios.delete(`${API_BASE_URL}/texts/${id}`);
      fetchTexts();
    } catch (err) {
      console.error(err);
      setError('An error occurred while deleting the text.');
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
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28A745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '10px',
          marginBottom: '20px',
        }}
      >
        Go back to home
      </button>
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
        <button
          onClick={handleSaveText}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Save Text
        </button>
        <button
          onClick={resetResults}
          style={{
            marginLeft: '10px',
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
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {!error && (
        <div style={{ marginTop: '20px' }}>
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
              <strong>Number of Sentences:</strong> {results.sentenceCount}
            </p>
          )}
          {results.paragraphCount !== 0 && (
            <p>
              <strong>Number of Paragraphs:</strong> {results.paragraphCount}
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
      <div style={{ marginTop: '30px' }}>
        <h2>Saved Texts:</h2>
        {texts.map((text) => (
          <div key={text.id} style={{ marginBottom: '10px' }}>
            <p>{text.content}</p>
            <button
              onClick={() => handleUpdateText(text.id)}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#ffc107',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '5px',
              }}
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteText(text.id)}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
            {/* <button
              onClick={() => handleAnalyze(text.id)}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: 'tomato',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Analyze this
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
