export const decodeHtml = (encodedHtml: string): string | TrustedHTML => {
  // do we trust XSS here? could use DOMPurify
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    "<!doctype html><body>" + encodedHtml,
    "text/html"
  );

  // empty string if no text content
  return dom.body.textContent || "";
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};
