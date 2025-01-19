'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to the Text Analyzer App</h1>
      <p>Click the link below to analyze your text:</p>
      <Link
        href="/analyze"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Go to Text Analyzer
      </Link>
    </div>
  );
}
