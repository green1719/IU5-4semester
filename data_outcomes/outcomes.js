const MAX_ITEMS = 7

function calcMean(values) {
    return values.reduce((s, v) => s + v, 0) / values.length
}

function calcVariance(values) {
    const m = calcMean(values)
    return values.reduce((s, v) => s + (v - m) ** 2, 0) / values.length
}

function calcMedian(values) {
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function calcStd(values) {
    return Math.sqrt(calcVariance(values))
}

export function calcStats(values) {
    return {
        mean: +calcMean(values).toFixed(2),
        variance: +calcVariance(values).toFixed(2),
        median: +calcMedian(values).toFixed(2),
        std: +calcStd(values).toFixed(2)
    }
}

const templates = [
    {
        title: "Числа Фибоначчи",
        text: "Первые 10 чисел последовательности Фибоначчи",
        values: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        image: "images_outcomes/fibonacci_spiral.svg"
    },
    {
        title: "Простые числа",
        text: "Первые 10 простых чисел",
        values: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
        image: "images_outcomes/primes.gif"
    },
    {
        title: "Квадраты чисел",
        text: "Квадраты натуральных чисел от 1 до 10",
        values: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],
        image: "images_outcomes/parabola.svg"
    },
    {
        title: "Степени двойки",
        text: "Степени числа 2 от 0 до 9",
        values: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
        image: "images_outcomes/exponential.svg"
    },
]

let nextId = templates.length + 1

let data = templates.map((t, i) => ({
    id: i + 1,
    title: t.title,
    text: t.text,
    values: t.values,
    image: t.image,
    ...calcStats(t.values)
}))

export function getDataOutcomes() {
    return data
}

export function addDataOutcomes() {
    if (data.length >= MAX_ITEMS) return
    const t = templates[Math.floor(Math.random() * templates.length)]
    const num = nextId++
    data.push({
        id: num,
        title: t.title + " (копия)",
        text: t.text,
        values: [...t.values],
        image: t.image,
        ...calcStats(t.values)
    })
}

export function deleteDataOutcomes(id) {
    data = data.filter(item => item.id != id)
}

export function filterDataOutcomes(query) {
    return data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    )
}

export function isMaxOutcomes() {
    return data.length >= MAX_ITEMS
}

// ============================================================
// ЛАБ 5 — реализация через Fetch API (Promise)
// Требует запущенного сервера: http://localhost:3000
// ============================================================

const API_URL = 'http://localhost:3000/outcomes'

export function fetchGetAllOutcomes(title = '') {
    const url = title ? `${API_URL}?title=${encodeURIComponent(title)}` : API_URL
    return fetch(url)
        .then(res => res.json())
}

export function fetchGetOutcomeById(id) {
    return fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Исход не найден')
            return res.json()
        })
}

export function fetchCreateOutcome(data) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export function fetchUpdateOutcome(id, data) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) throw new Error('Исход не найден')
        return res.json()
    })
}

export function fetchDeleteOutcome(id) {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Исход не найден')
        })
}

// ============================================================
// ЛАБ 5 — реализация через XMLHttpRequest (AJAX)
// Требует запущенного сервера: http://localhost:3000
// ============================================================

export function ajaxGetAllOutcomes(title, onSuccess, onError) {
    const xhr = new XMLHttpRequest()
    const url = title ? `${API_URL}?title=${encodeURIComponent(title)}` : API_URL
    xhr.open('GET', url)
    xhr.onload = () => onSuccess(JSON.parse(xhr.responseText))
    xhr.onerror = () => onError('Ошибка запроса')
    xhr.send()
}

export function ajaxGetOutcomeById(id, onSuccess, onError) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${API_URL}/${id}`)
    xhr.onload = () => {
        if (xhr.status === 404) return onError('Исход не найден')
        onSuccess(JSON.parse(xhr.responseText))
    }
    xhr.onerror = () => onError('Ошибка запроса')
    xhr.send()
}

export function ajaxCreateOutcome(data, onSuccess, onError) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => onSuccess(JSON.parse(xhr.responseText))
    xhr.onerror = () => onError('Ошибка запроса')
    xhr.send(JSON.stringify(data))
}

export function ajaxUpdateOutcome(id, data, onSuccess, onError) {
    const xhr = new XMLHttpRequest()
    xhr.open('PATCH', `${API_URL}/${id}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
        if (xhr.status === 404) return onError('Исход не найден')
        onSuccess(JSON.parse(xhr.responseText))
    }
    xhr.onerror = () => onError('Ошибка запроса')
    xhr.send(JSON.stringify(data))
}

export function ajaxDeleteOutcome(id, onSuccess, onError) {
    const xhr = new XMLHttpRequest()
    xhr.open('DELETE', `${API_URL}/${id}`)
    xhr.onload = () => {
        if (xhr.status === 404) return onError('Исход не найден')
        onSuccess()
    }
    xhr.onerror = () => onError('Ошибка запроса')
    xhr.send()
}
