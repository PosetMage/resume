// assets/cover_letter.js

// Dynamically load the Showdown library
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js";
script.onload = () => {
    // Proceed with the rest of the logic after the library is loaded
    const converter = new showdown.Converter();
    const bodyText = document.querySelector('.body-text');

    // Fetch the Markdown file
    fetch('cover_letter.md')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load Markdown file");
            return response.text();
        })
        .then(markdown => {
            // Convert Markdown to HTML
            const htmlContent = converter.makeHtml(markdown);
            // Render HTML inside .body-text div
            bodyText.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error:", error);
            bodyText.innerHTML = "<p>Could not load the cover letter content.</p>";
        });
};

// Append the script tag to the document head
document.head.appendChild(script);
