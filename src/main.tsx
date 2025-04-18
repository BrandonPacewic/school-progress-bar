import React, { useEffect, useState } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }) => (
  <div style={{ width: '60%', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', height: '25px' }}>
    <div
      style={{
        width: `${progress}%`,
        background: '#00bfff',
        height: '100%',
        transition: 'width 0.5s ease-in-out',
      }}
    />
  </div>
);

const start = new Date('2025-03-31');
const end = new Date('2025-05-13');

function calculateProgress(start: Date, end: Date): number {
  const now = new Date();
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
  return parseFloat(progress.toFixed(6));
}

function App() {
  const [progress, setProgress] = useState(() => calculateProgress(start, end));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress(start, end));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src="/icon-books.svg" alt="Books icon" style={{ width: '2em', height: '2em' }} />
        School Term Progress
      </h1>
      <ProgressBar progress={progress} />
      <p style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
        {progress.toFixed(4)}% of the school term is complete.
      </p>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
