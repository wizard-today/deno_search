import { encode, decode } from 'npm:gpt-tokenizer'

const gptActionTokensLimit = 4096

export type CutOptions = {
  offset?: number
}

export const cutToGPTsAcceptableLimits = (text: string, options?: CutOptions): string => {
  const tokensOffset = (options?.offset ?? 0) * gptActionTokensLimit
  const tokensLimit = tokensOffset + gptActionTokensLimit
  return decode(
    encode(text).slice(tokensOffset, tokensLimit)
  )
}
