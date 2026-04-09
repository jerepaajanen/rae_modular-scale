export const FONT_LIST: string[] = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Nunito",
  "Playfair Display",
  "Merriweather",
  "Source Sans 3",
  "Work Sans",
  "DM Sans",
  "DM Serif Display",
  "Space Grotesk",
  "Space Mono",
  "IBM Plex Sans",
  "IBM Plex Mono",
  "Outfit",
  "Figtree",
  "Geist",
  "JetBrains Mono",
  "Fira Code",
  "Source Code Pro",
  "Bitter",
  "Libre Baskerville",
  "Crimson Text",
  "EB Garamond",
  "Cormorant Garamond",
  "PT Serif",
  "Noto Sans",
  "Noto Serif",
  "Cabin",
  "Karla",
  "Rubik",
  "Manrope",
  "Plus Jakarta Sans",
  "Sora",
  "Archivo",
  "Bricolage Grotesque",
]

/**
 * Dynamically loads a Google Font by injecting a <link> element.
 * Skips if already loaded. Safe to call multiple times.
 */
export function loadGoogleFont(family: string): void {
  if (typeof document === "undefined") return

  const id = `google-font-${family.replace(/\s+/g, "-").toLowerCase()}`
  if (document.getElementById(id)) return

  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@300;400;500;600;700&display=swap`
  document.head.appendChild(link)
}
