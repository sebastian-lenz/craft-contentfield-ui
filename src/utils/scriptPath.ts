export const scriptPath = (function () {
  function toPath(path: string): string {
    const splitAt = path.lastIndexOf('/');
    return splitAt !== -1 ? path.substring(0, splitAt) : path;
  }

  const script = document ? document.currentScript : null;
  return script && 'src' in script ? toPath(script.src) : '';
})();
