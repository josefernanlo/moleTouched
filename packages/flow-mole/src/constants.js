export const ROUTES = {
  HOME: '/',
  GAME: '/game',
  ARCHIEVEMENTS: '/archievements',
};

export const URLS = Object.values(ROUTES).map(route => route.split('/')[1]);
