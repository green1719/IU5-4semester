import {MainPage} from "./pages/main/index.js";
import {getData, addData, deleteData, isMax} from "./services/statDataService.js";

const root = document.getElementById('root');

function renderMain() {
    const mainPage = new MainPage(root, getData(), onAdd, onDelete, renderMain)
    mainPage.render()
}

function onAdd() {
    if (isMax()) return
    addData()
    renderMain()
}

function onDelete(id) {
    deleteData(id)
    renderMain()
}

renderMain()
