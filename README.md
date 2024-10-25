# Resume Builder with GitHub Actions

This repository automates the process of generating PDF resumes from HTML files using GitHub Actions. Whenever you push changes to your repository, it compiles your resume from HTML to PDF seamlessly.

*This project is inspired by [jitinnair1/autoCV](https://github.com/jitinnair1/autoCV) and [FlandreDaisuki/resume](https://github.com/FlandreDaisuki/resume)*

## Getting Started

### Prepare Your Resume HTML Files

1. Add your resume HTML files in the appropriate directories:
   - Name the main resume file as `resume.html`.
   - Organize additional resumes in subdirectories (e.g., `_site/product/`).

   The script will recursively search all folders to compile `resume.html` into `resume.pdf`.

### Configure GitHub Actions

This repository is set up to use GitHub Actions, which automatically triggers the resume generation whenever you push changes. Ensure that the workflow file (located in `.github/workflows/`) is correctly configured to run on commits.

### CNAME Configuration

You can place your `CNAME` file in the `_site` directory, or let the workflow script copy it automatically.

### View Output

After the action runs, the generated files will be available in the `_site/` directory:

- **Main HTML Resume**: Located at `_site/resume.html`
- **PDF Versions**: Generated PDFs will be stored in the `_site/` directory or any relevant subdirectories (e.g., `_site/product/`).

### Access Resumes via `index.html`

The `index.html` files provide links to both the HTML and PDF versions of your resumes. You can find these files in:

- `_site/index.html` for the main resume
- `_site/product/index.html` for additional product resumes

**Note**: Remember to modify `index.html` to personalize information, such as your name.

## Example Structure

```plaintext
├── _site/            
│   ├── product_manager/ # Subdirectory for product manager resume
│   │   ├── index.html   # Access point for product manager resume
│   │   └── resume.html  # Product resume file, which will be built to resume.pdf
│   ├── index.html       # Access point for the main resume
│   ├── resume.html      # Main resume file, which will be built to resume.pdf
│   └── styles.css       # Stylesheet for the resumes
```


