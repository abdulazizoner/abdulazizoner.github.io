export function siteBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base : `${base}/`;
}

export function assetPath(relativePath: string): string {
  return `${siteBase()}${relativePath.replace(/^\//, '')}`;
}

export function pagePath(relativePath = ''): string {
  return `${siteBase()}${relativePath.replace(/^\//, '')}`;
}
