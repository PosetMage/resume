import os
import subprocess
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Step 1: Generate PDF
print("Generating PDF from HTML...")
subprocess.run(["python", "generate.py"], check=True)

# Step 2: Serve the _site directory on port 7777 with relative URL support
class CustomHandler(SimpleHTTPRequestHandler):
    # Ensures the server starts in the specified directory
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="_site", **kwargs)

port = 7777
server_address = ("", port)

# Set up the server with the custom handler
httpd = HTTPServer(server_address, CustomHandler)
print(f"Serving _site/ at http://localhost:{port}")

# Step 3: Open the main page in the browser
webbrowser.open(f"http://localhost:{port}")

try:
    # Run the server
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down the server.")
finally:
    httpd.server_close()
