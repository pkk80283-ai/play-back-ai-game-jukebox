export type MockGame = {
  id: string
  title: string
  reason: string
  url: string
  genre: string
  duration: string
  description?: string
}

export const mockGames: MockGame[] = [
  {
    id: 'GAME_004',
    title: 'MOON TOWER 2000',
    reason: '10分钟以内 / 低脑力 / 简单操作',
    url: '#',
    genre: 'TOWER DEFENSE',
    duration: '08—12 MIN',
  },
  {
    id: 'DEMO_GAME_001',
    title: 'GUNS N GLORY HEROES',
    reason: '演示模式：短时长、轻策略，适合快速进入一局。',
    url: 'https://www.gamepix.com/play/guns-n-glory-heroes',
    genre: 'TOWER DEFENSE',
    duration: '10—20 MIN',
    description: 'Defend the realm with a party of heroes in a compact fantasy strategy game.',
  },
]
