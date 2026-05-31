import {MainPageOutcomes} from "./pages_outcomes/main_outcomes/outcomes.js";
import {apiOutcomes} from "./modules_outcomes/ajax_outcomes.js";
import {statsUrlsOutcomes} from "./modules_outcomes/statsUrls_outcomes.js";

const root = document.getElementById('root');

function renderMain(data) {
    const mainPage = new MainPageOutcomes(root, data, onAdd, onDelete, onEdit, renderMain)
    mainPage.render()
}

// async — потому что внутри используем await
async function loadStats() {
    // await приостанавливает функцию до получения ответа от сервера
    // после этого data содержит уже готовый объект с данными, не промис
    const data = await apiOutcomes.get(statsUrlsOutcomes.getStocks());
    renderMain(data);
}

const addTemplates = [
    { title: "Числа Фибоначчи", description: "Первые 10 чисел последовательности Фибоначчи", values: [1,1,2,3,5,8,13,21,34,55] },
    { title: "Простые числа",   description: "Первые 10 простых чисел",                       values: [2,3,5,7,11,13,17,19,23,29] },
    { title: "Квадраты чисел", description: "Квадраты натуральных чисел от 1 до 10",          values: [1,4,9,16,25,36,49,64,81,100] },
    { title: "Степени двойки", description: "Степени числа 2 от 0 до 9",                      values: [1,2,4,8,16,32,64,128,256,512] },
]

async function onAdd() {
    const current = await apiOutcomes.get(statsUrlsOutcomes.getStocks())
    const num = Array.isArray(current) && current.length > 0
        ? Math.max(...current.map(o => o.id)) + 1
        : 1
    const t = addTemplates[(num - 1) % addTemplates.length]
    const newStat = {
        title: `${t.title} (копия)`,
        description: t.description,
        values: t.values
    }
    await apiOutcomes.post(statsUrlsOutcomes.createStock(), newStat)
    loadStats()
}

async function onDelete(id) {
    await apiOutcomes.delete(statsUrlsOutcomes.removeStockById(id))
    loadStats()
}

async function onEdit(id, data) {
    await apiOutcomes.patch(statsUrlsOutcomes.updateStockById(id), data)
    loadStats()
}

loadStats()
