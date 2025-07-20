// src/githubApi.js
const owner = 'Talion-101'; // Replace with your actual GitHub username
const repo = 'futuristic-doc-search'; // Replace with your actual repo name
const path = 'docs';

export async function fetchDocuments() {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      throw new Error(`GitHub API error: ${res.status}`);
    }
    
    const files = await res.json();
    
    // Handle case where API returns a single file object instead of array
    const fileArray = Array.isArray(files) ? files : [files];
    
    return fileArray
      .filter(file => file.type === 'file')
      .map(file => ({
        id: file.sha,
        name: file.name,
        filename: file.name,
        type: detectType(file.name),
        size: file.size,
        lastModified: file.git_url?.split('/').pop(),
        downloadUrl: file.download_url,
        sha: file.sha,
      }));
  } catch (err) {
    console.error('Error fetching documents:', err);
    return [];
  }
}

function detectType(filename) {
  if (filename.endsWith('.pdf')) return 'PDF';
  if (filename.endsWith('.docx')) return 'DOCX';
  if (filename.endsWith('.txt')) return 'TXT';
  if (filename.endsWith('.md')) return 'MD';
  return 'Unknown';
}
