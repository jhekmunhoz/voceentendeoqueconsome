export async function loadLogo() {
  const image = new Image();
  image.src = new URL('../assets/brand/logo.webp', import.meta.url).href;
  await image.decode();
  return image;
}

// Os materiais 3D compartilham as cores definidas no tema CSS.
export function themeColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
