const apiLinks = {
  // API link for the production environment
  main: process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000/',
};

// Export the API links
module.exports = apiLinks;
