"use client"

interface CodeBlockProps {
  code: string
  language: "css" | "scss" | "javascript" | "json"
}

function highlight(code: string, language: CodeBlockProps["language"]): string {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  if (language === "json") {
    // String values
    html = html.replace(
      /(&quot;|")(.*?)(\1)/g,
      '<span class="text-blue-600">"$2"</span>'
    )
    // Numbers
    html = html.replace(
      /:\s*(\d+\.?\d*)/g,
      ': <span class="text-fuchsia-600">$1</span>'
    )
    // Brackets and punctuation
    html = html.replace(
      /([{}[\]:,])/g,
      '<span class="text-zinc-500">$1</span>'
    )
    return html
  }

  // CSS / SCSS / JavaScript

  // Block comments /* ... */
  html = html.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span class="text-zinc-400">$1</span>'
  )
  // Line comments // ...
  html = html.replace(
    /(\/\/.*)/g,
    '<span class="text-zinc-400">$1</span>'
  )

  // CSS custom properties --...
  html = html.replace(
    /(--[\w-]+)/g,
    '<span class="text-blue-600">$1</span>'
  )
  // SCSS variables $...
  html = html.replace(
    /(\$[\w-]+)/g,
    '<span class="text-blue-600">$1</span>'
  )

  // Values: rem values and numbers after colon
  html = html.replace(
    /:\s*([\d.]+rem)/g,
    ': <span class="text-fuchsia-600">$1</span>'
  )
  html = html.replace(
    /:\s*(\[?'[\d.]+rem')/g,
    ': <span class="text-fuchsia-600">$1</span>'
  )

  // Brackets and punctuation
  html = html.replace(
    /([{}()[\];,])/g,
    '<span class="text-zinc-500">$1</span>'
  )

  return html
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
