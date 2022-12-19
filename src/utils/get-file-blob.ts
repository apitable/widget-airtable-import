export const getFileBlob = async (url: string) => {
  const response = await fetch(url)
  const fileBlob = await response.blob();
  return fileBlob;
}