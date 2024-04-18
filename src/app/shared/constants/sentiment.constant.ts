export const SENTIMENT_LABEL: { [key: number]: string } = {
  0: 'Trung tính',
  1: 'Tích cực',
  2: 'Tiêu cực',
}

export const SENTIMENT_ICON: { [key: number]: string } = {
  1: 'bi bi-emoji-smile-fill',
  2: 'bi bi-emoji-frown-fill',
  0: 'bi bi-emoji-neutral-fill'
}

export const SENTIMENT_OPT = [
  { label: SENTIMENT_LABEL[0], value: 0 },
  { label: SENTIMENT_LABEL[1], value: 1 },
  { label: SENTIMENT_LABEL[2], value: 2 },
]

export enum ESentiment {
  Positive = 1,
  Negative = 2,
  Neutral = 0
}