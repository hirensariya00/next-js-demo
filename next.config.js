/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    }, async rewrites() {
        return [{
            source: '/apis/:path*', destination: 'https://excore-bigcommerce-demo.experro.com/apis/:path*' // Proxy to Backend
        }, {
            source: '/mm-images/:path*', destination: 'https://excore-bigcommerce-demo.experro.com/mm-images/:path*' // Proxy to Backend
        }, {
            source: '/apis/content:path*', destination: 'https://excore-bigcommerce-demo.experro.com/apis/content:path*' // Proxy to Backend
        }]
    }, images: {
        remotePatterns: [{
            protocol: 'https', hostname: 'excore-bigcommerce-demo.experro.com', port: '', pathname: '/mm-images/**',
        }, {
            protocol: 'https', hostname: 'nuoqhlwc.myexperro.com', port: '', pathname: '/mm-images/**',
        }, {
            protocol: 'https', hostname: 'cdn11.bigcommerce.com', port: '', pathname: '/**',
        }, {
            protocol: 'https', hostname: 'product-images.experro.app', port: '', pathname: '/**',
        },],
    },
}

module.exports = nextConfig
