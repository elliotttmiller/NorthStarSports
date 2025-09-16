# Development Environment Management Scripts
# NorthStar Sports - PowerShell Development Utilities

<#
.SYNOPSIS
    Comprehensive development scripts for NorthStar Sports full-stack application

.DESCRIPTION
    This script provides utilities for:
    - Project building and testing
    - Environment management
    - Database operations
    - Deployment preparation
    - Code quality checks

.EXAMPLE
    .\dev-tools.ps1 -Action Build
    .\dev-tools.ps1 -Action Test
    .\dev-tools.ps1 -Action Deploy
#>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("Build", "Test", "Clean", "Install", "Lint", "Format", "Deploy", "Status", "Reset", "Backup")]
    [string]$Action,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("Backend", "Frontend", "All")]
    [string]$Target = "All",
    
    [Parameter(Mandatory=$false)]
    [switch]$ShowDetails,
    
    [Parameter(Mandatory=$false)]
    [switch]$Force
)

# Configuration
$BackendPath = Join-Path $PSScriptRoot "backend"
$FrontendPath = Join-Path $PSScriptRoot "frontend"
$LogPath = Join-Path $PSScriptRoot "logs"
$BackupPath = Join-Path $PSScriptRoot "backups"

# Ensure log directory exists
if (-not (Test-Path $LogPath)) {
    New-Item -ItemType Directory -Path $LogPath -Force | Out-Null
}

# Enhanced logging with colors and timestamps
function Write-Status {
    param([string]$Message, [string]$Type = "INFO")
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    $color = switch ($Type) {
        "SUCCESS" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR"   { "Red" }
        "INFO"    { "Cyan" }
        default   { "White" }
    }
    
    Write-Host "[$timestamp] " -NoNewline -ForegroundColor Gray
    Write-Host "[$Type] " -NoNewline -ForegroundColor $color
    Write-Host $Message
    
    # Also log to file
    $logFile = Join-Path $LogPath "dev-$(Get-Date -Format 'yyyy-MM-dd').log"
    "[$timestamp] [$Type] $Message" | Out-File -FilePath $logFile -Append
}

function Test-Prerequisites {
    Write-Status "Checking prerequisites..." "INFO"
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-Status "Node.js version: $nodeVersion" "SUCCESS"
    } catch {
        Write-Status "Node.js not found. Please install Node.js" "ERROR"
        return $false
    }
    
    # Check npm
    try {
        $npmVersion = npm --version
        Write-Status "npm version: $npmVersion" "SUCCESS"
    } catch {
        Write-Status "npm not found" "ERROR"
        return $false
    }
    
    # Check Redis connection
    Write-Status "Testing Redis connection..." "INFO"
    $redisHost = "redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com"
    $redisPort = 19041
    
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $tcpClient.Connect($redisHost, $redisPort)
        $tcpClient.Close()
        Write-Status "Redis Cloud connection verified" "SUCCESS"
    } catch {
        Write-Status "Redis Cloud connection failed: $($_.Exception.Message)" "WARNING"
    }
    
    return $true
}

function Invoke-Build {
    param([string]$Target)
    
    Write-Status "Starting build process for $Target..." "INFO"
    
    if ($Target -eq "Backend" -or $Target -eq "All") {
        Write-Status "Building backend..." "INFO"
        Push-Location $BackendPath
        try {
            # Clean first
            if (Test-Path "dist") {
                Remove-Item -Recurse -Force "dist"
                Write-Status "Cleaned backend dist folder" "SUCCESS"
            }
            
            # Type check
            npm run type-check
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Backend type checking passed" "SUCCESS"
            } else {
                Write-Status "Backend type checking failed" "ERROR"
                return $false
            }
            
            # Build
            npm run build
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Backend build completed" "SUCCESS"
            } else {
                Write-Status "Backend build failed" "ERROR"
                return $false
            }
        } finally {
            Pop-Location
        }
    }
    
    if ($Target -eq "Frontend" -or $Target -eq "All") {
        Write-Status "Building frontend..." "INFO"
        Push-Location $FrontendPath
        try {
            # Clean first
            if (Test-Path "dist") {
                Remove-Item -Recurse -Force "dist"
                Write-Status "Cleaned frontend dist folder" "SUCCESS"
            }
            
            # Type check
            npm run type-check
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Frontend type checking passed" "SUCCESS"
            } else {
                Write-Status "Frontend type checking failed" "ERROR"
                return $false
            }
            
            # Build
            npm run build
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Frontend build completed" "SUCCESS"
            } else {
                Write-Status "Frontend build failed" "ERROR"
                return $false
            }
        } finally {
            Pop-Location
        }
    }
    
    return $true
}

function Invoke-Test {
    param([string]$Target)
    
    Write-Status "Starting test suite for $Target..." "INFO"
    
    $testResults = @()
    
    if ($Target -eq "Backend" -or $Target -eq "All") {
        Write-Status "Running backend tests..." "INFO"
        Push-Location $BackendPath
        try {
            npm test
            $backendResult = $LASTEXITCODE -eq 0
            $testResults += @{ Component = "Backend"; Success = $backendResult }
            
            if ($backendResult) {
                Write-Status "Backend tests passed" "SUCCESS"
            } else {
                Write-Status "Backend tests failed" "ERROR"
            }
        } finally {
            Pop-Location
        }
    }
    
    if ($Target -eq "Frontend" -or $Target -eq "All") {
        Write-Status "Running frontend tests..." "INFO"
        Push-Location $FrontendPath
        try {
            npm test
            $frontendResult = $LASTEXITCODE -eq 0
            $testResults += @{ Component = "Frontend"; Success = $frontendResult }
            
            if ($frontendResult) {
                Write-Status "Frontend tests passed" "SUCCESS"
            } else {
                Write-Status "Frontend tests failed" "ERROR"
            }
        } finally {
            Pop-Location
        }
    }
    
    # Run API endpoint tests if available
    if ($Target -eq "All") {
        $endpointTestScript = Join-Path $PSScriptRoot "test-all-endpoints.ps1"
        if (Test-Path $endpointTestScript) {
            Write-Status "Running API endpoint tests..." "INFO"
            & $endpointTestScript
            $apiResult = $LASTEXITCODE -eq 0
            $testResults += @{ Component = "API Endpoints"; Success = $apiResult }
        }
    }
    
    # Summary
    Write-Status "Test Results Summary:" "INFO"
    foreach ($result in $testResults) {
        $status = if ($result.Success) { "PASSED" } else { "FAILED" }
        $color = if ($result.Success) { "SUCCESS" } else { "ERROR" }
        Write-Status "$($result.Component): $status" $color
    }
    
    return $testResults
}

function Invoke-Clean {
    param([string]$Target)
    
    Write-Status "Cleaning $Target..." "INFO"
    
    if ($Target -eq "Backend" -or $Target -eq "All") {
        Push-Location $BackendPath
        try {
            # Clean dist folder
            if (Test-Path "dist") {
                Remove-Item -Recurse -Force "dist"
                Write-Status "Cleaned backend dist folder" "SUCCESS"
            }
            
            # Clean node_modules if force flag is used
            if ($Force -and (Test-Path "node_modules")) {
                Remove-Item -Recurse -Force "node_modules"
                Write-Status "Cleaned backend node_modules" "SUCCESS"
            }
        } finally {
            Pop-Location
        }
    }
    
    if ($Target -eq "Frontend" -or $Target -eq "All") {
        Push-Location $FrontendPath
        try {
            # Clean dist/build folders
            foreach ($folder in @("dist", "build")) {
                if (Test-Path $folder) {
                    Remove-Item -Recurse -Force $folder
                    Write-Status "Cleaned frontend $folder folder" "SUCCESS"
                }
            }
            
            # Clean node_modules if force flag is used
            if ($Force -and (Test-Path "node_modules")) {
                Remove-Item -Recurse -Force "node_modules"
                Write-Status "Cleaned frontend node_modules" "SUCCESS"
            }
        } finally {
            Pop-Location
        }
    }
    
    # Clean logs if force flag is used
    if ($Force -and (Test-Path $LogPath)) {
        Get-ChildItem $LogPath -Filter "*.log" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } | Remove-Item
        Write-Status "Cleaned old log files" "SUCCESS"
    }
}

function Invoke-Install {
    param([string]$Target)
    
    Write-Status "Installing dependencies for $Target..." "INFO"
    
    if ($Target -eq "Backend" -or $Target -eq "All") {
        Write-Status "Installing backend dependencies..." "INFO"
        Push-Location $BackendPath
        try {
            npm install
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Backend dependencies installed" "SUCCESS"
            } else {
                Write-Status "Backend dependency installation failed" "ERROR"
                return $false
            }
        } finally {
            Pop-Location
        }
    }
    
    if ($Target -eq "Frontend" -or $Target -eq "All") {
        Write-Status "Installing frontend dependencies..." "INFO"
        Push-Location $FrontendPath
        try {
            npm install
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Frontend dependencies installed" "SUCCESS"
            } else {
                Write-Status "Frontend dependency installation failed" "ERROR"
                return $false
            }
        } finally {
            Pop-Location
        }
    }
    
    return $true
}

function Invoke-Lint {
    param([string]$Target)
    
    Write-Status "Running linting for $Target..." "INFO"
    
    if ($Target -eq "Backend" -or $Target -eq "All") {
        Write-Status "Linting backend..." "INFO"
        Push-Location $BackendPath
        try {
            npm run lint
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Backend linting passed" "SUCCESS"
            } else {
                Write-Status "Backend linting issues found" "WARNING"
            }
        } finally {
            Pop-Location
        }
    }
    
    if ($Target -eq "Frontend" -or $Target -eq "All") {
        Write-Status "Linting frontend..." "INFO"
        Push-Location $FrontendPath
        try {
            npm run lint
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Frontend linting passed" "SUCCESS"
            } else {
                Write-Status "Frontend linting issues found" "WARNING"
            }
        } finally {
            Pop-Location
        }
    }
}

function Get-ProjectStatus {
    Write-Status "Project Status Report" "INFO"
    Write-Status "=====================" "INFO"
    
    # Check running processes
    $backendRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$BackendPath*" }
    $frontendRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$FrontendPath*" }
    
    Write-Status "Backend Process: $(if ($backendRunning) { 'Running' } else { 'Stopped' })" "INFO"
    Write-Status "Frontend Process: $(if ($frontendRunning) { 'Running' } else { 'Stopped' })" "INFO"
    
    # Check ports
    try {
        $backendPort = Test-NetConnection -ComputerName "localhost" -Port 4000 -InformationLevel Quiet
        Write-Status "Backend Port (4000): $(if ($backendPort) { 'Open' } else { 'Closed' })" "INFO"
    } catch {
        Write-Status "Backend Port (4000): Unavailable" "WARNING"
    }
    
    try {
        $frontendPort = Test-NetConnection -ComputerName "localhost" -Port 5000 -InformationLevel Quiet
        Write-Status "Frontend Port (5000): $(if ($frontendPort) { 'Open' } else { 'Closed' })" "INFO"
    } catch {
        Write-Status "Frontend Port (5000): Unavailable" "WARNING"
    }
    
    # Check build artifacts
    $backendBuild = Test-Path (Join-Path $BackendPath "dist")
    $frontendBuild = Test-Path (Join-Path $FrontendPath "dist")
    
    Write-Status "Backend Build: $(if ($backendBuild) { 'Available' } else { 'Missing' })" "INFO"
    Write-Status "Frontend Build: $(if ($frontendBuild) { 'Available' } else { 'Missing' })" "INFO"
    
    # Git status
    try {
        $gitStatus = git status --porcelain
        if ($gitStatus) {
            Write-Status "Git Status: Uncommitted changes" "WARNING"
            if ($ShowDetails) {
                Write-Status "Changed files:" "INFO"
                $gitStatus | ForEach-Object { Write-Status "  $_" "INFO" }
            }
        } else {
            Write-Status "Git Status: Clean" "SUCCESS"
        }
    } catch {
        Write-Status "Git Status: Not available" "WARNING"
    }
}

function Invoke-Backup {
    Write-Status "Creating project backup..." "INFO"
    
    if (-not (Test-Path $BackupPath)) {
        New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
    }
    
    $timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
    $backupName = "northstar-backup-$timestamp.zip"
    $backupFile = Join-Path $BackupPath $backupName
    
    # Items to exclude from backup
    $excludePatterns = @(
        "node_modules",
        "dist",
        "build",
        ".git",
        "logs",
        "*.log",
        "backups"
    )
    
    try {
        # Create temporary directory for backup preparation
        $tempPath = Join-Path $env:TEMP "northstar-backup-$timestamp"
        robocopy $PSScriptRoot $tempPath /E /XD $excludePatterns /XF "*.log" /NP /NDL /NC /NS
        
        # Create zip archive
        Compress-Archive -Path "$tempPath\*" -DestinationPath $backupFile -Force
        
        # Clean up temp directory
        Remove-Item -Recurse -Force $tempPath
        
        $backupSize = (Get-Item $backupFile).Length
        $backupSizeMB = [math]::Round($backupSize / 1MB, 2)
        
        Write-Status "Backup created: $backupName ($backupSizeMB MB)" "SUCCESS"
        
        # Clean up old backups (keep last 5)
        Get-ChildItem $BackupPath -Filter "northstar-backup-*.zip" | 
            Sort-Object CreationTime -Descending | 
            Select-Object -Skip 5 | 
            Remove-Item
            
    } catch {
        Write-Status "Backup failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
    
    return $true
}

# Main execution
Write-Status "NorthStar Sports Development Tools" "INFO"
Write-Status "===================================" "INFO"

if (-not (Test-Prerequisites)) {
    Write-Status "Prerequisites check failed. Exiting." "ERROR"
    exit 1
}

switch ($Action) {
    "Build" {
        $success = Invoke-Build -Target $Target
        if (-not $success) { exit 1 }
    }
    "Test" {
        $results = Invoke-Test -Target $Target
        $failed = $results | Where-Object { -not $_.Success }
        if ($failed) { exit 1 }
    }
    "Clean" {
        Invoke-Clean -Target $Target
    }
    "Install" {
        $success = Invoke-Install -Target $Target
        if (-not $success) { exit 1 }
    }
    "Lint" {
        Invoke-Lint -Target $Target
    }
    "Status" {
        Get-ProjectStatus
    }
    "Backup" {
        $success = Invoke-Backup
        if (-not $success) { exit 1 }
    }
    "Reset" {
        Write-Status "Performing full project reset..." "INFO"
        Invoke-Clean -Target "All"
        $success = Invoke-Install -Target "All"
        if ($success) {
            $success = Invoke-Build -Target "All"
        }
        if (-not $success) { exit 1 }
    }
}

Write-Status "Operation completed successfully!" "SUCCESS"
