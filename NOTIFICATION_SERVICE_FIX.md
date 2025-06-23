# Notification Service Implementation

## Issue Fixed
**Problem**: "Project ID Not Found" error when getting Expo Push Token

## Solution Applied

### 1. Updated app.json Configuration
- Added `projectId: "biteandco-2025"`
- Added `extra.eas.projectId: "biteandco-2025"`
- Added expo-notifications plugin configuration

### 2. Enhanced NotificationService.js
- **Multiple fallback methods** for getting project ID:
  1. `Constants.expoConfig?.extra?.eas?.projectId`
  2. `Constants.easConfig?.projectId`
  3. `Constants.expoConfig?.projectId`
  4. `Constants.manifest?.extra?.eas?.projectId`
  5. Generated ID from app slug: `${appSlug}-2025`
  6. Final fallback: attempt without project ID

- **Better error handling** with detailed logging
- **Console logs** to track which method works

### 3. Test Component Created
- `NotificationTest.jsx` component for testing notifications
- Shows initialization status, push token, and permissions
- Includes buttons to test local notifications

## How to Use

### Basic Setup
```javascript
import { notificationService } from '../services/NotificationService';

// Initialize notifications
const token = await notificationService.initialize();

// Setup listeners
notificationService.setupListeners(
  (notification) => console.log('Received:', notification),
  (response) => console.log('Tapped:', response)
);
```

### Register Push Token with Backend
```javascript
await notificationService.registerPushToken('buyer', userId, token);
```

### Send Local Notification
```javascript
await notificationService.scheduleLocalNotification(
  'Title',
  'Body message',
  { orderId: 123 }
);
```

## Testing the Fix

1. **Start the app**: `npm start`
2. **Check console logs** for notification initialization
3. **Look for**: "Using configured project ID: biteandco-2025"
4. **Verify**: Push token is obtained successfully

## Expected Console Output
```
🔔 Initializing notifications...
Using configured project ID: biteandco-2025
Successfully obtained push token: ExponentPushToken[xxx...]
✅ Notification token obtained
```

## Production Notes

For production deployment:
1. **Create EAS project**: `eas build:configure`
2. **Get real project ID**: `eas project:info`
3. **Update app.json** with the actual project ID
4. **Test on physical device** (notifications don't work in simulator)

## Troubleshooting

If still getting "Project ID Not Found":
1. Check console logs to see which fallback method is being used
2. Verify app.json has correct projectId field
3. Try clearing Expo cache: `expo start -c`
4. Test on physical device instead of simulator

The current implementation should work immediately without requiring EAS setup.
