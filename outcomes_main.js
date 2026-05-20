import {MainPageOutcomes} from "./pages_outcomes/main_outcomes/outcomes.js";
import {getDataOutcomes, addDataOutcomes, deleteDataOutcomes, isMaxOutcomes} from "./data_outcomes/outcomes.js";

const root = document.getElementById('root');

function renderMain() {
    const mainPage = new MainPageOutcomes(root, getDataOutcomes(), onAdd, onDelete, renderMain)
    mainPage.render()
}

function onAdd() {
    if (isMaxOutcomes()) return
    addDataOutcomes()
    renderMain()
}

function onDelete(id) {
    deleteDataOutcomes(id)
    renderMain()
}

renderMain()
