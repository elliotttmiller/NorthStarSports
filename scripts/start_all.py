import subprocess
import sys
import os
import time

def run_command(cmd, cwd=None):
    return subprocess.Popen(cmd, cwd=cwd, shell=True)

def main():
    print("[CLEAN] Stopping any running node, vite, or ngrok processes...")
    for proc in ["node", "ngrok", "vite"]:
        subprocess.call(f"taskkill /F /IM {proc}.exe", shell=True)

    print("[CLEAN] Cleaning npm cache...")
    subprocess.call("npm cache clean --force", shell=True)

    print("[START] Backend server...")
    backend_proc = run_command("npm run dev", cwd="backend")

    print("[START] Frontend server...")
    frontend_proc = run_command("npm run dev", cwd="frontend")

    time.sleep(5)  # Wait for servers to start


    # Always expose frontend via ngrok
    ngrok_port = "5173"
    print("[NGROK] Exposing frontend (UI) on ngrok...")
    ngrok_cmd = f"ngrok http --domain=noninherently-fractional-aleshia.ngrok-free.app {ngrok_port}"
    ngrok_proc = run_command(ngrok_cmd)

    print("[LOGS] Streaming backend, frontend, and ngrok output...")
    print("Press Ctrl+C to stop all services.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("[STOP] Shutting down all services...")
        for proc in [backend_proc, frontend_proc, ngrok_proc]:
            if proc:
                proc.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
