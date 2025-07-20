import { useEffect, useState } from 'react';
import { fetchDocuments } from './githubApi.js';

function App() {
  const [docs, setDocs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments()
      .then(data => {
        console.log('Fetched documents:', data); // Debug log
        setDocs(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch documents:', err);
        setError(err.message);
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

  if (error) {
    return (
      <div className="min-h-screen bg-background text-text p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-accent mb-4">Error Loading Documents</h1>
          <p className="text-text">{error}</p>
          <p className="text-secondary mt-4">
            Make sure you have a 'docs' folder with files in your repository.
          </p>
        </div>
      </div>
    );
  }

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
        <div className="text-center">
          <p className="text-secondary">Loading documents...</p>
        </div>
      ) : filtered.length === 0 && query === '' ? (
        <div className="text-center">
          <p className="text-secondary">No documents found in the repository.</p>
          <p className="text-text mt-2">Add some files to the 'docs' folder in your GitHub repo.</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-accent text-center">No matches found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <div
              key={doc.id}
              className="p-5 rounded-xl bg-card/50 backdrop-blur-md border border-border hover:border-primary shadow-md hover:shadow-primary transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-semibold text-primary truncate">{doc.name}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/30 text-accent shrink-0 ml-2">
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
