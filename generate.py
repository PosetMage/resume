from weasyprint import HTML
import os

# Define the directory to search for HTML files
directory = "./"  # Change this to the folder you want to search in

# Loop through all directories and files in the specified directory
for root, dirs, files in os.walk(directory):
    for file in files:
        # Check if the file is 'resume.html'
        if file == "resume.html":
            # Construct the full path to the HTML file
            html_file = os.path.join(root, file)
            # Define the output PDF file name, same location as HTML file
            output_pdf = os.path.join(root, "resume.pdf")

            # Try converting HTML to PDF
            try:
                HTML(filename=html_file).write_pdf(output_pdf, 
                                                    stylesheets=None,
                                                    options={'page-size': 'A4'})
                print(f"PDF created successfully: {output_pdf}")
            except Exception as e:
                print(f"Error creating PDF from '{html_file}': {e}")
