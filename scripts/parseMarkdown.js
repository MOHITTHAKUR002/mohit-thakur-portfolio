import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const contentDir = path.resolve(rootDir, 'content');
const outputDir = path.resolve(rootDir, 'apps/web/src/content');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Reuse the logic from markdownParser.ts
const parseMarkdown = (rawMarkdown) => {
  const frontMatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = rawMarkdown.match(frontMatterRegex);
  
  if (!match) {
    return { metadata: {}, content: rawMarkdown };
  }
  
  const frontMatterBlock = match[1];
  const content = rawMarkdown.replace(frontMatterRegex, '').trim();
  
  // Minimal YAML-lite parser for nested objects and lists
  const metadata = {};
  const lines = frontMatterBlock.split('\n');
  let currentKey = '';
  let currentArray = null;
  let currentObject = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (line.startsWith('  -') || line.startsWith('    ')) {
      // It's a list item or a property of an object in a list
      if (line.trim().startsWith('-')) {
        // New object in list
        const kvMatch = line.match(/-\s*(\w+):\s*(.*)/);
        if (kvMatch) {
          const k = kvMatch[1];
          const v = kvMatch[2].trim().replace(/^['"](.*)['"]$/, '$1');
          currentObject = { [k]: v };
          if (currentArray) currentArray.push(currentObject);
        }
      } else {
        // Property of current object
        const kvMatch = line.match(/(\w+):\s*(.*)/);
        if (kvMatch && currentObject) {
          const k = kvMatch[1];
          const v = kvMatch[2].trim().replace(/^['"](.*)['"]$/, '$1');
          currentObject[k] = v;
        }
      }
    } else {
      // Top level key-value
      const divider = line.indexOf(':');
      if (divider !== -1) {
        currentKey = line.slice(0, divider).trim();
        const value = line.slice(divider + 1).trim();
        
        if (value === '') {
          metadata[currentKey] = [];
          currentArray = metadata[currentKey];
          currentObject = null;
        } else {
          metadata[currentKey] = value.replace(/^['"](.*)['"]$/, '$1');
          currentArray = null;
          currentObject = null;
        }
      }
    }
  });

  return { metadata, content };
};

const compileMarkdownToJson = () => {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

  let compiledCount = 0;
  for (const file of files) {
    const rawMarkdown = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const parsedData = parseMarkdown(rawMarkdown);
    const jsonFileName = file.replace('.md', '.json');
    
    fs.writeFileSync(
      path.join(outputDir, jsonFileName),
      JSON.stringify(parsedData, null, 2)
    );
    compiledCount++;
  }
  console.log(`[Content Parser] Successfully compiled ${compiledCount} markdown files to JSON.`);
};

compileMarkdownToJson();
