export const routes = {
  landing: '/',
  intro: '/intro',
  dialogue: '/dialogue',
  searching: '/searching',
  game: '/game',
  end: '/end',
} as const

export const journey = [
  routes.landing,
  routes.intro,
  routes.dialogue,
  routes.searching,
  routes.game,
  routes.end,
] as const
