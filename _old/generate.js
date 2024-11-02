const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Function to recursively search for all 'resume.html' files
const findHtmlFiles = (dir) => {
    let htmlFiles = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            // Recursively search in subdirectories
            htmlFiles = htmlFiles.concat(findHtmlFiles(fullPath));
        } else if (file === 'resume.html') {
            // Add the path to the array if it is 'resume.html'
            htmlFiles.push(fullPath);
        }
    });

    return htmlFiles;
};

(async () => {
    const directory = './'; // Root directory to start the search
    const htmlFiles = findHtmlFiles(directory);

    if (htmlFiles.length === 0) {
        console.error('No resume.html files found.');
        return;
    }

    const browser = await puppeteer.launch();

    for (const htmlFile of htmlFiles) {
        const outputPdf = path.join(path.dirname(htmlFile), 'Sidney_Lu.pdf');
        
        try {
            const page = await browser.newPage();
            await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle2' });

            // Generate PDF in A4 format
            await page.pdf({
                path: outputPdf,
                format: 'A4',
                printBackground: true,
            });

            console.log(`PDF created successfully: ${outputPdf}`);
            await page.close();
        } catch (error) {
            console.error(`Error creating PDF from '${htmlFile}': ${error}`);
        }
    }

    await browser.close();
})();
