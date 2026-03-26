import {AccordionComponent} from "../../components/accordion/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent, data, onAdd, onDelete) {
        this.parent = parent;
        this.data = data;
        this.onAdd = onAdd;
        this.onDelete = onDelete;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
    const isMax = this.data.length >= 7;
    return `
        <div id="main-page" class="st_calc-calculator-wrapper">
            <button id="add-card-btn" class="st_calc-btn st_calc_primary px-4 mb-3"
                style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;
                       opacity: ${isMax ? '0.4' : '1'}; cursor: ${isMax ? 'not-allowed' : 'pointer'};"
                ${isMax ? 'disabled' : ''}>
                ${isMax ? 'Достигнут лимит (7)' : '+ Добавить выборку'}
            </button>
        </div>
    `
}

    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId, this.data)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render(() => window.location.reload())

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById('add-card-btn')
            .addEventListener('click', this.onAdd)

        const accordion = new AccordionComponent(this.pageRoot)
        accordion.render(this.data, this.clickCard.bind(this), this.onDelete)
    }
}