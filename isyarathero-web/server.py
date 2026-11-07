"""
IsyaratHero - Local Web Server Launcher
Serves static files with proper MIME types for WASM and task models,
and automatically opens the default web browser.
"""

import os
import sys
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler


class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and SharedArrayBuffer support if needed
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def guess_type(self, path):
        # Ensure .task and .wasm MIME types are accurate
        if path.endswith(".task"):
            return "application/octet-stream"
        if path.endswith(".wasm"):
            return "application/wasm"
        if path.endswith(".js"):
            return "application/javascript"
        return super().guess_type(path)


def run_server(port=8080):
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    server_address = ("", port)
    try:
        httpd = HTTPServer(server_address, CustomHandler)
    except OSError:
        port = 8081
        server_address = ("", port)
        httpd = HTTPServer(server_address, CustomHandler)

    url = f"http://localhost:{port}"
    print("=" * 60)
    print("       ISYARATHERO - WEB-BASED BIM VISION SUITE       ")
    print("=" * 60)
    print(f"Server running at: {url}")
    print("Serving files with WASM & WebAssembly optimizations...")
    print("Opening browser...")
    print("Press Ctrl+C to stop the server.")
    print("=" * 60)

    webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    run_server(port)
