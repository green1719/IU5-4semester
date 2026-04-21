import {StatCardComponent} from "../../components/stat-card/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent, data, onAdd, onDelete, onGoBack) {
        this.parent = parent;
        this.data = data;
        this.onAdd = onAdd;
        this.onDelete = onDelete;
        this.onGoBack = onGoBack;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    get cardsGrid() {
        return document.getElementById('cards-grid')
    }

    getHTML() {
        const isMax = this.data.length >= 7;
        return `
            <div id="main-page" class="st_calc-calculator-wrapper">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <input id="search-input" class="st_calc-display-panel" type="text"
                        placeholder="Поиск по названию..."
                        style="width: 260px; height: 40px; border: none; border-radius: 12px;
                               padding: 8px 14px; font-size: 15px; outline: none; text-align: left; margin: 0;">
                    <button id="add-card-btn" class="st_calc-btn st_calc_primary"
                        style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;
                               opacity: ${isMax ? '0.4' : '1'}; cursor: ${isMax ? 'not-allowed' : 'pointer'};"
                        ${isMax ? 'disabled' : ''}>
                        ${isMax ? 'Достигнут лимит (7)' : '+ Добавить выборку'}
                    </button>
                </div>
                <div id="cards-grid" class="st_calc-cards-grid"></div>
            </div>
        `
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId, this.data, this.onGoBack)
        productPage.render()
    }

    renderCards(data) {
        const grid = this.cardsGrid
        grid.innerHTML = ''

        data.forEach(item => {
            const card = new StatCardComponent(grid)
            card.render(item, this.clickCard.bind(this), this.onDelete)
        })
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render(() => window.location.reload())

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById('add-card-btn')
            .addEventListener('click', this.onAdd)

        this.renderCards(this.data)

        document.getElementById('search-input')
            .addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase()
                const filtered = this.data.filter(item =>
                    item.title.toLowerCase().includes(query)
                )
                this.renderCards(filtered)
            })
    }
}
