// assets/cover_letter.js

// Load required CSS files
function loadStylesheet(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

// Load GitHub-like Markdown CSS
loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css');
// Load Highlight.js CSS theme (using a light theme)
loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css');

// Create and add custom styles
const customStyles = document.createElement('style');
customStyles.textContent = `
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        background-color: #ffffff;
        color: #24292e;
    }

    .markdown-body h1,
    .markdown-body h2,
    .markdown-body h3,
    .markdown-body h4,
    .markdown-body h5,
    .markdown-body h6 {
        color: #1f2937;
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }

    .markdown-body a {
        color: #0366d6;
    }

    .markdown-body pre {
        background-color: #f6f8fa;
        border-radius: 6px;
        padding: 16px;
    }

    .markdown-body code {
        background-color: #f6f8fa;
        border-radius: 3px;
        padding: 0.2em 0.4em;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }

    .loading {
        text-align: center;
        padding: 2rem;
        color: #666;
    }

    .error {
        color: #dc2626;
        padding: 1rem;
        border: 1px solid #fecaca;
        border-radius: 0.375rem;
        background-color: #fee2e2;
    }

    /* Light theme for blockquotes */
    .markdown-body blockquote {
        color: #57606a;
        border-left: 0.25em solid #d0d7de;
        background-color: #f6f8fa;
    }

    /* Light theme for tables */
    .markdown-body table tr {
        background-color: #ffffff;
        border-top: 1px solid #d0d7de;
    }

    .markdown-body table tr:nth-child(2n) {
        background-color: #f6f8fa;
    }

    .markdown-body table th,
    .markdown-body table td {
        border: 1px solid #d0d7de;
    }
`;
document.head.appendChild(customStyles);

// Load required scripts in sequence
Promise.all([
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js')
]).then(initializeMarkdownRenderer)
.catch(error => {
    console.error('Failed to load required libraries:', error);
    showError('Failed to load required libraries. Please try again later.');
});

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function showLoading() {
    const bodyText = document.querySelector('.body-text');
    bodyText.innerHTML = '<div class="loading">Loading content...</div>';
}

function showError(message) {
    const bodyText = document.querySelector('.body-text');
    bodyText.innerHTML = `<div class="error">${message}</div>`;
}

function initializeMarkdownRenderer() {
    // Configure marked options
    marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        breaks: true, // Add <br> on single line breaks
        headerIds: true, // Add IDs to headers
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {}
            }
            return code; // Use generic if language not found
        }
    });

    const bodyText = document.querySelector('.body-text');
    bodyText.classList.add('markdown-body');

    showLoading();

    // Fetch and render the Markdown content
    fetch('cover_letter.md')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load Markdown file');
            return response.text();
        })
        .then(markdown => {
            // Convert Markdown to HTML
            const htmlContent = marked.parse(markdown);
            bodyText.innerHTML = htmlContent;

            // Initialize syntax highlighting
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Could not load the cover letter content. Please try again later.');
        });
}