export const formatPrice = (amount: number) =>
  `${amount.toLocaleString('ru-RU')} ₸`;

export const formatDistance = (km: number) =>
  km < 1 ? `${Math.round(km * 1000)} м` : `${km.toFixed(1)} км`;

export const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} мин`;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest ? `${hours} ч ${rest} мин` : `${hours} ч`;
};

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

export const toDateKey = (date: Date) => date.toISOString().slice(0, 10);

/** +7 707 123 45 67 → 77071234567 */
export const normalizePhone = (phone: string) => phone.replace(/\D/g, '');
