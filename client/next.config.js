/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    image:{
        // limit of 25 deviceSizes values
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // limit of 25 imageSizes values
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // limit of 50 domains values
        domains: ['http://localhost:3000'],
        // path prefix for Image Optimization API, useful with `loader`
        path: '/_next/image',
        // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
        loader: 'default',
        // disable static imports for image files
        disableStaticImages: false,
        // minimumCacheTTL is in seconds, must be integer 0 or more
        minimumCacheTTL: 60,
        // ordered list of acceptable optimized image formats (mime types)
        formats: ['image/webp'],
    },
    experimental: {
        appDir: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    webpack: config => {
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            });
            return config;
        },
}

module.exports = nextConfig
