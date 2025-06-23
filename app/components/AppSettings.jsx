import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import COLORS from '../constants/color';
import HeaderTitleBack from '../components/HeaderTitleBack';
import { useToast } from '../components/ToastProvider';
import { notificationService } from '../services/NotificationService';

const SettingsItem = ({ 
  title, 
  subtitle, 
  icon, 
  onPress, 
  showArrow = true, 
  showSwitch = false, 
  switchValue = false, 
  onSwitchChange,
  iconColor = COLORS.PRIMARY,
  disabled = false 
}) => (
  <TouchableOpacity 
    style={[styles.settingsItem, disabled && styles.settingsItemDisabled]} 
    onPress={onPress}
    disabled={disabled || showSwitch}
  >
    <View style={styles.settingsItemLeft}>
      <View style={[styles.settingsIcon, { backgroundColor: iconColor + '20' }]}>
        <MaterialIcons name={icon} size={24} color={iconColor} />
      </View>
      <View style={styles.settingsText}>
        <Text style={[styles.settingsTitle, disabled && styles.settingsTextDisabled]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingsSubtitle, disabled && styles.settingsTextDisabled]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    
    {showSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: '#f0f0f0', true: COLORS.PRIMARY + '40' }}
        thumbColor={switchValue ? COLORS.PRIMARY : '#f4f3f4'}
        disabled={disabled}
      />
    ) : showArrow ? (
      <MaterialIcons name="chevron-right" size={24} color="#ccc" />
    ) : null}
  </TouchableOpacity>
);

const SettingsSection = ({ title, children }) => (
  <View style={styles.settingsSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const AppSettings = () => {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    offlineMode: true,
    analytics: true,
    crashReporting: true,
    hapticFeedback: true,
    animations: true,
    darkMode: false,
    autoLogout: true,
  });
  
  const [deviceInfo, setDeviceInfo] = useState({
    platform: 'Unknown',
    version: 'Unknown',
    freeStorage: 'Unknown',
    totalMemory: 'Unknown',
  });
  
  const [appInfo, setAppInfo] = useState({
    version: '1.0.0',
    buildNumber: '1',
    cacheSize: '0 MB',
    errorCount: 0,
  });

  // Load settings from local state (replacing AppConfigManager)
  const loadSettings = useCallback(async () => {
    try {
      // Default settings without AppConfigManager
      setSettings({
        pushNotifications: false,
        offlineMode: false,
        analytics: false,
        crashReporting: false,
        hapticFeedback: false,
        animations: true,
        darkMode: false,
        autoLogout: false,
      });
    } catch (error) {
      console.error('Error loading settings:', error);
      showToast('Gagal memuat pengaturan', 'error');
    }
  }, [showToast]);

  // Load device info
  const loadDeviceInfo = useCallback(async () => {
    try {
      const { Platform } = await import('react-native');
      const Device = await import('expo-device');
      const FileSystem = await import('expo-file-system');
      
      const freeSpace = await FileSystem.getFreeDiskStorageAsync();
      
      setDeviceInfo({
        platform: Platform.OS,
        version: Device.osVersion || 'Unknown',
        freeStorage: `${(freeSpace / (1024 * 1024 * 1024)).toFixed(1)} GB`,
        totalMemory: Device.totalMemory 
          ? `${(Device.totalMemory / (1024 * 1024 * 1024)).toFixed(1)} GB`
          : 'Unknown',
      });
    } catch (error) {
      console.error('Error loading device info:', error);
    }
  }, []);

  // Load app info
  const loadAppInfo = useCallback(async () => {
    try {
      // Calculate cache size
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      for (const key of keys) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            totalSize += new Blob([value]).size;
          }
        } catch (e) {
          // Ignore
        }
      }
      
      setAppInfo({
        version: Constants.expoConfig?.version || Constants.manifest?.version || '1.0.0',
        buildNumber: Constants.expoConfig?.ios?.buildNumber || 
                    Constants.expoConfig?.android?.versionCode || 
                    Constants.manifest?.ios?.buildNumber ||
                    Constants.manifest?.android?.versionCode || '1',
        cacheSize: `${(totalSize / (1024 * 1024)).toFixed(1)} MB`,
        errorCount: 0, // Default value since performanceMonitor is removed
      });
    } catch (error) {
      console.error('Error loading app info:', error);
      // Set fallback values if expo-constants fails
      setAppInfo({
        version: '1.0.0',
        buildNumber: '1',
        cacheSize: '0.0 MB',
        errorCount: 0,
      });
    }
  }, []);

  // Handle setting changes (without AppConfigManager)
  const handleSettingChange = async (key, value) => {
    try {
      setSettings(prev => ({ ...prev, [key]: value }));
      
      // Handle specific settings without AppConfigManager
      switch (key) {
        case 'pushNotifications':
          if (value) {
            await notificationService.requestPermissions();
          }
          break;
          
        case 'offlineMode':
          console.log('Offline mode changed:', value);
          break;
          
        case 'analytics':
          console.log('Analytics changed:', value);
          break;
          
        case 'crashReporting':
          console.log('Crash reporting changed:', value);
          break;
          
        case 'hapticFeedback':
          console.log('Haptic feedback changed:', value);
          break;
          
        case 'animations':
          console.log('Animations changed:', value);
          break;
          
        case 'darkMode':
          console.log('Dark mode changed:', value);
          break;
          
        case 'autoLogout':
          console.log('Auto logout changed:', value);
          break;
      }
      
      showToast('Pengaturan berhasil disimpan', 'success');
    } catch (error) {
      console.error('Error updating setting:', error);
      showToast('Gagal menyimpan pengaturan', 'error');
      
      // Revert change
      setSettings(prev => ({ ...prev, [key]: !value }));
    }
  };

  // Clear cache
  const handleClearCache = () => {
    Alert.alert(
      'Bersihkan Cache',
      'Apakah Anda yakin ingin menghapus semua data cache? Ini akan menghapus data offline dan mengharuskan Anda login ulang.',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              showToast('Cache berhasil dihapus', 'success');
              
              // Reload app info
              loadAppInfo();
            } catch (error) {
              console.error('Error clearing cache:', error);
              showToast('Gagal menghapus cache', 'error');
            }
          }
        }
      ]
    );
  };

  // Reset settings
  const handleResetSettings = () => {
    Alert.alert(
      'Reset Pengaturan',
      'Apakah Anda yakin ingin mengembalikan semua pengaturan ke default?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            try {
              await loadSettings(); // Reset to default settings
              showToast('Pengaturan berhasil direset', 'success');
            } catch (error) {
              console.error('Error resetting settings:', error);
              showToast('Gagal mereset pengaturan', 'error');
            }
          }
        }
      ]
    );
  };

  // Export settings (without AppConfigManager)
  const handleExportSettings = async () => {
    try {
      const configData = JSON.stringify(settings, null, 2);
      await Share.share({
        message: configData,
        title: 'BiteAndCo App Settings',
      });
    } catch (error) {
      console.error('Error exporting settings:', error);
      showToast('Gagal mengekspor pengaturan', 'error');
    }
  };

  // View analytics dashboard
  const handleViewAnalytics = () => {
    router.push('/components/AnalyticsDashboard');
  };

  // View privacy policy
  const handlePrivacyPolicy = () => {
    Linking.openURL('https://biteandco.com/privacy');
  };

  // View terms of service
  const handleTermsOfService = () => {
    Linking.openURL('https://biteandco.com/terms');
  };

  // Contact support
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@biteandco.com?subject=BiteAndCo App Support');
  };

  // Load data on focus
  useFocusEffect(
    useCallback(() => {
      loadSettings();
      loadDeviceInfo();
      loadAppInfo();
    }, [loadSettings, loadDeviceInfo, loadAppInfo])
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitleBack title="Pengaturan App" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Notifications & Features */}
        <SettingsSection title="Notifikasi & Fitur">
          <SettingsItem
            title="Push Notifications"
            subtitle="Terima notifikasi pesanan dan chat"
            icon="notifications"
            showSwitch
            switchValue={settings.pushNotifications}
            onSwitchChange={(value) => handleSettingChange('pushNotifications', value)}
          />
          <SettingsItem
            title="Mode Offline"
            subtitle="Simpan data untuk akses offline"
            icon="cloud-off"
            showSwitch
            switchValue={settings.offlineMode}
            onSwitchChange={(value) => handleSettingChange('offlineMode', value)}
          />
          <SettingsItem
            title="Analytics"
            subtitle="Bantu tingkatkan app dengan data usage"
            icon="analytics"
            showSwitch
            switchValue={settings.analytics}
            onSwitchChange={(value) => handleSettingChange('analytics', value)}
          />
          <SettingsItem
            title="Crash Reporting"
            subtitle="Kirim laporan error secara otomatis"
            icon="bug-report"
            showSwitch
            switchValue={settings.crashReporting}
            onSwitchChange={(value) => handleSettingChange('crashReporting', value)}
          />
        </SettingsSection>

        {/* App Experience */}
        <SettingsSection title="Pengalaman App">
          <SettingsItem
            title="Haptic Feedback"
            subtitle="Getaran saat interaksi"
            icon="vibration"
            showSwitch
            switchValue={settings.hapticFeedback}
            onSwitchChange={(value) => handleSettingChange('hapticFeedback', value)}
          />
          <SettingsItem
            title="Animasi"
            subtitle="Animasi transisi dan loading"
            icon="animation"
            showSwitch
            switchValue={settings.animations}
            onSwitchChange={(value) => handleSettingChange('animations', value)}
          />
          <SettingsItem
            title="Mode Gelap"
            subtitle="Tema gelap untuk tampilan yang nyaman"
            icon="dark-mode"
            showSwitch
            switchValue={settings.darkMode}
            onSwitchChange={(value) => handleSettingChange('darkMode', value)}
          />
          <SettingsItem
            title="Auto Logout"
            subtitle="Logout otomatis setelah tidak aktif"
            icon="logout"
            showSwitch
            switchValue={settings.autoLogout}
            onSwitchChange={(value) => handleSettingChange('autoLogout', value)}
          />
        </SettingsSection>

        {/* Data & Storage */}
        <SettingsSection title="Data & Storage">
          <SettingsItem
            title="Bersihkan Cache"
            subtitle={`Cache saat ini: ${appInfo.cacheSize}`}
            icon="storage"
            onPress={handleClearCache}
            iconColor="#FF9800"
          />
          <SettingsItem
            title="Reset Pengaturan"
            subtitle="Kembalikan ke pengaturan default"
            icon="refresh"
            onPress={handleResetSettings}
            iconColor="#F44336"
          />
          <SettingsItem
            title="Ekspor Pengaturan"
            subtitle="Bagikan konfigurasi app"
            icon="share"
            onPress={handleExportSettings}
            iconColor="#4CAF50"
          />
        </SettingsSection>

        {/* Analytics & Performance */}
        <SettingsSection title="Analytics & Performance">
          <SettingsItem
            title="Dashboard Analytics"
            subtitle="Lihat statistik penggunaan app"
            icon="dashboard"
            onPress={handleViewAnalytics}
            iconColor="#2196F3"
          />
        </SettingsSection>

        {/* About & Support */}
        <SettingsSection title="Tentang & Dukungan">
          <SettingsItem
            title="Kebijakan Privasi"
            subtitle="Baca kebijakan privasi kami"
            icon="privacy-tip"
            onPress={handlePrivacyPolicy}
            iconColor="#9C27B0"
          />
          <SettingsItem
            title="Syarat & Ketentuan"
            subtitle="Baca syarat penggunaan"
            icon="description"
            onPress={handleTermsOfService}
            iconColor="#607D8B"
          />
          <SettingsItem
            title="Hubungi Support"
            subtitle="Butuh bantuan? Hubungi kami"
            icon="support"
            onPress={handleContactSupport}
            iconColor="#4CAF50"
          />
        </SettingsSection>

        {/* Device Info */}
        <SettingsSection title="Informasi Perangkat">
          <SettingsItem
            title="Platform"
            subtitle={deviceInfo.platform}
            icon="phone-android"
            showArrow={false}
          />
          <SettingsItem
            title="OS Version"
            subtitle={deviceInfo.version}
            icon="info"
            showArrow={false}
          />
          <SettingsItem
            title="Free Storage"
            subtitle={deviceInfo.freeStorage}
            icon="storage"
            showArrow={false}
          />
          <SettingsItem
            title="Total Memory"
            subtitle={deviceInfo.totalMemory}
            icon="memory"
            showArrow={false}
          />
        </SettingsSection>

        {/* App Info */}
        <SettingsSection title="Informasi Aplikasi">
          <SettingsItem
            title="Versi App"
            subtitle={`v${appInfo.version} (${appInfo.buildNumber})`}
            icon="app-settings-alt"
            showArrow={false}
          />
          <SettingsItem
            title="Ukuran Cache"
            subtitle={appInfo.cacheSize}
            icon="storage"
            showArrow={false}
          />
          <SettingsItem
            title="Error Count"
            subtitle={`${appInfo.errorCount} errors`}
            icon="error"
            showArrow={false}
            iconColor={appInfo.errorCount > 0 ? "#F44336" : "#4CAF50"}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItemDisabled: {
    opacity: 0.5,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  settingsTextDisabled: {
    color: '#999',
  },
});

export default AppSettings;
