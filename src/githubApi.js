const owner = 'Talion-101';
const repo = 'futuristic-doc-search';
const path = 'docs';

export async function fetchDocuments() {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  console.log('Fetching from:', url); // Debug log
  
  try {
    const res = await fetch(url);
    console.log('Response status:', res.status); // Debug log
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('GitHub API error:', res.status, errorText);
      throw new Error(`GitHub API error: ${res.status} - ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Raw GitHub API response:', data); // Debug log
    
    // Handle both single file and array responses
    const files = Array.isArray(data) ? data : [data];
    
    const documents = files
      .filter(file => file && file.type === 'file')
      .map(file => ({
        id: file.sha,
        name: file.name,
        filename: file.name,
        type: detectType(file.name),
        size: file.size,
        lastModified: new Date().toISOString(),
        downloadUrl: file.download_url,
        sha: file.sha,
      }));
    
    console.log('Processed documents:', documents); // Debug log
    return documents;
    
  } catch (err) {
    console.error('Error fetching documents:', err);
    throw err; // Re-throw to handle in component
  }
}

function detectType(filename) {
  const ext = filename.split('.').pop()?.toLowerCase();
  const typeMap = {
    'pdf': 'PDF',
    'docx': 'DOCX', 
    'doc': 'DOC',
    'txt': 'TXT',
    'md': 'MD',
    'png': 'PNG',
    'jpg': 'JPG',
    'jpeg': 'JPEG'
  };
  return typeMap[ext] || 'Unknown';
}
