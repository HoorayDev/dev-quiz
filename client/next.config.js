/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
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
