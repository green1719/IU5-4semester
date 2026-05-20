// Приводит ответ бэкенда lab4.2 (поля description, methods[]) к виду,
// который ожидают компоненты (text, mean, variance, median, std, image).
function findMethod(methods, name) {
    if (!Array.isArray(methods)) return ''
    const m = methods.find(x => x.name === name)
    return m ? m.result : ''
}

function getOutcomeImage(title) {
    const t = (title ?? '').toLowerCase()
    if (t.includes('фибоначч'))  return '/images_outcomes/fibonacci_spiral.svg'
    if (t.includes('прост'))     return '/images_outcomes/primes.gif'
    if (t.includes('квадрат'))   return '/images_outcomes/parabola.svg'
    if (t.includes('степен'))    return '/images_outcomes/exponential.svg'
    return '/images_outcomes/fibonacci_spiral.svg'
}

export function normalizeOutcome(item) {
    if (!item || typeof item !== 'object') return item
    return {
        id: item.id,
        title: item.title ?? '',
        text: item.description ?? item.text ?? '',
        values: item.values ?? [],
        mean: findMethod(item.methods, 'Математическое ожидание'),
        variance: findMethod(item.methods, 'Дисперсия'),
        median: findMethod(item.methods, 'Медиана'),
        std: findMethod(item.methods, 'Стандартное отклонение'),
        image: item.image ?? getOutcomeImage(item.title),
    }
}

export function normalizeOutcomes(items) {
    if (!Array.isArray(items)) return []
    return items.map(normalizeOutcome)
}
