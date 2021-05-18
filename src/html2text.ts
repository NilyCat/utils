export function html2text(html: string, limit = 100): string {
  let result = html
    .replace(/<style[^<>]*>((?!<\/).)*<\/style>/gi, '')
    .replace(/<script[^<>]*>((?!<\/).)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\t|\r|\n|\r\n/g, '')
    .replace(/\s+/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  if (limit > 0) {
    result = result.slice(0, limit)
  }

  return result
}
