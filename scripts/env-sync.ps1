# Environment Synchronization Script
# Ensures backend and frontend have consistent environment configuration

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("Sync", "Validate", "Generate", "Backup")]
    [string]$Action = "Sync",
    
    [Parameter(Mandatory=$false)]
    [switch]$Force
)

$BackendPath = Join-Path $PSScriptRoot "backend"
$FrontendPath = Join-Path $PSScriptRoot "frontend"

function Write-EnvStatus {
    param([string]$Message, [string]$Type = "INFO")
    
    $color = switch ($Type) {
        "SUCCESS" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR"   { "Red" }
        "INFO"    { "Cyan" }
        default   { "White" }
    }
    
    Write-Host "[ENV] " -NoNewline -ForegroundColor $color
    Write-Host $Message
}

function Get-EnvTemplate {
    return @{
        Backend = @{
            "NODE_ENV" = "development"
            "PORT" = "4000"
            "REDIS_HOST" = "redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com"
            "REDIS_PORT" = "19041"
            "REDIS_PASSWORD" = ""  # Should be set manually
            "REDIS_USERNAME" = ""  # Should be set manually
            "LOG_LEVEL" = "info"
            "CORS_ORIGIN" = "http://localhost:5000"
            "API_VERSION" = "v1"
        }
        Frontend = @{
            "NODE_ENV" = "development"
            "NEXT_PUBLIC_API_BASE_URL" = "http://localhost:4000"
            "NEXT_PUBLIC_APP_NAME" = "NorthStar Sports"
            "NEXT_PUBLIC_APP_VERSION" = "1.0.0"
            "NEXT_PUBLIC_LOG_LEVEL" = "info"
            "NEXT_PUBLIC_ENABLE_DEBUG" = "true"
        }
    }
}

function Read-EnvFile {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) {
        return @{}
    }
    
    $envVars = @{}
    $content = Get-Content $Path -ErrorAction SilentlyContinue
    
    foreach ($line in $content) {
        if ($line -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Remove quotes if present
            if ($value -match '^".*"$' -or $value -match "^'.*'$") {
                $value = $value.Substring(1, $value.Length - 2)
            }
            
            $envVars[$key] = $value
        }
    }
    
    return $envVars
}

function Write-EnvFile {
    param(
        [string]$Path,
        [hashtable]$Variables,
        [string]$Header = ""
    )
    
    $content = @()
    
    if ($Header) {
        $content += "# $Header"
        $content += "# Generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        $content += ""
    }
    
    foreach ($key in $Variables.Keys | Sort-Object) {
        $value = $Variables[$key]
        
        # Quote values that contain spaces or special characters
        if ($value -match '\s|[&|<>^]') {
            $value = "`"$value`""
        }
        
        $content += "$key=$value"
    }
    
    $content | Out-File -FilePath $Path -Encoding UTF8
}

function Sync-EnvironmentFiles {
    Write-EnvStatus "Synchronizing environment files..." "INFO"
    
    $template = Get-EnvTemplate
    $backendEnvPath = Join-Path $BackendPath ".env"
    $frontendEnvPath = Join-Path $FrontendPath ".env"
    
    # Read existing files
    $backendEnv = Read-EnvFile $backendEnvPath
    $frontendEnv = Read-EnvFile $frontendEnvPath
    
    # Merge with template (template values only fill missing keys)
    foreach ($key in $template.Backend.Keys) {
        if (-not $backendEnv.ContainsKey($key) -or $Force) {
            $backendEnv[$key] = $template.Backend[$key]
            Write-EnvStatus "Added/Updated backend variable: $key" "SUCCESS"
        }
    }
    
    foreach ($key in $template.Frontend.Keys) {
        if (-not $frontendEnv.ContainsKey($key) -or $Force) {
            $frontendEnv[$key] = $template.Frontend[$key]
            Write-EnvStatus "Added/Updated frontend variable: $key" "SUCCESS"
        }
    }
    
    # Write updated files
    Write-EnvFile -Path $backendEnvPath -Variables $backendEnv -Header "Backend Environment Configuration"
    Write-EnvFile -Path $frontendEnvPath -Variables $frontendEnv -Header "Frontend Environment Configuration"
    
    Write-EnvStatus "Environment files synchronized" "SUCCESS"
}

function Test-EnvironmentConfiguration {
    Write-EnvStatus "Validating environment configuration..." "INFO"
    
    $backendEnvPath = Join-Path $BackendPath ".env"
    $frontendEnvPath = Join-Path $FrontendPath ".env"
    
    $issues = @()
    
    # Check if files exist
    if (-not (Test-Path $backendEnvPath)) {
        $issues += "Backend .env file missing"
    }
    
    if (-not (Test-Path $frontendEnvPath)) {
        $issues += "Frontend .env file missing"
    }
    
    if ($issues.Count -eq 0) {
        $backendEnv = Read-EnvFile $backendEnvPath
        $frontendEnv = Read-EnvFile $frontendEnvPath
        
        # Check for required variables
        $requiredBackend = @("REDIS_HOST", "REDIS_PORT", "PORT")
        $requiredFrontend = @("NEXT_PUBLIC_API_BASE_URL")
        
        foreach ($var in $requiredBackend) {
            if (-not $backendEnv.ContainsKey($var) -or -not $backendEnv[$var]) {
                $issues += "Backend missing required variable: $var"
            }
        }
        
        foreach ($var in $requiredFrontend) {
            if (-not $frontendEnv.ContainsKey($var) -or -not $frontendEnv[$var]) {
                $issues += "Frontend missing required variable: $var"
            }
        }
        
        # Check for consistency
        $backendPort = $backendEnv["PORT"]
        $frontendApiUrl = $frontendEnv["NEXT_PUBLIC_API_BASE_URL"]
        
        if ($backendPort -and $frontendApiUrl) {
            if ($frontendApiUrl -notlike "*:$backendPort*") {
                $issues += "Port mismatch: Backend PORT=$backendPort but Frontend API URL=$frontendApiUrl"
            }
        }
        
        # Check for sensitive data (should be set manually)
        if (-not $backendEnv["REDIS_PASSWORD"] -or $backendEnv["REDIS_PASSWORD"] -eq "") {
            Write-EnvStatus "WARNING: REDIS_PASSWORD not set in backend .env" "WARNING"
        }
        
        if (-not $backendEnv["REDIS_USERNAME"] -or $backendEnv["REDIS_USERNAME"] -eq "") {
            Write-EnvStatus "WARNING: REDIS_USERNAME not set in backend .env" "WARNING"
        }
    }
    
    if ($issues.Count -eq 0) {
        Write-EnvStatus "Environment validation passed" "SUCCESS"
        return $true
    } else {
        Write-EnvStatus "Environment validation failed:" "ERROR"
        foreach ($issue in $issues) {
            Write-EnvStatus "  - $issue" "ERROR"
        }
        return $false
    }
}

function New-EnvironmentFiles {
    Write-EnvStatus "Generating new environment files..." "INFO"
    
    $template = Get-EnvTemplate
    $backendEnvPath = Join-Path $BackendPath ".env"
    $frontendEnvPath = Join-Path $FrontendPath ".env"
    
    # Generate backend .env
    Write-EnvFile -Path $backendEnvPath -Variables $template.Backend -Header "Backend Environment Configuration"
    Write-EnvStatus "Generated backend .env file" "SUCCESS"
    
    # Generate frontend .env
    Write-EnvFile -Path $frontendEnvPath -Variables $template.Frontend -Header "Frontend Environment Configuration"
    Write-EnvStatus "Generated frontend .env file" "SUCCESS"
    
    Write-EnvStatus "IMPORTANT: Please set REDIS_USERNAME and REDIS_PASSWORD in backend/.env" "WARNING"
}

function Backup-EnvironmentFiles {
    Write-EnvStatus "Creating backup of environment files..." "INFO"
    
    $timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
    $backupDir = Join-Path $PSScriptRoot "backups\env-$timestamp"
    
    if (-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    }
    
    $backendEnvPath = Join-Path $BackendPath ".env"
    $frontendEnvPath = Join-Path $FrontendPath ".env"
    
    if (Test-Path $backendEnvPath) {
        Copy-Item $backendEnvPath (Join-Path $backupDir "backend.env")
        Write-EnvStatus "Backed up backend .env" "SUCCESS"
    }
    
    if (Test-Path $frontendEnvPath) {
        Copy-Item $frontendEnvPath (Join-Path $backupDir "frontend.env")
        Write-EnvStatus "Backed up frontend .env" "SUCCESS"
    }
    
    Write-EnvStatus "Environment files backed up to: $backupDir" "SUCCESS"
}

# Main execution
Write-EnvStatus "Environment Configuration Manager" "INFO"
Write-EnvStatus "=================================" "INFO"

switch ($Action) {
    "Sync" {
        Backup-EnvironmentFiles
        Sync-EnvironmentFiles
        Test-EnvironmentConfiguration
    }
    "Validate" {
        $valid = Test-EnvironmentConfiguration
        if (-not $valid) { exit 1 }
    }
    "Generate" {
        if ((Test-Path (Join-Path $BackendPath ".env")) -or (Test-Path (Join-Path $FrontendPath ".env"))) {
            if (-not $Force) {
                Write-EnvStatus "Environment files already exist. Use -Force to overwrite." "WARNING"
                exit 1
            }
            Backup-EnvironmentFiles
        }
        New-EnvironmentFiles
    }
    "Backup" {
        Backup-EnvironmentFiles
    }
}

Write-EnvStatus "Environment operation completed" "SUCCESS"
