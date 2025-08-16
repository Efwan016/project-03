export function formatCurrency(num) {
  try {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  } catch {
    return `Rp ${Number(num || 0).toLocaleString('id-ID')}`;
  }
}
