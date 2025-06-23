const config = {
  // API Configuration - Production mode
  API_URL: "https://www.biteandco.id/api/v1", // Always use production API
  
  GOOGLE_MAPS_API_KEY: "AIzaSyBozwWiB09l1Mituc8wtOKRViMK6c7ILsU",
  
  // Development Configuration
  DEV_MODE: __DEV__,
  LOG_LEVEL: __DEV__ ? 'debug' : 'error',
};

export default config;