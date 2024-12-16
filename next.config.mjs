/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Add a rule to handle dynamic imports from the `dayjs/locale` directory
        config.module.rules.push({
          test: /dayjs[\\/]locale/,
          use: 'next-swc-loader',
          resourceQuery: /lazy/,
        });
    
        // Ensure Webpack doesn't tree-shake required locales
        config.resolve.alias['dayjs/locale'] = false;
    
        return config;
      },
};

export default nextConfig;
