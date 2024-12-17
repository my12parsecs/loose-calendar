/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://loosecal.com',
    generateRobotsTxt: true, // (optional)
    autoLastmod: false,
    generateIndexSitemap: false,
    // ...other options
  }