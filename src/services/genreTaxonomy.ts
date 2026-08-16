const GENRE_ALIASES: Record<string, string[]> = {
  action: ['action', '动作', 'combat', 'fight', '格斗'],
  adventure: ['adventure', '冒险', 'exploration', '探索'],
  arcade: ['arcade', '街机', 'classic', '复古'],
  puzzle: ['puzzle', '解谜', '益智', 'brain'],
  strategy: ['strategy', '策略', 'tower defense', '塔防', 'tactical', '战术'],
  racing: ['racing', 'race', '赛车', '竞速', 'driving'],
  sports: ['sports', '体育', 'football', '篮球', '足球'],
  shooter: ['shooter', 'shooting', '射击', '枪战'],
  casual: ['casual', '休闲', '轻松', 'relax'],
  rpg: ['rpg', 'role playing', '角色扮演'],
}

export function matchGenre(value: string): string | null {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return null

  for (const [genre, aliases] of Object.entries(GENRE_ALIASES)) {
    if (genre === normalized || aliases.some((alias) => normalized.includes(alias))) {
      return genre
    }
  }

  return normalized
}

