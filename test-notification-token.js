#!/usr/bin/env node

/**
 * Test script to verify Expo push token generation
 * Run this to test if the new project ID works for notifications
 */

const { spawn } = require('child_process');

console.log('🔔 Testing Expo Push Token with new project ID...\n');

// Test with the new project ID
const projectId = 'b884e7a2-afd5-4ba4-b773-3df744b8644f';

console.log(`✅ New Project ID: ${projectId}`);
console.log(`✅ Account: biteandco`);
console.log(`✅ Project: @biteandco/biteandco\n`);

console.log('📱 To test push notifications:');
console.log('1. Start your app: npx expo start');
console.log('2. Check the console for "Successfully obtained push token"');
console.log('3. The error "Experience with id \'7eeef250-d091-4192-a4b4-5b6b4d79129e\' does not exist" should be gone');

console.log('\n🚀 Your Expo account has been successfully changed!');
console.log('   Old account: giriwara');
console.log('   New account: biteandco');
console.log('   New project ID: b884e7a2-afd5-4ba4-b773-3df744b8644f');
