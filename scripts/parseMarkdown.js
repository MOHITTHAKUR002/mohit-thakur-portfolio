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
  
  const metadata = {};
  frontMatterBlock.split('\n').forEach(line => {
    const divider = line.indexOf(':');
    if (divider !== -1) {
      const key = line.slice(0, divider).trim();
      const value = line.slice(divider + 1).trim().replace(/^['"](.*)['"]$/, '$1');
      metadata[key] = value;
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
