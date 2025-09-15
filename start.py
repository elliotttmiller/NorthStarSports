


import subprocess
import re
import os
import sys
import time
import webbrowser
import logging

NPM_PATH = r'C:\Program Files\nodejs\npm.cmd'
BACKEND_PATH = os.path.join(os.getcwd(), 'backend')
FRONTEND_PATH = os.path.join(os.getcwd(), 'frontend')


logging.basicConfig(format='[%(levelname)s] %(message)s', level=logging.INFO)
def print_status(msg):
    logging.info(msg)

def kill_backend_processes():
    print_status('Killing any running backend processes...')
    # Try to kill node and nodemon processes (cross-platform)
    if os.name == 'nt':
        subprocess.call('taskkill /F /IM node.exe /T', shell=True)
        subprocess.call('taskkill /F /IM nodemon.exe /T', shell=True)
    else:
        subprocess.call('pkill -f node', shell=True)
        subprocess.call('pkill -f nodemon', shell=True)

def verify_redis_connection():
    import socket
    from time import sleep
    REDIS_HOST = 'redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com'
    REDIS_PORT = 19041
    print_status('Verifying connection to Redis Cloud...')
    for _ in range(10):
        try:
            sock = socket.create_connection((REDIS_HOST, REDIS_PORT), timeout=3)
            sock.close()
            print_status('Redis Cloud connection verified.')
            return True
        except Exception as e:
            print_status(f'Redis not reachable yet: {e}')
            sleep(2)
    print('Failed to connect to Redis Cloud. Exiting.')
    sys.exit(1)

def main():
    no_browser = '--no-browser' in sys.argv
    kill_backend_processes()
    verify_redis_connection()
    print_status('Starting backend server...')

    try:
        backend_proc = subprocess.Popen(
            [NPM_PATH, 'run', 'dev'],
            cwd=BACKEND_PATH,
            stdout=sys.stdout,
            stderr=sys.stderr,
        )
    except FileNotFoundError:
        logging.error('Error: npm not found. Please ensure Node.js and npm are installed.')
        sys.exit(1)

    # Wait for backend to be ready (simple sleep, user will see logs directly)
    time.sleep(3)

    print_status('Backend ready (check above for logs). Starting frontend dev server...')
    try:
        frontend_proc = subprocess.Popen(
            [NPM_PATH, 'run', 'dev'],
            cwd=FRONTEND_PATH,
            stdout=sys.stdout,
            stderr=sys.stderr,
        )
    except FileNotFoundError:
        logging.error('Error: npm not found. Please ensure Node.js and npm are installed.')
        backend_proc.terminate()
        sys.exit(1)


    print_status('Both backend and frontend have exited.')
    backend_proc.wait()
    frontend_proc.wait()

if __name__ == '__main__':
    main()
