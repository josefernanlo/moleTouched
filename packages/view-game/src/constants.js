export const DIFFICULTY_LEVELS = {
  easy: {
    refreshRate: 1000,
    points: 10,
    literal: 'Fácil',
  },
  medium: {
    refreshRate: 750,
    points: 20,
    literal: 'Medio',
  },
  hard: {
    refreshRate: 500,
    points: 30,
    literal: 'Difícil',
  },
};

export const SIZE = {
  columns: 3,
  rows: 3,
};

export const RANDOM_POSSIBILITY = SIZE.columns * SIZE.rows;

export const STATUS = {
  INITIAL: 'initial',
  UP: 'up',
};
