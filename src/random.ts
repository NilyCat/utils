const NUMERIC = '0123456789'
const HEXIC = '0123456789abcdef'
const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

function number(min: number, max: number): number {
  return Math.ceil(Math.random() * (max - min) + min)
}

function string(alphabet: string, len = 6): string {
  let str = ''
  const alphabetLength = alphabet.length

  for (let i = 0; i < len; i++) {
    str += alphabet.charAt(Math.floor(Math.random() * alphabetLength))
  }

  return str
}

function hexic(len: number): string {
  return string(HEXIC, len)
}

function alpha(len: number): string {
  return string(ALPHA, len)
}

function numeric(len: number): string {
  return string(NUMERIC, len)
}

function alphaNumeric(len: number): string {
  return string(ALPHA + NUMERIC, len)
}

export const random = {
  number,
  string,
  hexic,
  alpha,
  numeric,
  alphaNumeric
}
