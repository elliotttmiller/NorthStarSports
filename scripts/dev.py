"""
dev.py - NorthStar Sports Development Environment Orchestrator

This script provides the single, canonical entry point for starting all necessary
services for local development. It is architected for the project's specific
monorepo structure and development requirements.

This script's default, non-optional behavior is to:
1. Terminate any existing processes on the required frontend and backend ports.
2. Start the backend service.
3. Start the frontend service (Next.js).
4. Start an ngrok public tunnel to the frontend using a static domain.

It manages all processes it starts and ensures a graceful shutdown on Ctrl+C.

# --- How to Use ---
#
# 1. Standard Startup:
#    - From your repository root, run the script. It will automatically clear
#      the necessary ports before starting the services.
#      python dev.py
#
# 2. Customize Ports:
#    - The script will clear and use the ports you specify.
#      python dev.py --frontend-port 3001 --backend-port 4001
#
"""
import subprocess
import os
import sys
import time
import signal
import argparse
import logging
from pathlib import Path
from typing import List, Optional
from urllib.parse import urlparse
from dotenv import load_dotenv

# --- 1. Global Configuration & Logging ---
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(name)s] %(levelname)s: %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("Orchestrator")

processes: List[subprocess.Popen] = []


# --- 2. Graceful Shutdown Handler ---
def shutdown_handler(signum, frame):
    """Gracefully terminates all child processes started by this script."""
    logger.info("Shutdown signal received. Terminating all services...")
    for proc in reversed(processes):
        if proc.poll() is None:
            try:
                if sys.platform == "win32":
                    proc.kill()
                else:
                    proc.terminate()
                proc.wait(timeout=5)
                logger.info(f"Process {proc.pid} terminated gracefully.")
            except subprocess.TimeoutExpired:
                logger.warning(f"Process {proc.pid} did not terminate in time. Forcing kill.")
                proc.kill()
    logger.info("All services stopped. Exiting.")
    sys.exit(0)

signal.signal(signal.SIGINT, shutdown_handler)
signal.signal(signal.SIGTERM, shutdown_handler)


# --- 3. Port & Process Management Utilities ---
def kill_process_on_port(port: int):
    """Finds and terminates a process running on a specific port."""
    logger.info(f"Attempting to clear port {port}...")
    try:
        if sys.platform == "win32":
            command = f"netstat -ano | findstr :{port}"
            output = subprocess.check_output(command, shell=True, text=True, stderr=subprocess.DEVNULL)
            if not output:
                logger.info(f"Port {port} is already clear.")
                return
            pid = output.strip().split()[-1]
            logger.warning(f"Found process with PID {pid} on port {port}. Terminating...")
            subprocess.run(f"taskkill /F /PID {pid}", shell=True, check=True, stdout=subprocess.DEVNULL)
        else:  # macOS and Linux
            command = f"lsof -ti tcp:{port}"
            output = subprocess.check_output(command, shell=True, text=True, stderr=subprocess.DEVNULL)
            if not output:
                logger.info(f"Port {port} is already clear.")
                return
            pid = output.strip()
            logger.warning(f"Found process with PID {pid} on port {port}. Terminating...")
            subprocess.run(f"kill -9 {pid}", shell=True, check=True, stdout=subprocess.DEVNULL)
        logger.info(f"Successfully cleared port {port}.")
    except (subprocess.CalledProcessError, FileNotFoundError):
        logger.info(f"Port {port} is already clear.")
    except Exception as e:
        logger.error(f"An unexpected error occurred while trying to clear port {port}: {e}")

def run_command(command: List[str], cwd: Path, env_update: dict = None):
    """Starts a command and registers it for shutdown."""
    process_env = os.environ.copy()
    if env_update:
        process_env.update(env_update)
    
    logger.info(f"Executing command: `{' '.join(command)}` in `{cwd}`")
    try:
        use_shell = sys.platform == "win32"
        proc = subprocess.Popen(command, cwd=str(cwd), env=process_env, shell=use_shell)
        processes.append(proc)
        return proc
    except FileNotFoundError:
        logger.error(f"Command not found: `{command[0]}`. Is it installed and in your PATH?")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Failed to start command `{' '.join(command)}`: {e}")
        sys.exit(1)


# --- 4. Configuration Loader ---
def get_ngrok_domain(args: argparse.Namespace) -> Optional[str]:
    """Determines the ngrok domain based on a defined hierarchy."""
    if args.ngrok_domain:
        logger.info(f"Using ngrok domain from command-line argument: {args.ngrok_domain}")
        return args.ngrok_domain
    shell_env_var = os.getenv("NGROK_STATIC_DOMAIN")
    if shell_env_var:
        logger.info(f"Using ngrok domain from shell environment variable NGROK_STATIC_DOMAIN: {shell_env_var}")
        return shell_env_var
    dotenv_path = Path("frontend/.env.local")
    if dotenv_path.exists():
        load_dotenv(dotenv_path=dotenv_path)
        dotenv_var = os.getenv("NEXT_PUBLIC_APP_URL")
        if dotenv_var:
            logger.info(f"Using ngrok domain from NEXT_PUBLIC_APP_URL in {dotenv_path}: {dotenv_var}")
            return dotenv_var
    return None


# --- 5. Main Orchestration Logic ---
def main():
    """Parses arguments and starts the development services."""
    parser = argparse.ArgumentParser(description="NorthStar Sports Development Orchestrator")
    parser.add_argument("--frontend-port", type=int, default=3000, help="Port for the frontend service.")
    parser.add_argument("--backend-port", type=int, default=4000, help="Port for the backend service.")
    parser.add_argument("--ngrok-domain", type=str, help="Override the ngrok domain from environment variables.")
    args = parser.parse_args()

    # --- Pre-flight Check: Clear Ports (Non-Optional Default Behavior) ---
    logger.info("Ensuring a clean slate by clearing required ports before startup...")
    kill_process_on_port(args.frontend_port)
    kill_process_on_port(args.backend_port)

    ngrok_url = get_ngrok_domain(args)
    if not ngrok_url:
        logger.error("Configuration error: ngrok domain not found.")
        logger.error("Please provide it via --ngrok-domain, NGROK_STATIC_DOMAIN, or NEXT_PUBLIC_APP_URL in frontend/.env.local.")
        sys.exit(1)

    # --- Service Startup ---
    logger.info("Starting Backend Service...")
    run_command(["npm", "run", "dev:backend"], cwd=Path.cwd(), env_update={"PORT": str(args.backend_port)})
    time.sleep(5)

    logger.info("Starting Frontend Service...")
    run_command(["npm", "run", "dev:port", "--workspace=@northstar/frontend"], cwd=Path.cwd())
    time.sleep(10)

    # --- Ngrok Tunnel ---
    parsed_url = urlparse(ngrok_url)
    clean_domain = parsed_url.netloc or parsed_url.path
    
    logger.info(f"Starting ngrok tunnel for frontend port {args.frontend_port} at domain {clean_domain}...")
    run_command(["ngrok", "http", f"--domain={clean_domain}", str(args.frontend_port)], cwd=Path.cwd())
    time.sleep(2)

    logger.info("All services are running.")
    logger.info(f"Frontend accessible locally at http://localhost:{args.frontend_port}")
    logger.info(f"Frontend accessible publicly at {ngrok_url}")
    logger.info(f"Backend accessible at http://localhost:{args.backend_port}")
    logger.info("Press Ctrl+C to stop all services.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        shutdown_handler(None, None)


if __name__ == "__main__":
    main()


"""

### **How to Use the New Script**

The workflow is now simpler and more declarative.

1.  **Ensure Configuration is Correct:**
    *   Your `backend/.env.local` file **must** contain the line:
        `FRONTEND_URL="https://nssportsclub.ngrok.app"`

2.  **Run the Orchestrator:**
    *   From your **repository root**, run the script.
        ```bash
        python dev.py
        ```

3.  **Customize Ports (Optional):**
    *   If you need to run on different ports, you can still do so.
        ```bash
        python dev.py --frontend-port 3001 --backend-port 4001

"""