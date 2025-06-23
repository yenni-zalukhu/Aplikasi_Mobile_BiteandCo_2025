#!/usr/bin/env node

/**
 * Setup script for configuring push notifications
 * This script helps set up the project ID for Expo push notifications
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function setupNotifications() {
  console.log('🔔 Setting up push notifications...');
  
  try {
    // Check if EAS CLI is installed
    try {
      execSync('eas --version', { stdio: 'ignore' });
      console.log('✅ EAS CLI is installed');
    } catch (error) {
      console.log('❌ EAS CLI not found. Installing...');
      execSync('npm install -g @expo/eas-cli', { stdio: 'inherit' });
      console.log('✅ EAS CLI installed');
    }

    // Check if user is logged in to EAS
    try {
      execSync('eas whoami', { stdio: 'ignore' });
      console.log('✅ Logged in to EAS');
    } catch (error) {
      console.log('❌ Not logged in to EAS. Please run: eas login');
      return;
    }

    // Initialize EAS if not already done
    if (!fs.existsSync('eas.json')) {
      console.log('📝 Initializing EAS...');
      execSync('eas build:configure', { stdio: 'inherit' });
    }

    // Get project ID
    console.log('🔍 Getting project ID...');
    const projectInfo = execSync('eas project:info', { encoding: 'utf-8' });
    const projectIdMatch = projectInfo.match(/Project ID: (.+)/);
    
    if (projectIdMatch) {
      const projectId = projectIdMatch[1].trim();
      console.log('✅ Found project ID:', projectId);
      
      // Update app.json with the project ID
      const appJsonPath = path.join(__dirname, 'app.json');
      const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));
      
      appJson.expo.projectId = projectId;
      appJson.expo.extra = appJson.expo.extra || {};
      appJson.expo.extra.eas = appJson.expo.extra.eas || {};
      appJson.expo.extra.eas.projectId = projectId;
      
      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
      console.log('✅ Updated app.json with project ID');
      
    } else {
      console.log('❌ Could not find project ID. Please run: eas project:info');
    }

  } catch (error) {
    console.error('❌ Error setting up notifications:', error.message);
    
    // Provide manual setup instructions
    console.log('\n📖 Manual setup instructions:');
    console.log('1. Install EAS CLI: npm install -g @expo/eas-cli');
    console.log('2. Login to EAS: eas login');
    console.log('3. Configure project: eas build:configure');
    console.log('4. Get project ID: eas project:info');
    console.log('5. Update app.json with the project ID');
  }
}

// Alternative method using app slug
function setupWithSlug() {
  console.log('🔧 Setting up with app slug fallback...');
  
  const appJsonPath = path.join(__dirname, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));
  
  // Generate a UUID-like project ID from the slug
  const slug = appJson.expo.slug;
  const fallbackProjectId = `${slug}-${Date.now()}`;
  
  appJson.expo.projectId = fallbackProjectId;
  appJson.expo.extra = appJson.expo.extra || {};
  appJson.expo.extra.eas = appJson.expo.extra.eas || {};
  appJson.expo.extra.eas.projectId = fallbackProjectId;
  
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  console.log('✅ Updated app.json with fallback project ID:', fallbackProjectId);
  console.log('⚠️  This is a temporary solution. For production, use a proper EAS project ID.');
}

// Run setup
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--fallback')) {
    setupWithSlug();
  } else {
    setupNotifications();
  }
}

module.exports = { setupNotifications, setupWithSlug };
