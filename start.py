

import subprocess
import re
import os
import sys
import time
import webbrowser

NPM_PATH = r'C:\Program Files\nodejs\npm.cmd'
BACKEND_PATH = os.path.join(os.getcwd(), 'backend')
FRONTEND_PATH = os.path.join(os.getcwd(), 'frontend')

def print_status(msg):
    print(f'\033[96m[status]\033[0m {msg}')

def main():
    no_browser = '--no-browser' in sys.argv
    print_status('Starting backend server...')
    try:
        backend_proc = subprocess.Popen([NPM_PATH, 'run', 'dev'], cwd=BACKEND_PATH, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace')
    except FileNotFoundError:
        print('Error: npm not found. Please ensure Node.js and npm are installed.')
        sys.exit(1)

    # Wait for backend to be ready
    backend_ready = False
    for line in backend_proc.stdout:
        try:
            print('[backend]', line, end='')
        except UnicodeEncodeError:
            print('[backend]', line.encode('utf-8', errors='replace').decode('cp1252', errors='replace'), end='')
        if 'Backend server running on' in line or 'Server listening' in line or 'listening on' in line:
            backend_ready = True
            break
    if not backend_ready:
        print('Backend failed to start. Check logs above.')
        sys.exit(1)

    print_status('Backend ready. Starting frontend dev server...')
    try:
        frontend_proc = subprocess.Popen([NPM_PATH, 'run', 'dev'], cwd=FRONTEND_PATH, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace')
    except FileNotFoundError:
        print('Error: npm not found. Please ensure Node.js and npm are installed.')
        backend_proc.terminate()
        sys.exit(1)

    url_opened = False
    frontend_url = None
    for line in frontend_proc.stdout:
        try:
            print('[frontend]', line, end='')
        except UnicodeEncodeError:
            print('[frontend]', line.encode('utf-8', errors='replace').decode('cp1252', errors='replace'), end='')
        if not url_opened:
            match = re.search(r'(http://localhost:\d+)', line)
            if match:
                frontend_url = match.group(1)
                print_status(f'Frontend running at {frontend_url}')
                if not no_browser:
                    try:
                        webbrowser.open(frontend_url)
                        print_status('Browser opened.')
                    except Exception as e:
                        print(f'Could not open browser: {e}')
                url_opened = True

    print_status('Both backend and frontend have exited.')
    backend_proc.wait()
    frontend_proc.wait()

if __name__ == '__main__':
    main()
