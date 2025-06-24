/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          // Handle dayjs locale imports
          test: /dayjs[/\\]locale/,
          use: 'ignore-loader'
        });
        // Exclude `.d.ts` files from Webpack processing
        config.module.rules.push({
          test: /\.d\.ts$/,
          use: 'ignore-loader',
        });
    
        return config;
      },
};

const withPWA = require('next-pwa');

const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});

export default nextConfig;
