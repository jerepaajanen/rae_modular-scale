"use client"

interface CodeBlockProps {
  code: string
  language: "css" | "scss" | "javascript" | "json"
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function highlight(code: string, language: CodeBlockProps["language"]): string {
  // Single-pass tokenizer — collect non-overlapping tokens, then render
  const tokens: { start: number; end: number; cls: string }[] = []

  function addIfFree(start: number, length: number, cls: string) {
    const end = start + length
    if (!tokens.some((t) => start < t.end && end > t.start)) {
      tokens.push({ start, end, cls })
    }
  }

  if (language === "json") {
    for (const m of code.matchAll(/"(?:[^"\\]|\\.)*"/g)) {
      addIfFree(m.index!, m[0].length, "text-blue-600")
    }
    for (const m of code.matchAll(/(?<=:\s*)-?\d+\.?\d*/g)) {
      addIfFree(m.index!, m[0].length, "text-fuchsia-600")
    }
  } else {
    // Comments first — highest priority
    for (const m of code.matchAll(/\/\*[\s\S]*?\*\//g)) {
      addIfFree(m.index!, m[0].length, "text-zinc-400")
    }
    for (const m of code.matchAll(/\/\/.*/g)) {
      addIfFree(m.index!, m[0].length, "text-zinc-400")
    }
    // CSS properties and SCSS variables
    for (const m of code.matchAll(/--[\w-]+/g)) {
      addIfFree(m.index!, m[0].length, "text-blue-600")
    }
    for (const m of code.matchAll(/\$[\w-]+/g)) {
      addIfFree(m.index!, m[0].length, "text-blue-600")
    }
    // Rem values
    for (const m of code.matchAll(/\d+\.?\d*rem/g)) {
      addIfFree(m.index!, m[0].length, "text-fuchsia-600")
    }
  }

  tokens.sort((a, b) => a.start - b.start)

  let result = ""
  let cursor = 0
  for (const token of tokens) {
    if (token.start < cursor) continue
    result += escapeHtml(code.slice(cursor, token.start))
    result += `<span class="${token.cls}">${escapeHtml(code.slice(token.start, token.end))}</span>`
    cursor = token.end
  }
  result += escapeHtml(code.slice(cursor))

  return result
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const highlighted = highlight(code, language)

  return (
    <pre
      className="overflow-auto rounded-md border border-zinc-200 bg-white p-4 text-[12.5px] leading-relaxed"
      style={{ maxHeight: "24rem" }}
    >
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  )
}
