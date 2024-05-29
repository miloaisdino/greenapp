let url;
if (process.env.NEXT_PUBLIC_HOST) {
  url = process.env.NEXT_PUBLIC_HOST;
} else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  url = 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL;
} else {
  url = 'http://localhost:3000/';
}

const apiLinks = {
  // API link for the production environment
  main: url,
};

// Export the API links
module.exports = apiLinks;
