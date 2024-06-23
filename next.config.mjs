/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // SVGR options (if any) can be specified here
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
