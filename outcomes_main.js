import {MainPageOutcomes} from "./pages_outcomes/main_outcomes/outcomes.js";
import {ajaxOutcomes} from "./modules_outcomes/ajax_outcomes.js";
import {statsUrlsOutcomes} from "./modules_outcomes/statsUrls_outcomes.js";

const root = document.getElementById('root');

function renderMain(data) {
    const mainPage = new MainPageOutcomes(root, data, onAdd, onDelete, renderMain)
    mainPage.render()
}

function loadStats() {
    ajaxOutcomes.get(statsUrlsOutcomes.getStocks(), (data) => {
        renderMain(data);
    })
}

const addTemplates = [
    { title: "Числа Фибоначчи", description: "Первые 10 чисел последовательности Фибоначчи", values: [1,1,2,3,5,8,13,21,34,55] },
    { title: "Простые числа",   description: "Первые 10 простых чисел",                       values: [2,3,5,7,11,13,17,19,23,29] },
    { title: "Квадраты чисел", description: "Квадраты натуральных чисел от 1 до 10",          values: [1,4,9,16,25,36,49,64,81,100] },
    { title: "Степени двойки", description: "Степени числа 2 от 0 до 9",                      values: [1,2,4,8,16,32,64,128,256,512] },
]

function onAdd() {
    ajaxOutcomes.get(statsUrlsOutcomes.getStocks(), (current) => {
        const num = Array.isArray(current) && current.length > 0
            ? Math.max(...current.map(o => o.id)) + 1
            : 1
        const t = addTemplates[(num - 1) % addTemplates.length]
        const newStat = {
            title: `${t.title} (копия)`,
            description: t.description,
            values: t.values
        }
        ajaxOutcomes.post(statsUrlsOutcomes.createStock(), newStat, () => {
            loadStats()
        })
    })
}

function onDelete(id) {
    ajaxOutcomes.delete(statsUrlsOutcomes.removeStockById(id), () => {
        loadStats()
    })
}

loadStats()
