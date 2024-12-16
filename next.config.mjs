/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Exclude `.d.ts` files from Webpack processing
        config.module.rules.push({
          test: /\.d\.ts$/,
          use: 'ignore-loader',
        });
    
        return config;
      },
};

export default nextConfig;
