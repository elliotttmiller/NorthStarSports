import subprocess
import os
import time
import re

def run_command(cmd, cwd=None):
    return subprocess.Popen(cmd, cwd=cwd, shell=True)

def get_env_domain(env_path, var_name):
    if not os.path.exists(env_path):
        print(f"[ENV] .env file not found at {env_path}")
        return None
    with open(env_path, "r") as f:
        for line in f:
            match = re.match(rf"^{var_name}=(.+)", line)
            if match:
                url = match.group(1).strip()
                # Remove protocol for ngrok --url param
                domain = url.replace("https://", "").replace("http://", "")
                return domain
    print(f"[ENV] {var_name} not found in {env_path}")
    return None

def main():
    print("[CLEAN] Stopping any running node, ngrok processes...")
    for proc in ["node", "ngrok"]:
        subprocess.call(f"taskkill /F /IM {proc}.exe", shell=True)

    print("[CLEAN] Cleaning npm cache...")
    subprocess.call("npm cache clean --force", shell=True)

    print("[START] Backend server...")
    backend_proc = run_command("npm run dev", cwd="backend")

    print("[START] Frontend server...")
    frontend_proc = run_command("npm run dev", cwd="frontend")

    time.sleep(5)  # Wait for servers to start

    # Read custom domain from .env
    env_path = os.path.join("frontend", ".env")
    var_name = "PUBLIC_DOMAIN_URL"
    custom_domain = get_env_domain(env_path, var_name)
    if not custom_domain:
        custom_domain = "nssportsclub.ngrok.app"  # fallback
    print(f"[NGROK] Exposing frontend (UI) on ngrok with custom domain: {custom_domain} ...")
    ngrok_port = "3000"
    ngrok_cmd = f"ngrok http --url={custom_domain} {ngrok_port}"
    ngrok_proc = run_command(ngrok_cmd)
    time.sleep(5)  # Wait for ngrok to start

    print("[LOGS] Streaming backend, frontend, and ngrok output...")

if __name__ == "__main__":
    main()
