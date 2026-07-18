import type { FleetCarwash, FleetSummary } from './types';

/** Русская форма слова по числу: 1 локация, 2 локации, 5 локаций. */
export const plural = (n: number, forms: [string, string, string]) => {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1];
  }
  return forms[2];
};

export const boxLoadLabel = (carwash: FleetCarwash) => {
  const inRepair = carwash.boxCount - carwash.operationalBoxCount;

  return inRepair > 0
    ? `${inRepair}/${carwash.boxCount} на ремонте`
    : `${carwash.operationalBoxCount}/${carwash.boxCount} в работе`;
};

export const buildSummary = (carwashes: FleetCarwash[]): FleetSummary => {
  const totalBoxes = carwashes.reduce((sum, c) => sum + c.boxCount, 0);
  const operationalBoxes = carwashes.reduce(
    (sum, c) => sum + c.operationalBoxCount,
    0,
  );
  const totalReviews = carwashes.reduce((sum, c) => sum + c.reviewCount, 0);
  const bookingsToday = carwashes.reduce((sum, c) => sum + c.bookingsToday, 0);

  // Средний рейтинг взвешиваем по числу отзывов.
  const weighted = carwashes.reduce(
    (sum, c) => sum + c.rating * c.reviewCount,
    0,
  );

  return {
    locations: carwashes.length,
    operationalBoxes,
    totalBoxes,
    operationalPct: totalBoxes
      ? Math.round((operationalBoxes / totalBoxes) * 100)
      : 0,
    avgRating: totalReviews ? weighted / totalReviews : 0,
    totalReviews,
    bookingsToday,
    bookingsChangePct: -100,
  };
};
