import { useEffect, useState } from 'react';
import { fetchDocuments } from './githubApi.js';

function App() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments().then(data => {
      setDocs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Futuristic Document Search
      </h1>

      {loading ? (
        <p className="text-secondary">Loading documents...</p>
      ) : docs.length === 0 ? (
        <p className="text-accent">No documents found in /docs folder.</p>
      ) : (
        <ul className="space-y-4">
          {docs.map(doc => (
            <li
              key={doc.id}
              className="bg-card p-4 rounded-lg border border-border hover:border-primary transition duration-200"
            >
              <p className="text-xl font-semibold">{doc.name}</p>
              <p className="text-sm text-secondary">Type: {doc.type}</p>
              <a
                href={doc.downloadUrl}
                className="text-primary underline hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
