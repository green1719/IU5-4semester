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

function onAdd() {
    const newStat = {
        title: `Выборка №${Date.now()}`,
        description: `Новая статистическая выборка`
    }
    ajaxOutcomes.post(statsUrlsOutcomes.createStock(), newStat, () => {
        loadStats()
    })
}

function onDelete(id) {
    ajaxOutcomes.delete(statsUrlsOutcomes.removeStockById(id), () => {
        loadStats()
    })
}

loadStats()
