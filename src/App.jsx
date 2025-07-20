import { useEffect, useState } from 'react';
import { fetchDocuments } from './githubApi.js';

function App() {
  const [docs, setDocs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('App mounted, fetching documents...');
    
    fetchDocuments()
      .then(data => {
        console.log('Successfully fetched documents:', data);
        setDocs(data);
        setFiltered(data);
        setError(null);
      })
      .catch(err => {
        console.error('Failed to fetch documents:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    const filteredDocs = docs.filter(doc =>
      doc.name.toLowerCase().includes(q)
    );
    console.log(`Filtering with query "${q}":`, filteredDocs);
    setFiltered(filteredDocs);
  }, [query, docs]);

  console.log('App render - loading:', loading, 'error:', error, 'docs:', docs.length);

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
      
      {/* Debug Info - Remove this after fixing */}
      <div className="max-w-4xl mx-auto mb-6 p-4 bg-gray-800 rounded text-xs">
        <p><strong>Debug Info:</strong></p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Documents loaded: {docs.length}</p>
        <p>Filtered documents: {filtered.length}</p>
        <p>Search query: "{query}"</p>
      </div>
      
      {loading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-secondary mt-2">Loading documents...</p>
        </div>
      ) : error ? (
        <div className="text-center max-w-2xl mx-auto">
          <div className="p-6 bg-red-900/20 border border-red-500 rounded-lg">
            <h2 className="text-xl text-red-400 mb-4">Error Loading Documents</h2>
            <p className="text-red-300 mb-4">{error}</p>
            <details className="text-left">
              <summary className="cursor-pointer text-red-400">Troubleshooting Steps</summary>
              <ul className="mt-2 text-sm text-red-200 list-disc list-inside">
                <li>Make sure you have a 'docs' folder in your repository</li>
                <li>Add some sample files to the docs folder</li>
                <li>Check that the repository is public or the API can access it</li>
                <li>Open browser console (F12) to see detailed error messages</li>
              </ul>
            </details>
          </div>
        </div>
      ) : filtered.length === 0 && query === '' ? (
        <div className="text-center">
          <p className="text-secondary text-lg mb-2">No documents found</p>
          <p className="text-text">Add some files to the 'docs' folder in your GitHub repository</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center">
          <p className="text-accent text-lg">No matches found for "{query}"</p>
          <button 
            onClick={() => setQuery('')}
            className="mt-2 px-4 py-2 bg-primary text-background rounded hover:bg-secondary transition"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <div
              key={doc.id}
              className="p-5 rounded-xl bg-card/50 backdrop-blur-md border border-border hover:border-primary shadow-md hover:shadow-primary transition duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-lg font-semibold text-primary truncate pr-2" title={doc.name}>
                  {doc.name}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/30 text-accent shrink-0">
                  {doc.type}
                </span>
              </div>
              <p className="text-sm text-text mb-4">
                Size: {(doc.size / 1024).toFixed(1)} KB
              </p>
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
