from weasyprint import HTML
import os
import sys

# Define the directory to search for HTML files
directory = "./"

errors = []

# Loop through all directories and files in the specified directory
for root, dirs, files in os.walk(directory):
    for file in files:
        if file == "resume.html":
            html_file = os.path.join(root, file)
            output_pdf = os.path.join(root, "Sidney_Lu.pdf")

            try:
                # Render first to check page count
                doc = HTML(filename=html_file).render()
                num_pages = len(doc.pages)

                if num_pages != 1:
                    errors.append(f"{html_file}: {num_pages} pages (expected 1)")
                    print(f"ERROR: {html_file} has {num_pages} pages (expected 1)")
                else:
                    doc.write_pdf(output_pdf)
                    print(f"PDF created successfully: {output_pdf} (1 page)")
            except Exception as e:
                errors.append(f"{html_file}: {e}")
                print(f"Error creating PDF from '{html_file}': {e}")

# Exit with error if any PDFs failed validation
if errors:
    print(f"\nBuild failed: {len(errors)} error(s)")
    sys.exit(1)