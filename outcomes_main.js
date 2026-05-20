import {MainPageOutcomes} from "./pages_outcomes/main_outcomes/outcomes.js";
import {apiOutcomes} from "./modules_outcomes/ajax_outcomes.js";
import {statsUrlsOutcomes} from "./modules_outcomes/statsUrls_outcomes.js";

const root = document.getElementById('root');

function renderMain(data) {
    const mainPage = new MainPageOutcomes(root, data, onAdd, onDelete, renderMain)
    mainPage.render()
}

// async — потому что внутри используем await
async function loadStats() {
    // await приостанавливает функцию до получения ответа от сервера
    // после этого data содержит уже готовый объект с данными, не промис
    const data = await apiOutcomes.get(statsUrlsOutcomes.getStocks());
    renderMain(data);
}

async function onAdd() {
    const newStat = {
        title: `Выборка №${Date.now()}`,
        description: `Новая статистическая выборка`,
        values: []
    }
    await apiOutcomes.post(statsUrlsOutcomes.createStock(), newStat)
    loadStats()
}

async function onDelete(id) {
    await apiOutcomes.delete(statsUrlsOutcomes.removeStockById(id))
    loadStats()
}

loadStats()
