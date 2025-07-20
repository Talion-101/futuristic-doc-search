const owner = 'YOUR_GITHUB_USERNAME';
const repo = 'futuristic-doc-search';
const path = 'docs';

export async function fetchDocuments() {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('GitHub API error');
    const files = await res.json();

    return files
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
  return 'Unknown';
}
