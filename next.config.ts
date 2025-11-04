// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://dentalitapi.sepasholding.com/api/:path*',
//       },
//     ];
//   },
//   images: {
//     domains: ['trustseal.enamad.ir'],
//   },
// };

// module.exports = nextConfig;
// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/external/:path*', // فقط مسیرهای external
        destination: 'https://dentalitapi.sepasholding.com/api/:path*',
      },
    ];
  },
  images: {
    domains: ['trustseal.enamad.ir'],
  },
};

module.exports = nextConfig;
