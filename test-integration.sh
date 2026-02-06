#!/bin/bash

# Test script for DailyNeeds API integration

echo "🚀 Testing DailyNeeds API Integration"
echo "======================================"

# Check if API is running
echo "📡 Checking API availability..."
API_URL="http://localhost:5000/api"

if curl -s "$API_URL/items/active" > /dev/null 2>&1; then
    echo "✅ API is running at $API_URL"
    
    # Test login endpoint
    echo "🔐 Testing login endpoint..."
    LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "mobile": "9876543210",
            "password": "password",
            "userType": "customer"
        }')
    
    if echo "$LOGIN_RESPONSE" | grep -q "token"; then
        echo "✅ Login endpoint working"
        echo "Response: $LOGIN_RESPONSE"
    else
        echo "❌ Login endpoint failed"
        echo "Response: $LOGIN_RESPONSE"
    fi
    
else
    echo "❌ API is not running at $API_URL"
    echo "💡 Make sure to start the API server:"
    echo "   cd 'D:\\Sam\\Repos\\API\\DailyNeeds-API'"
    echo "   dotnet run"
fi

echo ""
echo "📱 React Native App Setup:"
echo "1. Make sure AsyncStorage is installed: npm install @react-native-async-storage/async-storage"
echo "2. Start the app: npm start"
echo "3. Use demo credentials:"
echo "   - Customer: 9876543210 / password"
echo "   - Agent: 9123456789 / password"
echo ""
echo "🔧 Troubleshooting:"
echo "- If API fails, the app will use mock authentication"
echo "- Check console logs for detailed error messages"
echo "- Ensure API URL in config/api.ts matches your server"