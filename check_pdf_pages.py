import os
from pypdf import PdfReader
import sys

def check_pdf_pages(directory="./"):
    """Check that all PDF files have exactly 1 page"""
    errors = []
    pdfs_checked = 0
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".pdf"):
                pdf_path = os.path.join(root, file)
                try:
                    reader = PdfReader(pdf_path)
                    num_pages = len(reader.pages)
                    pdfs_checked += 1
                    
                    if num_pages != 1:
                        errors.append(f"❌ {pdf_path}: {num_pages} pages (expected 1)")
                    else:
                        print(f"✓ {pdf_path}: 1 page")
                        
                except Exception as e:
                    errors.append(f"❌ Error reading {pdf_path}: {e}")
    
    print(f"\nTotal PDFs checked: {pdfs_checked}")
    
    if errors:
        print(f"\n{'='*60}")
        print("ERRORS FOUND:")
        print('='*60)
        for error in errors:
            print(error)
        print('='*60)
        sys.exit(1)  # Exit with error code to fail the build
    else:
        print("\n✓ All PDFs have exactly 1 page!")
        sys.exit(0)

if __name__ == "__main__":
    check_pdf_pages()