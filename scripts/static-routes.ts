import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { routeMeta, type RouteMeta } from '../src/data/seo.ts';

const siteOrigin = process.env.SITE_ORIGIN ?? 'https://afsartanvir.github.io';

/**
 * GitHub Pages has no SPA fallback. After the build, write a copy of
 * index.html for every known route (so deep links return 200 with the right
 * <title> and social-preview tags), a 404.html for everything else, plus
 * sitemap.xml and robots.txt.
 */
export function staticRoutes(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    async closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const base = config.base.endsWith('/') ? config.base : `${config.base}/`;
      const template = await readFile(path.join(outDir, 'index.html'), 'utf8');

      for (const route of routeMeta) {
        const html = withMeta(template, route, base);
        const dir = path.join(outDir, route.path);
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, 'index.html'), html);
      }

      const notFound = withMeta(
        template,
        {
          path: '404',
          title: 'Page not found · Afsar Tanvir',
          description: 'This page does not exist.',
        },
        base
      ).replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
      await writeFile(path.join(outDir, '404.html'), notFound);

      const urls = routeMeta
        .map((r) => `  <url><loc>${absoluteUrl(base, r.path)}</loc></url>`)
        .join('\n');
      await writeFile(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
      await writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(base, 'sitemap.xml')}\n`
      );
    },
  };
}

/** Absolute URL; page routes get a trailing slash (GitHub Pages serves them as directories). */
function absoluteUrl(base: string, routePath: string) {
  const isFile = /\.[a-z]+$/i.test(routePath);
  const url = `${siteOrigin}${base}${routePath}${isFile || routePath === '' ? '' : '/'}`;
  return url.replace(/([^:])\/\/+/g, '$1/');
}

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Replace one attribute value on a tag, tolerating line breaks between attributes. */
function setAttr(html: string, tag: string, key: string, attr: string, value: string) {
  const pattern = new RegExp(`(<${tag}\\s+${key}\\s+${attr}=")[^"]*(")`);
  if (!pattern.test(html))
    throw new Error(`static-routes: <${tag} ${key}> not found in index.html`);
  return html.replace(pattern, `$1${value}$2`);
}

function withMeta(html: string, route: RouteMeta, base: string) {
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  const url = absoluteUrl(base, route.path);
  const meta: [key: string, value: string][] = [
    ['name="description"', description],
    ['property="og:title"', title],
    ['property="og:description"', description],
    ['property="og:url"', url],
    ['property="og:image"', absoluteUrl(base, 'og.png')],
    ['name="twitter:title"', title],
    ['name="twitter:description"', description],
  ];
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  for (const [key, value] of meta) out = setAttr(out, 'meta', key, 'content', value);
  return setAttr(out, 'link', 'rel="canonical"', 'href', url);
}
