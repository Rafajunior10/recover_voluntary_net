/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ✅ Necessário para usar expo-router
    // opcional: enable this se quiser usar React Server Components (RSC)
    // serverActions: true
  },
  reactStrictMode: true,
  transpilePackages: [
    'expo', 
    'expo-router', 
    'react-native', 
    'react-native-web', 
    'expo-linking',
    'expo-constants'
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };
    return config;
  }
};

module.exports = nextConfig;
