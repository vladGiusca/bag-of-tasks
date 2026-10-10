export type Palette = Record<string, string>

/**
 * Renders a sprite, given as rows of palette characters, to a crisp SVG data URL.
 * Characters missing from the palette (e.g. '.') are transparent.
 */
export function spriteUrl(rows: readonly string[], palette: Palette): string {
  const width = rows[0].length
  if (import.meta.env.DEV && rows.some((r) => r.length !== width)) {
    console.error('Sprite rows have uneven lengths', rows)
  }

  let rects = ''
  rows.forEach((row, y) => {
    // Merge horizontal runs of the same colour to keep the SVG small.
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      let end = x + 1
      while (end < row.length && row[end] === ch) end++
      const fill = palette[ch]
      if (fill) rects += `<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${fill}"/>`
      x = end
    }
  })

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${rows.length}" ` +
    `shape-rendering="crispEdges">${rects}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
