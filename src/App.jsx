import { useEffect, useState } from 'react';
import { fetchDocuments } from './githubApi.js';

function App() {
  const [docs, setDocs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments().then(data => {
      setDocs(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      docs.filter(doc =>
        doc.name.toLowerCase().includes(q)
      )
    );
  }, [query, docs]);

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
          ⚡ Futuristic Document Search
        </h1>
        <p className="text-secondary mt-2">Powered by GitHub ✨</p>
      </header>

      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full px-5 py-3 rounded-xl bg-card/60 backdrop-blur-md border-2 border-primary focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-text shadow-inner transition duration-300"
        />
      </div>

      {loading ? (
        <p className="text-secondary text-center">Loading documents...</p>
      ) : filtered.length === 0 ? (
        <p className="text-accent text-center">No matches found for “{query}”</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
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
