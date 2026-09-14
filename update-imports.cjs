const fs = require('fs');

const files = [
  'src/components/layout/Footer.tsx',
  'src/pages/About.tsx',
  'src/pages/Contact.tsx',
  'src/pages/OurWork.tsx',
  'src/pages/Quote.tsx',
  'src/pages/ServiceArea.tsx',
  'src/pages/Visit.tsx',
  'src/components/ui/MapFallback.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove static import
  content = content.replace(/import \{ businessConfig \} from '.*config\/business';\n/g, '');
  
  // Add dynamic import
  let depth = file.split('/').length - 2;
  let relativePath = '../'.repeat(depth) + 'context/DataContext';
  if (!content.includes('useData')) {
    content = `import { useData } from '${relativePath}';\n` + content;
  }
  
  // Find component declaration
  const componentMatch = content.match(/const [A-Z][a-zA-Z0-9_]*:\s*React\.FC[^=]*=\s*\([^)]*\)\s*=>\s*\{/);
  if (componentMatch && !content.includes('const { business: businessConfig } = useData();')) {
    const insertPos = componentMatch.index + componentMatch[0].length;
    content = content.slice(0, insertPos) + '\n  const { business: businessConfig } = useData();' + content.slice(insertPos);
  }
  
  fs.writeFileSync(file, content);
});
console.log('Done!');
