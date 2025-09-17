# NorthStar Sports API Endpoint Testing Script
# Tests all available API endpoints systematically

Write-Host "🚀 Starting comprehensive API endpoint testing..." -ForegroundColor Green
Write-Host "Server: http://localhost:4000/api/v1" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:4000/api/v1"
$testResults = @()

# Function to test an endpoint
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [hashtable]$Body = $null,
        [string]$ExpectedStatus = "200"
    )
    
    Write-Host "Testing: $Description" -ForegroundColor Yellow
    Write-Host "  $Method $Url" -ForegroundColor Gray
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            ContentType = "application/json"
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json)
        }
        
        $response = Invoke-WebRequest @params
        $statusCode = $response.StatusCode
        $content = $response.Content
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "  ✅ SUCCESS - Status: $statusCode" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  UNEXPECTED STATUS - Expected: $ExpectedStatus, Got: $statusCode" -ForegroundColor Yellow
        }
        
        # Show first 100 characters of response
        $shortContent = if ($content.Length -gt 100) { $content.Substring(0, 100) + "..." } else { $content }
        Write-Host "  Response: $shortContent" -ForegroundColor DarkGray
        
        $script:testResults += [PSCustomObject]@{
            Method = $Method
            Endpoint = $Url.Replace($baseUrl, "")
            Description = $Description
            Status = $statusCode
            Success = ($statusCode -eq $ExpectedStatus)
        }
        
    } catch {
        Write-Host "  ❌ ERROR - $($_.Exception.Message)" -ForegroundColor Red
        $script:testResults += [PSCustomObject]@{
            Method = $Method
            Endpoint = $Url.Replace($baseUrl, "")
            Description = $Description
            Status = "ERROR"
            Success = $false
        }
    }
    
    Write-Host ""
    Start-Sleep -Milliseconds 500
}

# Test 1: Health Check
Test-Endpoint -Method "GET" -Url "$baseUrl/health" -Description "Health Check"

# Test 2: API Documentation
Test-Endpoint -Method "GET" -Url "$baseUrl/docs" -Description "API Documentation"

# Test 3: User Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/user/test-user-123" -Description "Get User (should return 404 for non-existent)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/user/test-user-123" -Description "Create User" -Body @{
    name = "Test User"
    email = "test@example.com"
    preferences = @{
        theme = "dark"
        notifications = $true
    }
}

Test-Endpoint -Method "GET" -Url "$baseUrl/user/test-user-123" -Description "Get User (after creation)"

# Test 4: KV Store Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/kv/test-key" -Description "Get KV (should return 404 for non-existent)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/kv/test-key" -Description "Set KV Value" -Body @{
    value = "test-value-123"
    metadata = @{
        created = (Get-Date).ToString("o")
        type = "test"
    }
}

Test-Endpoint -Method "GET" -Url "$baseUrl/kv/test-key" -Description "Get KV (after creation)"

# Test 5: Game Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/game/game-123" -Description "Get Game (should return 404 for non-existent)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/game/game-123" -Description "Update Game" -Body @{
    homeTeam = "Lakers"
    awayTeam = "Warriors"
    odds = @{
        home = -110
        away = +105
    }
    status = "upcoming"
}

Test-Endpoint -Method "GET" -Url "$baseUrl/game/game-123" -Description "Get Game (after creation)"

# Test 6: Bet Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/bet/bet-123" -Description "Get Bet (should return 404 for non-existent)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/bet/bet-123" -Description "Create Bet" -Body @{
    userId = "test-user-123"
    gameId = "game-123"
    amount = 25.00
    odds = -110
    selection = "home"
}

Test-Endpoint -Method "GET" -Url "$baseUrl/bet/bet-123" -Description "Get Bet (after creation)"

Test-Endpoint -Method "GET" -Url "$baseUrl/bet/user/test-user-123" -Description "Get User Bets"

# Test 7: Redis Endpoints
Test-Endpoint -Method "GET" -Url "$baseUrl/redis/user/test-user-456" -Description "Get Redis User (should return 404)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/redis/user/test-user-456" -Description "Set Redis User" -Body @{
    profile = @{
        username = "redis-user"
        level = 5
        coins = 1000
    }
}

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/user/test-user-456" -Description "Get Redis User (after creation)"

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/betslip/test-user-456/active" -Description "Get Active BetSlip (should return 404)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/redis/betslip/test-user-456/active" -Description "Set Active BetSlip" -Body @{
    betSlipId = "betslip-789"
    bets = @(
        @{
            gameId = "game-456"
            selection = "over"
            odds = +120
            amount = 10.00
        }
    )
    totalAmount = 10.00
}

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/betslip/test-user-456/active" -Description "Get Active BetSlip (after creation)"

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/betslip/test-user-456/history" -Description "Get BetSlip History (should return 404)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/redis/betslip/test-user-456/history" -Description "Add to BetSlip History" -Body @{
    betSlipId = "betslip-completed-123"
    result = "won"
    payout = 22.00
    completedAt = (Get-Date).ToString("o")
}

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/betslip/test-user-456/history" -Description "Get BetSlip History (after adding)"

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/bet/redis-bet-123" -Description "Get Redis Bet (should return 404)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/redis/bet/redis-bet-123" -Description "Set Redis Bet" -Body @{
    userId = "test-user-456"
    details = @{
        sport = "basketball"
        league = "NBA"
        betType = "moneyline"
    }
}

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/bet/redis-bet-123" -Description "Get Redis Bet (after creation)"

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/game/redis-game-456" -Description "Get Redis Game (should return 404)" -ExpectedStatus "404"

Test-Endpoint -Method "POST" -Url "$baseUrl/redis/game/redis-game-456" -Description "Set Redis Game" -Body @{
    matchup = "Lakers vs Warriors"
    startTime = (Get-Date).AddHours(2).ToString("o")
    venue = "Crypto.com Arena"
}

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/game/redis-game-456" -Description "Get Redis Game (after creation)"

Test-Endpoint -Method "GET" -Url "$baseUrl/redis/bets/test-user-456" -Description "Get User Bets from Redis"

# Test 8: Invalid Endpoints (should return 404)
Test-Endpoint -Method "GET" -Url "$baseUrl/invalid/endpoint" -Description "Invalid API Endpoint" -ExpectedStatus "404"

Test-Endpoint -Method "GET" -Url "http://localhost:4000/invalid-route" -Description "Invalid Route (non-API)" -ExpectedStatus "404"

# Summary
Write-Host "🏁 Testing Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 SUMMARY:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Gray

$successCount = ($testResults | Where-Object { $_.Success -eq $true }).Count
$totalCount = $testResults.Count
$successRate = [math]::Round(($successCount / $totalCount) * 100, 1)

Write-Host "Total Tests: $totalCount" -ForegroundColor White
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $($totalCount - $successCount)" -ForegroundColor Red
Write-Host "Success Rate: $successRate%" -ForegroundColor $(if ($successRate -gt 90) { 'Green' } elseif ($successRate -gt 75) { 'Yellow' } else { 'Red' })

Write-Host ""
Write-Host "📋 DETAILED RESULTS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Gray

$testResults | Format-Table Method, Endpoint, Status, Success -AutoSize

if ($successRate -eq 100) {
    Write-Host "🎉 ALL TESTS PASSED! Your API is fully functional." -ForegroundColor Green
} elseif ($successRate -gt 90) {
    Write-Host "✅ Most tests passed! Minor issues detected." -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Some tests failed. Review the errors above." -ForegroundColor Red
}

Write-Host ""
Write-Host "💡 Next Steps:" -ForegroundColor Cyan
Write-Host "- Review any failed tests above"
Write-Host "- Check server logs for detailed error information"
Write-Host "- Test frontend integration"
Write-Host "- Set up automated testing pipeline"
