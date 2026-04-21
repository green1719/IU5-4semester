import {MainPage} from "./pages/main/index.js";
import {ajax} from "./modules/ajax.js";
import {statsUrls} from "./modules/statsUrls.js";

const root = document.getElementById('root');

function renderMain(data) {
    const mainPage = new MainPage(root, data, onAdd, onDelete, renderMain)
    mainPage.render()
}

function loadStats() {
    ajax.get(statsUrls.getStocks(), (data) => {
        renderMain(data);
    })
}

function onAdd() {
    const newStat = {
        title: `Выборка №${Date.now()}`,
        description: `Новая статистическая выборка`,
        values: []
    }
    ajax.post(statsUrls.createStock(), newStat, () => {
        loadStats()
    })
}

function onDelete(id) {
    ajax.delete(statsUrls.removeStockById(id), () => {
        loadStats()
    })
}

loadStats()
