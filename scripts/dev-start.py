#!/usr/bin/env python3
"""
Enhanced Development Server Orchestration Script
NorthStar Sports - Full Stack Development Environment

Features:
- Enhanced logging with timestamps and colors
- Health checks for backend/frontend/Redis
- Process management with graceful shutdown
- Environment validation
- Development utilities integration
- Cross-platform compatibility

Usage:
  python dev-start.py                    # Start full stack with browser
  python dev-start.py --no-browser       # Start without opening browser
  python dev-start.py --backend-only     # Start only backend
  python dev-start.py --frontend-only    # Start only frontend
  python dev-start.py --test             # Run comprehensive tests
  python dev-start.py --build            # Build both projects
  python dev-start.py --clean            # Clean all build artifacts
"""

import subprocess
import sys
import time
import webbrowser
import socket
import json
import logging
import os
import signal
import threading
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Tuple

# Configuration
NPM_PATH = r'C:\Program Files\nodejs\npm.cmd' if os.name == 'nt' else 'npm'
BACKEND_PATH = Path.cwd() / 'backend'
FRONTEND_PATH = Path.cwd() / 'frontend'
BACKEND_PORT = 4000
FRONTEND_PORT = 5000
REDIS_HOST = 'redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com'
REDIS_PORT = 19041

# ANSI Colors for enhanced logging
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    END = '\033[0m'

# Enhanced logging setup
logging.basicConfig(
    level=logging.INFO,
    format=f'{Colors.CYAN}[%(asctime)s]{Colors.END} {Colors.BOLD}[%(levelname)s]{Colors.END} %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)

class DevServer:
    def __init__(self):
        self.backend_proc: Optional[subprocess.Popen] = None
        self.frontend_proc: Optional[subprocess.Popen] = None
        self.should_stop = threading.Event()
        
        # Register signal handlers for graceful shutdown
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

    def _signal_handler(self, signum, frame):
        """Handle shutdown signals gracefully"""
        logger.info(f"{Colors.YELLOW}Received shutdown signal. Cleaning up...{Colors.END}")
        self.should_stop.set()
        self.cleanup()
        sys.exit(0)

    def log_success(self, msg: str):
        """Log success messages in green"""
        logger.info(f"{Colors.GREEN}✓ {msg}{Colors.END}")

    def log_warning(self, msg: str):
        """Log warning messages in yellow"""
        logger.warning(f"{Colors.YELLOW}⚠ {msg}{Colors.END}")

    def log_error(self, msg: str):
        """Log error messages in red"""
        logger.error(f"{Colors.RED}✗ {msg}{Colors.END}")

    def log_info(self, msg: str):
        """Log info messages in blue"""
        logger.info(f"{Colors.BLUE}ℹ {msg}{Colors.END}")

    def check_dependencies(self) -> bool:
        """Verify all dependencies are available"""
        self.log_info("Checking dependencies...")
        
        # Check Node.js/npm
        try:
            result = subprocess.run([NPM_PATH, '--version'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                self.log_success(f"npm version: {result.stdout.strip()}")
            else:
                self.log_error("npm not found or not working")
                return False
        except Exception as e:
            self.log_error(f"Error checking npm: {e}")
            return False

        # Check if package.json exists
        if not (BACKEND_PATH / 'package.json').exists():
            self.log_error("Backend package.json not found")
            return False
        
        if not (FRONTEND_PATH / 'package.json').exists():
            self.log_error("Frontend package.json not found")
            return False

        self.log_success("All dependencies verified")
        return True

    def kill_existing_processes(self):
        """Kill any existing backend/frontend processes"""
        self.log_info("Cleaning up existing processes...")
        
        if os.name == 'nt':  # Windows
            commands = [
                'taskkill /F /IM node.exe /T',
                'taskkill /F /IM nodemon.exe /T',
                f'netstat -ano | findstr :{BACKEND_PORT} | for /f "tokens=5" %%a in (\'more\') do taskkill /F /PID %%a',
                f'netstat -ano | findstr :{FRONTEND_PORT} | for /f "tokens=5" %%a in (\'more\') do taskkill /F /PID %%a'
            ]
        else:  # Unix/Linux/macOS
            commands = [
                'pkill -f node',
                'pkill -f nodemon',
                f'lsof -ti tcp:{BACKEND_PORT} | xargs kill -9',
                f'lsof -ti tcp:{FRONTEND_PORT} | xargs kill -9'
            ]
        
        for cmd in commands:
            try:
                subprocess.run(cmd, shell=True, capture_output=True)
            except:
                pass  # Ignore errors - processes might not exist
        
        time.sleep(2)  # Give processes time to die
        self.log_success("Process cleanup completed")

    def verify_redis_connection(self) -> bool:
        """Verify connection to Redis Cloud"""
        self.log_info("Verifying Redis Cloud connection...")
        
        for attempt in range(10):
            try:
                sock = socket.create_connection((REDIS_HOST, REDIS_PORT), timeout=3)
                sock.close()
                self.log_success("Redis Cloud connection verified")
                return True
            except Exception as e:
                if attempt < 9:
                    self.log_warning(f"Redis attempt {attempt + 1}/10 failed: {e}")
                    time.sleep(2)
                else:
                    self.log_error(f"Redis connection failed after 10 attempts: {e}")
                    return False
        return False

    def wait_for_service(self, port: int, service_name: str, timeout: int = 60) -> bool:
        """Wait for a service to be available on specified port"""
        self.log_info(f"Waiting for {service_name} on port {port}...")
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            if self.should_stop.is_set():
                return False
                
            try:
                with socket.create_connection(("localhost", port), timeout=2):
                    self.log_success(f"{service_name} is ready on port {port}")
                    return True
            except:
                time.sleep(1)
        
        self.log_error(f"{service_name} failed to start on port {port} within {timeout}s")
        return False

    def start_backend(self) -> bool:
        """Start the backend server"""
        self.log_info("Starting backend server...")
        
        try:
            self.backend_proc = subprocess.Popen(
                [NPM_PATH, 'run', 'dev'],
                cwd=BACKEND_PATH,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
                bufsize=1
            )
            
            # Start logging thread for backend
            threading.Thread(
                target=self._log_process_output,
                args=(self.backend_proc, "BACKEND"),
                daemon=True
            ).start()
            
            if self.wait_for_service(BACKEND_PORT, "Backend"):
                return True
                
        except Exception as e:
            self.log_error(f"Failed to start backend: {e}")
            
        return False

    def start_frontend(self) -> bool:
        """Start the frontend server"""
        self.log_info("Starting frontend server...")
        
        try:
            self.frontend_proc = subprocess.Popen(
                [NPM_PATH, 'run', 'dev'],
                cwd=FRONTEND_PATH,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
                bufsize=1
            )
            
            # Start logging thread for frontend
            threading.Thread(
                target=self._log_process_output,
                args=(self.frontend_proc, "FRONTEND"),
                daemon=True
            ).start()
            
            if self.wait_for_service(FRONTEND_PORT, "Frontend"):
                return True
                
        except Exception as e:
            self.log_error(f"Failed to start frontend: {e}")
            
        return False

    def _log_process_output(self, process: subprocess.Popen, prefix: str):
        """Log output from a subprocess with prefix"""
        while process.poll() is None:
            try:
                line = process.stdout.readline()
                if line:
                    # Color code the output based on service
                    color = Colors.MAGENTA if prefix == "BACKEND" else Colors.CYAN
                    logger.info(f"{color}[{prefix}]{Colors.END} {line.strip()}")
            except:
                break

    def run_tests(self) -> bool:
        """Run comprehensive tests"""
        self.log_info("Running comprehensive test suite...")
        
        # Run backend tests
        try:
            self.log_info("Running backend tests...")
            result = subprocess.run(
                [NPM_PATH, 'test'],
                cwd=BACKEND_PATH,
                capture_output=True,
                text=True
            )
            if result.returncode == 0:
                self.log_success("Backend tests passed")
            else:
                self.log_warning("Backend tests had issues")
                logger.info(result.stdout)
        except Exception as e:
            self.log_error(f"Backend test error: {e}")

        # Run frontend tests
        try:
            self.log_info("Running frontend tests...")
            result = subprocess.run(
                [NPM_PATH, 'test'],
                cwd=FRONTEND_PATH,
                capture_output=True,
                text=True
            )
            if result.returncode == 0:
                self.log_success("Frontend tests passed")
            else:
                self.log_warning("Frontend tests had issues")
                logger.info(result.stdout)
        except Exception as e:
            self.log_error(f"Frontend test error: {e}")

        # Run API endpoint tests
        try:
            self.log_info("Running API endpoint tests...")
            test_script = Path.cwd() / 'test-all-endpoints.ps1'
            if test_script.exists():
                if os.name == 'nt':
                    subprocess.run(['powershell', '-File', str(test_script)], check=True)
                else:
                    self.log_warning("PowerShell tests not available on this platform")
                self.log_success("API endpoint tests completed")
            else:
                self.log_warning("API test script not found")
        except Exception as e:
            self.log_error(f"API test error: {e}")

        return True

    def build_projects(self) -> bool:
        """Build both backend and frontend"""
        self.log_info("Building projects...")
        
        # Build backend
        try:
            self.log_info("Building backend...")
            result = subprocess.run(
                [NPM_PATH, 'run', 'build'],
                cwd=BACKEND_PATH,
                check=True
            )
            self.log_success("Backend build completed")
        except Exception as e:
            self.log_error(f"Backend build failed: {e}")
            return False

        # Build frontend
        try:
            self.log_info("Building frontend...")
            result = subprocess.run(
                [NPM_PATH, 'run', 'build'],
                cwd=FRONTEND_PATH,
                check=True
            )
            self.log_success("Frontend build completed")
        except Exception as e:
            self.log_error(f"Frontend build failed: {e}")
            return False

        return True

    def clean_projects(self):
        """Clean build artifacts"""
        self.log_info("Cleaning build artifacts...")
        
        # Clean backend
        try:
            subprocess.run([NPM_PATH, 'run', 'clean'], cwd=BACKEND_PATH)
        except:
            pass

        # Clean common build directories
        for path in [BACKEND_PATH / 'dist', FRONTEND_PATH / 'dist', FRONTEND_PATH / 'build']:
            if path.exists():
                import shutil
                shutil.rmtree(path)
                self.log_success(f"Removed {path}")

    def cleanup(self):
        """Clean up all processes"""
        if self.backend_proc:
            self.backend_proc.terminate()
        if self.frontend_proc:
            self.frontend_proc.terminate()
        
        # Give processes time to terminate gracefully
        time.sleep(2)
        
        if self.backend_proc and self.backend_proc.poll() is None:
            self.backend_proc.kill()
        if self.frontend_proc and self.frontend_proc.poll() is None:
            self.frontend_proc.kill()

    def show_status(self):
        """Show development server status"""
        self.log_info("Development Environment Status:")
        
        # Check ports
        for port, service in [(BACKEND_PORT, "Backend"), (FRONTEND_PORT, "Frontend")]:
            try:
                with socket.create_connection(("localhost", port), timeout=1):
                    self.log_success(f"{service} is running on port {port}")
            except:
                self.log_warning(f"{service} is not running on port {port}")
        
        # Check Redis
        if self.verify_redis_connection():
            self.log_success("Redis Cloud is accessible")
        else:
            self.log_warning("Redis Cloud is not accessible")

    def main(self):
        """Main application entry point"""
        args = sys.argv[1:]
        
        # Handle command line arguments
        if '--help' in args or '-h' in args:
            print(__doc__)
            return
            
        if '--status' in args:
            self.show_status()
            return
            
        if '--test' in args:
            if not self.check_dependencies():
                sys.exit(1)
            self.run_tests()
            return
            
        if '--build' in args:
            if not self.check_dependencies():
                sys.exit(1)
            self.build_projects()
            return
            
        if '--clean' in args:
            self.clean_projects()
            return

        # Verify environment
        if not self.check_dependencies():
            sys.exit(1)
            
        # Clean up existing processes
        self.kill_existing_processes()
        
        # Verify Redis connection
        if not self.verify_redis_connection():
            self.log_error("Redis connection failed. Please check your connection.")
            sys.exit(1)

        try:
            backend_only = '--backend-only' in args
            frontend_only = '--frontend-only' in args
            no_browser = '--no-browser' in args

            if not frontend_only:
                if not self.start_backend():
                    sys.exit(1)

            if not backend_only:
                if not self.start_frontend():
                    sys.exit(1)
                    
                # Open browser if requested
                if not no_browser and not backend_only:
                    time.sleep(2)
                    self.log_info("Opening browser...")
                    webbrowser.open(f'http://localhost:{FRONTEND_PORT}')

            self.log_success("Development environment is ready!")
            self.log_info("Press Ctrl+C to stop all services")
            
            # Wait for processes
            while not self.should_stop.is_set():
                time.sleep(1)
                
                # Check if processes are still running
                if self.backend_proc and self.backend_proc.poll() is not None:
                    self.log_warning("Backend process exited")
                    break
                if self.frontend_proc and self.frontend_proc.poll() is not None:
                    self.log_warning("Frontend process exited")
                    break

        except KeyboardInterrupt:
            self.log_info("Shutdown requested by user")
        finally:
            self.cleanup()
            self.log_success("Development environment stopped")

if __name__ == '__main__':
    server = DevServer()
    server.main()
