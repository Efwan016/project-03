export function dateFormat(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: '2-digit' });
}
