/** @type {import('next').NextConfig} */
const { withNextIntl } = require("next-intl");

// Adjust the path to your i18n configuration file if it's located elsewhere
const i18nConfig = require("./i18n.ts");

const nextConfig = {
};

module.exports = withNextIntl({
  ...nextConfig,
  i18n: i18nConfig, 
  webpack: (config, { isServer }) => {
  
    if (!isServer) {
      config.devtool = 'cheap-module-source-map';
    }
    return config;
  },
});
