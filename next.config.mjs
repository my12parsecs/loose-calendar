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

export default nextConfig;
