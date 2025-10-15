/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  env: {
    GROQ_API_KEY: '',
  }
};

export default withNextIntl(nextConfig);