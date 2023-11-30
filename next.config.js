const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    env: {
      apiUrl:'http://localhost:8001/api',
      // apiUrl:'https://firebase.flikcar.com/api',
    }
  }
  
module.exports = nextConfig
