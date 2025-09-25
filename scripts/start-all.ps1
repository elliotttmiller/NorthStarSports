# Start All NorthStarSports Services and Ngrok
# Professional clean restart/startup with unified real-time logs

# Stop any running node or ngrok processes
Get-Process -Name node,ngrok -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean npm caches (optional, for a truly clean start)
npm cache clean --force

# Start backend
Write-Host "[START] Backend server..." -ForegroundColor Cyan
Start-Process -NoNewWindow -PassThru -FilePath "pwsh" -ArgumentList "-Command", "cd backend; npm run dev" | Out-Null

# Start frontend
Write-Host "[START] Frontend server..." -ForegroundColor Cyan
Start-Process -NoNewWindow -PassThru -FilePath "pwsh" -ArgumentList "-Command", "cd frontend; npm run dev" | Out-Null

Start-Sleep -Seconds 5 # Wait for servers to start



# Prompt user for which service to expose via ngrok
$ngrokPort = $null
Write-Host "[NGROK] Which service do you want to expose externally?" -ForegroundColor Yellow
Write-Host "1. Backend (port 4000)" -ForegroundColor Cyan
Write-Host "2. Frontend (port 5173)" -ForegroundColor Cyan
$choice = Read-Host "Enter 1 for backend or 2 for frontend"
if ($choice -eq "1") {
	$ngrokPort = 4000
	Write-Host "[NGROK] Exposing backend on ngrok..." -ForegroundColor Green
} elseif ($choice -eq "2") {
	$ngrokPort = 5173
	Write-Host "[NGROK] Exposing frontend on ngrok..." -ForegroundColor Green
} else {
	Write-Host "[NGROK] Invalid choice. No ngrok tunnel started." -ForegroundColor Red
}
if ($ngrokPort) {
	Start-Process -NoNewWindow -PassThru -FilePath "$env:APPDATA\npm\ngrok.cmd" -ArgumentList "http", "--domain=noninherently-fractional-aleshia.ngrok-free.app", "$ngrokPort" | Out-Null
}

# Stream real-time console output for backend and frontend
Write-Host "[LOGS] Streaming backend and frontend output..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop all services."
Write-Host "View ngrok tunnel status in your browser at https://dashboard.ngrok.com/"
