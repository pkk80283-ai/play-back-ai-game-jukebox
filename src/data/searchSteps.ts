export type SearchStep = {
  id: string
  label: string
  detail: string
}

export const searchSteps: SearchStep[] = [
  { id: 'session', label: 'SESSION TIME', detail: '≤ 10 MIN' },
  { id: 'genre', label: 'GENRE', detail: 'TOWER DEFENSE' },
  { id: 'mental', label: 'MENTAL LOAD', detail: 'LOW' },
  { id: 'control', label: 'CONTROL', detail: 'ONE HAND' },
  { id: 'signal', label: 'URL SIGNAL', detail: 'STABLE' },
]
