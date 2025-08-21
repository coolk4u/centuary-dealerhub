
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("Main.tsx loading");

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

console.log("Creating React root");
const root = createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering app:", error);
  root.render(
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>Application Error</h1>
      <p>Failed to load the application. Please check the console for details.</p>
    </div>
  );
}
