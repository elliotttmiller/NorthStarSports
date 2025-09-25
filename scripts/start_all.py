
"""
start_all.py - Professional Development Orchestrator

Starts backend, frontend, and ngrok (optional) for local development.
Features:
- Cross-platform process management
- Configurable ports and domains
- Structured logging
- Graceful shutdown
- Robust error handling
"""
import subprocess
import os
import sys
import time
import signal
import argparse
import logging
from pathlib import Path

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s: %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("start_all")


# --- Configuration Loader ---
def get_config():
    backend_port = 4000
    frontend_port = 5173
    env_path = Path("frontend/.env")
    ngrok_domain = None
    if env_path.exists():
        with env_path.open() as f:
            for line in f:
                if line.startswith("PUBLIC_DOMAIN_URL="):
                    ngrok_domain = line.split("=", 1)[1].strip()
                    break
    if not ngrok_domain:
        ngrok_domain = "nssportsclub.ngrok.app"  # fallback
    return backend_port, frontend_port, ngrok_domain

# --- Environment Variable Loader ---
def load_env_var(env_path, var_name):
    env_file = Path(env_path)
    if not env_file.exists():
        logger.warning(f".env file not found at {env_path}")
        return None
    with env_file.open() as f:
        for line in f:
            if line.startswith(f"{var_name}="):
                return line.split("=", 1)[1].strip()
    logger.warning(f"{var_name} not found in {env_path}")
    return None

# --- Process Management ---
processes = []

def run_command(cmd, cwd=None):
    logger.info(f"Starting: {cmd} (cwd={cwd})")
    proc = subprocess.Popen(cmd, cwd=cwd, shell=True)
    processes.append(proc)
    return proc

# --- Graceful Shutdown ---
def shutdown(signum, frame):
    logger.info("Shutting down all processes...")
    for proc in processes:
        if proc.poll() is None:
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
    logger.info("All processes stopped. Exiting.")
    sys.exit(0)

signal.signal(signal.SIGINT, shutdown)
signal.signal(signal.SIGTERM, shutdown)

# --- Main Orchestration ---

def main():
    backend_port, frontend_port, ngrok_domain = get_config()

    logger.info(f"Starting backend on port {backend_port}...")
    backend_proc = run_command(f"npm run dev -- --port {backend_port}", cwd="backend")
    time.sleep(2)

    # Detect Next.js and use npx next dev for frontend
    next_config = Path("frontend/next.config.js")
    if next_config.exists():
        logger.info(f"Detected Next.js. Starting frontend with npx next dev on port {frontend_port}...")
        frontend_proc = run_command(f"npx next dev -p {frontend_port}", cwd="frontend")
    else:
        logger.info(f"Starting frontend with npm run dev on port {frontend_port}...")
        frontend_proc = run_command(f"npm run dev -- --port {frontend_port}", cwd="frontend")
    time.sleep(2)

    # Strip protocol from domain for ngrok
    clean_domain = ngrok_domain.replace("https://", "").replace("http://", "")
    logger.info(f"Starting ngrok for frontend on static domain: {clean_domain} (port {frontend_port})...")
    ngrok_cmd = f"ngrok http --domain={clean_domain} {frontend_port}"
    ngrok_proc = run_command(ngrok_cmd)
    time.sleep(2)

    logger.info("All services started. Press Ctrl+C to stop.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        shutdown(None, None)

if __name__ == "__main__":
    main()
