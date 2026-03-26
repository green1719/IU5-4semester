import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');

let nextId = 4;
const MAX_ITEMS = 7;

let mockData = [
    { id: 1, title: "Выборка №1", text: "Анализ случайной выборки из 10 элементов", mean: 42.5, variance: 18.3, median: 41.0, std: 4.28 },
    { id: 2, title: "Выборка №2", text: "Анализ случайной выборки из 20 элементов", mean: 55.1, variance: 24.7, median: 54.5, std: 4.97 },
    { id: 3, title: "Выборка №3", text: "Анализ случайной выборки из 30 элементов", mean: 38.9, variance: 31.2, median: 37.0, std: 5.59 },
]

function renderMain() {
    const mainPage = new MainPage(root, mockData, onAdd, onDelete)
    mainPage.render()
}

function onAdd() {
    if (mockData.length >= MAX_ITEMS) return;
    const first = mockData[0]
    const num = nextId++
    mockData.push({
        ...first,
        id: num,
        title: `Выборка №${num}`,
        text: `Анализ случайной выборки из ${num * 10} элементов`
    })
    renderMain()
}

function onDelete(id) {
    mockData = mockData.filter(item => item.id != id)
    renderMain()
}

renderMain()