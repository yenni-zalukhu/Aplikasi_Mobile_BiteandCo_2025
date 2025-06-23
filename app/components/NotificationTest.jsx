import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { notificationService } from '../services/NotificationService';

const NotificationTest = () => {
  const [pushToken, setPushToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(null);

  useEffect(() => {
    initializeNotifications();
    setupNotificationListeners();
    
    return () => {
      notificationService.removeListeners();
    };
  }, []);

  const initializeNotifications = async () => {
    try {
      console.log('🔔 Initializing notifications...');
      const token = await notificationService.initialize();
      
      if (token) {
        console.log('✅ Notification token obtained:', token.substring(0, 20) + '...');
        setPushToken(token);
        setIsInitialized(true);
      } else {
        console.log('❌ Failed to get notification token');
        setIsInitialized(false);
      }

      // Get notification settings
      const settings = await notificationService.getNotificationSettings();
      setNotificationSettings(settings);
      
    } catch (error) {
      console.error('❌ Error initializing notifications:', error);
      setIsInitialized(false);
    }
  };

  const setupNotificationListeners = () => {
    notificationService.setupListeners(
      (notification) => {
        console.log('📨 Notification received:', notification);
        Alert.alert(
          'Notification Received',
          notification.request.content.body,
          [{ text: 'OK' }]
        );
      },
      (response) => {
        console.log('👆 Notification tapped:', response);
        Alert.alert(
          'Notification Tapped',
          `You tapped: ${response.notification.request.content.title}`,
          [{ text: 'OK' }]
        );
      }
    );
  };

  const testLocalNotification = async () => {
    try {
      const notificationId = await notificationService.scheduleLocalNotification(
        'Test Notification',
        'This is a test notification from Bite & Co!',
        { test: true }
      );
      
      if (notificationId) {
        Alert.alert('Success', 'Test notification scheduled!');
      } else {
        Alert.alert('Error', 'Failed to schedule notification');
      }
    } catch (error) {
      console.error('Error testing notification:', error);
      Alert.alert('Error', 'Failed to test notification');
    }
  };

  const requestPermissions = async () => {
    const granted = await notificationService.requestPermissions();
    if (granted) {
      Alert.alert('Success', 'Notification permissions granted!');
      await initializeNotifications();
    } else {
      Alert.alert('Error', 'Notification permissions denied');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Test</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={[styles.statusText, { color: isInitialized ? 'green' : 'red' }]}>
          {isInitialized ? '✅ Initialized' : '❌ Not Initialized'}
        </Text>
      </View>

      {pushToken && (
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>Push Token:</Text>
          <Text style={styles.tokenText}>{pushToken.substring(0, 30)}...</Text>
        </View>
      )}

      {notificationSettings && (
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsLabel}>Permissions:</Text>
          <Text>Enabled: {notificationSettings.enabled ? '✅' : '❌'}</Text>
          <Text>Sound: {notificationSettings.soundEnabled ? '✅' : '❌'}</Text>
          <Text>Badge: {notificationSettings.badgeEnabled ? '✅' : '❌'}</Text>
          <Text>Alert: {notificationSettings.alertEnabled ? '✅' : '❌'}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Request Permissions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={initializeNotifications}>
          <Text style={styles.buttonText}>Re-initialize</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !isInitialized && styles.buttonDisabled]} 
          onPress={testLocalNotification}
          disabled={!isInitialized}
        >
          <Text style={styles.buttonText}>Test Local Notification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
  },
  tokenContainer: {
    marginBottom: 15,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  settingsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationTest;
