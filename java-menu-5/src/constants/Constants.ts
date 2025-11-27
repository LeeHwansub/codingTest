export const Constants = {
  COACH: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 4,
    MIN_COUNT: 2,
    MAX_COUNT: 5,
    MAX_BANNED_MENUS: 2,
  },
  CATEGORY: {
    MIN_NUMBER: 1,
    MAX_NUMBER: 5,
    MAX_COUNT_PER_WEEK: 2,
  },
  WEEK: {
    DAYS: 5,
    DAY_NAMES: ['월요일', '화요일', '수요일', '목요일', '금요일'] as const,
  },
  DELIMITER: {
    INPUT: ',',
    OUTPUT: ' |',
  },
} as const;

