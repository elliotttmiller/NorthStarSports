
import subprocess
import re
import os
import sys
import time

NPM_PATH = r'C:\Program Files\nodejs\npm.cmd'
BACKEND_PATH = os.path.join(os.getcwd(), 'backend')

def run_and_stream(cmd, cwd=None, env=None, url_pattern=None, open_url=False):
    process = subprocess.Popen(cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, env=env)
    url_opened = False
    for line in process.stdout:
        print(line, end='')
        if open_url and not url_opened and url_pattern:
            match = re.search(url_pattern, line)
            if match:
                os.system(f'code --open-url {match.group(1)}')
                url_opened = True
    return process


def main():
    # 1. Start backend server
    print('Starting backend server...')
    backend_proc = subprocess.Popen([NPM_PATH, 'run', 'dev'], cwd=BACKEND_PATH, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

    # Wait for backend to be ready
    backend_ready = False
    for line in backend_proc.stdout:
        print('[backend]', line, end='')
        if 'Backend server running on' in line:
            backend_ready = True
            break
    if not backend_ready:
        print('Backend failed to start.')
        sys.exit(1)

    # 2. Start frontend dev server
    print('Starting frontend dev server...')
    frontend_proc = subprocess.Popen([NPM_PATH, 'run', 'dev'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

    # 3. Stream frontend output and open browser when ready
    url_opened = False
    for line in frontend_proc.stdout:
        print('[frontend]', line, end='')
        if not url_opened:
            match = re.search(r'(http://localhost:\d+)', line)
            if match:
                os.system(f'code --open-url {match.group(1)}')
                url_opened = True

    # Wait for both processes to finish
    backend_proc.wait()
    frontend_proc.wait()

if __name__ == '__main__':
    main()
