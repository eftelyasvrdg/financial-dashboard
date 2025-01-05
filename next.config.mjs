import nextTranslate from 'next-translate-plugin';
import i18nConfig from './i18n.js';

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
    i18n: {
        locales: ['en', 'tr'],
        defaultLocale: 'en',   
    },
});

export default nextConfig;
