import {MainPage} from "./pages/main/index.js";
import {api} from "./modules/ajax.js";
import {statsUrls} from "./modules/statsUrls.js";

const root = document.getElementById('root');

function renderMain(data) {
    const mainPage = new MainPage(root, data, onAdd, onDelete, renderMain)
    mainPage.render()
}

// async — потому что внутри используем await
async function loadStats() {
    // await приостанавливает функцию до получения ответа от сервера
    // после этого data содержит уже готовый объект с данными, не промис
    const data = await api.get(statsUrls.getStocks());
    renderMain(data);
}

async function onAdd() {
    const newStat = {
        title: `Выборка №${Date.now()}`,
        description: `Новая статистическая выборка`,
        values: []
    }
    await api.post(statsUrls.createStock(), newStat)
    loadStats()
}

async function onDelete(id) {
    await api.delete(statsUrls.removeStockById(id))
    loadStats()
}

loadStats()
