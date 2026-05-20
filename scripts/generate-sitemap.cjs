const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://kutchjannattours.com';

function getCarIds() {
  const carsFilePath = path.join(__dirname, '../src/data/cars.ts');
  if (!fs.existsSync(carsFilePath)) {
    console.warn(`Warning: Cars file not found at ${carsFilePath}. Using default set.`);
    return [
      'toyota-rumion',
      'toyota-innova-crysta',
      'maruti-swift-dzire',
      'maruti-ertiga',
      'force-urbania-luxury',
      'mahindra-scorpio',
      'toyota-fortuner',
      'toyota-innova-crysta-premium'
    ];
  }

  try {
    const content = fs.readFileSync(carsFilePath, 'utf8');
    const ids = [];
    const matches = content.matchAll(/id:\s*["']([^"']+)["']/g);
    for (const match of matches) {
      ids.push(match[1]);
    }
    
    // Remove duplicates just in case
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length > 0) {
      return uniqueIds;
    }
  } catch (error) {
    console.error('Error reading or parsing cars.ts:', error);
  }

  return [];
}

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const today = new Date().toISOString().split('T')[0];
  const carIds = getCarIds();

  // Define static routes and their properties
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/cars', priority: '0.9', changefreq: 'weekly' },
    // Dynamic car pages will go here
    { path: '/booking', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/gallery', priority: '0.6', changefreq: 'weekly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' }
  ];

  // Insert dynamic car routes after '/cars'
  const carRoutes = carIds.map(id => ({
    path: `/cars/${id}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const carsIndex = routes.findIndex(r => r.path === '/cars');
  routes.splice(carsIndex + 1, 0, ...carRoutes);

  // Construct XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`Sitemap successfully generated at: ${sitemapPath}`);
  console.log(`Total URLs indexed: ${routes.length} (${carIds.length} car pages included)`);
}

generateSitemap();
