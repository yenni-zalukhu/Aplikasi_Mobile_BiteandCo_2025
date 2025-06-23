const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for .ts and .tsx files
config.resolver.sourceExts.push('ts', 'tsx');

// Handle TypeScript files in node_modules
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

module.exports = config;
``