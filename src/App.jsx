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
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
          ⚡ Futuristic Document Search
        </h1>
        <p className="text-secondary mt-2">Powered by GitHub ✨</p>
      </header>

      {loading ? (
        <p className="text-secondary text-center">Loading documents...</p>
      ) : docs.length === 0 ? (
        <p className="text-accent text-center">No documents found in /docs folder.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map(doc => (
            <div
              key={doc.id}
              className="p-5 rounded-xl bg-card/50 backdrop-blur-md border border-border hover:border-primary shadow-md hover:shadow-primary transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-semibold text-primary">{doc.name}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/30 text-accent">
                  {doc.type}
                </span>
              </div>
              <p className="text-sm text-text mb-4">Size: {doc.size} bytes</p>
              <a
                href={doc.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-primary text-background hover:bg-secondary hover:text-white transition duration-300"
              >
                ⬇️ Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
