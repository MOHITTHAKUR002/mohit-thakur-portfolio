export interface MarkdownData<T = any> {
  metadata: T;
  content: string;
}

export const parseMarkdown = <T>(rawMarkdown: string): MarkdownData<T> => {
  const frontMatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = rawMarkdown.match(frontMatterRegex);
  
  if (!match) {
    return { metadata: {} as T, content: rawMarkdown };
  }
  
  const frontMatterBlock = match[1];
  const content = rawMarkdown.replace(frontMatterRegex, '').trim();
  
  const metadata: any = {};
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
