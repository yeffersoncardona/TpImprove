const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	images: {
    unoptimized: true,
  },
	assetPrefix: isProd ? '/template' : '/',
	basePath: isProd ? '/template' : ''
	// async headers() {
  //   return [
	// 		{
	// 			source: '/(.*)',
	// 			headers: [
	// 				{
	// 					key: 'X-Content-Type-Options',
	// 					value: 'nosniff'
	// 				},
	// 				{
	// 					key: 'Referrer-Policy',
	// 					value: 'no-referrer'
	// 				},
	// 				{
	// 					key: 'Permissions-Policy',
	// 					value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
	// 				},
	// 				{
	// 					key: 'Content-Security-Policy',
	// 					value: "upgrade-insecure-requests; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none';"
	// 				}
	// 			]
	// 		}
  //   ]
  // }
}