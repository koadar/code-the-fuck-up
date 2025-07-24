export function markdownToHtml(md: string): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const processInline = (text: string) => {
    return escape(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  };

  const lines = md.split(/\n/);
  let html = "";
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      html += "</ul>";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>";
      inOl = false;
    }
  };

  for (const line of lines) {
    if (/^###\s+/.test(line)) {
      closeLists();
      html += `<h3>${processInline(line.replace(/^###\s+/, ""))}</h3>`;
    } else if (/^##\s+/.test(line)) {
      closeLists();
      html += `<h2>${processInline(line.replace(/^##\s+/, ""))}</h2>`;
    } else if (/^#\s+/.test(line)) {
      closeLists();
      html += `<h1>${processInline(line.replace(/^#\s+/, ""))}</h1>`;
    } else if (/^---\s*$/.test(line)) {
      closeLists();
      html += "<hr />";
    } else if (/^\d+\.\s+/.test(line)) {
      if (!inOl) {
        closeLists();
        html += "<ol>";
        inOl = true;
      }
      html += `<li>${processInline(line.replace(/^\d+\.\s+/, ""))}</li>`;
    } else if (/^[-*]\s+/.test(line)) {
      if (!inUl) {
        closeLists();
        html += "<ul>";
        inUl = true;
      }
      html += `<li>${processInline(line.replace(/^[-*]\s+/, ""))}</li>`;
    } else if (line.trim() === "") {
      closeLists();
    } else {
      closeLists();
      html += `<p>${processInline(line)}</p>`;
    }
  }

  closeLists();
  return html;
}
