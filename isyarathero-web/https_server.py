"""
IsyaratHero - Local HTTPS Server Launcher
Runs on https://localhost:8443 with self-signed SSL certificate.
"""

import os
import sys
import ssl
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler


class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def guess_type(self, path):
        if path.endswith(".task"):
            return "application/octet-stream"
        if path.endswith(".wasm"):
            return "application/wasm"
        if path.endswith(".js"):
            return "application/javascript"
        return super().guess_type(path)


def run_https(port=8443):
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    cert_path = os.path.join(web_dir, "cert.pem")
    key_path = os.path.join(web_dir, "key.pem")

    server_address = ("localhost", port)
    httpd = HTTPServer(server_address, CustomHandler)

    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(certfile=cert_path, keyfile=key_path)
    httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)

    url = f"https://localhost:{port}"
    print("=" * 60)
    print("       ISYARATHERO - SECURE HTTPS WEB SERVER          ")
    print("=" * 60)
    print(f"Server running at: {url}")
    print("Serving with TLS/SSL encryption for camera permissions...")
    print("Opening browser...")
    print("Press Ctrl+C to stop.")
    print("=" * 60)

    webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nHTTPS server stopped.")
        httpd.server_close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8443
    run_https(port)
