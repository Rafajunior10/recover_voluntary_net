/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // necessário para usar expo-router
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
  },
  // ✅ Redirecionamento de segurança opcional
  async redirects() {
    return [
      {
        source: '/reset-password', // se alguém acessar com "-" redireciona para o correto
        destination: '/resetPassword',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
