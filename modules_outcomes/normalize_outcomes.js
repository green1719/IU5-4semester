import {getOutcomeImage} from "./outcomes_images.js";

// Приводит ответ бэкенда lab4.2 (поля description, methods[]) к виду,
// который ожидают компоненты (text, mean, variance, median, std, image).
function findMethod(methods, name) {
    if (!Array.isArray(methods)) return ''
    const m = methods.find(x => x.name === name)
    return m ? m.result : ''
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
        image: getOutcomeImage(item.title),
    }
}

export function normalizeOutcomes(items) {
    if (!Array.isArray(items)) return []
    return items.map(normalizeOutcome)
}
