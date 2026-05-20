// Сопоставление title выборки → путь к картинке.
export function getOutcomeImage(title) {
    const t = (title ?? '').toLowerCase()
    if (t.includes('фибоначч'))  return 'assets/outcomes/fibonacci_spiral.svg'
    if (t.includes('прост'))     return 'assets/outcomes/primes.gif'
    if (t.includes('квадрат'))   return 'assets/outcomes/parabola.svg'
    if (t.includes('степен'))    return 'assets/outcomes/exponential.svg'
    return 'assets/outcomes/fibonacci_spiral.svg'
}
