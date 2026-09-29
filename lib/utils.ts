export function formatPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatPriceType(type: string): string {
  switch (type) {
    case 'odam_boshi':
      return 'odam boshiga';
    case 'xona':
      return 'xona uchun';
    case 'xonadon':
    default:
      return 'oyiga';
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
