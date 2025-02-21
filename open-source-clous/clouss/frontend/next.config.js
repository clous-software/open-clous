/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  
  env: {
    API_URL: 'https://server-clous-3ac15fe26491.herokuapp.com',
    MIXPANEL_TOKEN:'4477d9caa0e54978f32649f86571907f',
    NEXT_PUBLIC_MICROSOFT_CLARITY:'ktwfggwsg0',
  }
  
  
  } 
  module.exports = nextConfig 