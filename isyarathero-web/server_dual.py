"""
IsyaratHero / SignBridge - Dual HTTP & HTTPS Server
Simultaneously serves:
  - http://localhost:8080
  - https://localhost:8443
"""

import os
import ssl
import threading
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


def run_http(port=8080):
    try:
        httpd = HTTPServer(("", port), CustomHandler)
        print(f"[HTTP] Running at: http://localhost:{port}")
        httpd.serve_forever()
    except Exception as e:
        print(f"[HTTP Error] {e}")


def run_https(port=8443):
    web_dir = os.path.dirname(os.path.abspath(__file__))
    cert_path = os.path.join(web_dir, "cert.pem")
    key_path = os.path.join(web_dir, "key.pem")

    try:
        httpd = HTTPServer(("", port), CustomHandler)
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ctx.load_cert_chain(certfile=cert_path, keyfile=key_path)
        httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)
        print(f"[HTTPS] Running at: https://localhost:{port}")
        httpd.serve_forever()
    except Exception as e:
        print(f"[HTTPS Error] {e}")


if __name__ == "__main__":
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    t1 = threading.Thread(target=run_http, args=(8080,), daemon=True)
    t2 = threading.Thread(target=run_https, args=(8443,), daemon=True)

    t1.start()
    t2.start()

    print("=" * 60)
    print("  SIGNBRIDGE - DUAL HTTP (8080) & HTTPS (8443) ACTIVE   ")
    print("=" * 60)

    t1.join()
    t2.join()
