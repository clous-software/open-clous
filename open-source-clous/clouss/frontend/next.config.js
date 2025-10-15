/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL || 'https://server-clous-3ac15fe26491.herokuapp.com',
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN || 'your-mixpanel-token',
    NEXT_PUBLIC_MICROSOFT_CLARITY: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY || 'your-clarity-id',
  }


}
module.exports = nextConfig 