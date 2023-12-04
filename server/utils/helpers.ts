export function getFileExtension(mimeType: string): string {
  const extensionMap: { [key: string]: string } = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
  };

  return extensionMap[mimeType] || "";
}
