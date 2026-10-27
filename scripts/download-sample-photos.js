import https from 'https';
import fs from 'fs';
import path from 'path';

const photoUrls = [
  // 1: Couple in golden love (A Beautiful Beginning)
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop',
  // 2: Warm smiling portrait (A Familiar Smile)
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  // 3: Little moments / cozy morning tea & smiles
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop',
  // 4: Together walking in winter nature
  'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1000&auto=format&fit=crop',
  // 5: Our Little Star - baby angel
  'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
  // 6: Growing With Love - toddler & parents
  'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=1000&auto=format&fit=crop',
  // 7: Family Time - joyful family embrace
  'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1000&auto=format&fit=crop',
  // 8: A Day to Remember - golden hour seaside
  'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000&auto=format&fit=crop',
  // 9: The Warmest Memories - cozy hearth / winter warmth
  'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=1000&auto=format&fit=crop',
  // 10: Forever Our Little World - sunset family silhouette
  'https://images.unsplash.com/photo-1581952976147-5a2d15560349?q=80&w=1000&auto=format&fit=crop'
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

const dir = path.resolve('public/images/family');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function run() {
  console.log('Downloading 10 authentic, beautiful family photographs...');
  for (let i = 0; i < photoUrls.length; i++) {
    const dest = path.join(dir, `photo-${i + 1}.jpg`);
    try {
      await downloadFile(photoUrls[i], dest);
      const stat = fs.statSync(dest);
      console.log(`✓ Downloaded photo-${i + 1}.jpg (${Math.round(stat.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading photo-${i + 1}.jpg:`, err.message);
    }
  }
  console.log('Finished downloading photos!');
}

run();
