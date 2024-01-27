import { isWithinTokenLimit, encode, decode } from 'npm:gpt-tokenizer'

const gptActionTokensLimit = 4096

export const tokens = (text: string): number => isWithinTokenLimit(text)

export const freeTokensLimit = (text: string): number => {
  const freeTokens = gptActionTokensLimit - tokens(text)
  return (
    freeTokens < 0
      ? 0
      : freeTokens
  )
}

export const cutToAcceptableLimits = (text: string, tokensLimit = gptActionTokensLimit): string => {
  const textTokens = tokens(text)
  if (textTokens > tokensLimit) {
    text = decode(encode(text).slice(0, tokensLimit))
  }
  return text
}
