import {StatCardComponentOutcomes} from "../../components_outcomes/stat-card_outcomes/outcomes.js";
import {HeaderComponentOutcomes} from "../../components_outcomes/header_outcomes/outcomes.js";
import {ProductPageOutcomes} from "../product_outcomes/outcomes.js";

export class MainPageOutcomes {
    constructor(parent, data, onAdd, onDelete, onGoBack) {
        this.parent = parent;
        this.data = data;
        this.onAdd = onAdd;
        this.onDelete = onDelete;
        this.onGoBack = onGoBack;
    }

    get pageRoot() {
        return document.getElementById('main-page_outcomes')
    }

    get cardsGrid() {
        return document.getElementById('cards-container_outcomes')
    }

    getHTML() {
        const isMax = this.data.length >= 7;
        return `
            <div id="main-page_outcomes" class="st_calc-calculator-wrapper">
                <div class="d-flex flex-column align-items-center gap-2 mb-3">
                    <input id="filter-input_outcomes" class="form-control w-50" type="text"
                        placeholder="Введите название выборки">
                    <div class="d-flex gap-2">
                        <button id="filter-btn_outcomes" class="st_calc-btn st_calc_primary"
                            style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;">
                            Применить фильтр
                        </button>
                        <button id="reset-filter-btn_outcomes" class="st_calc-btn"
                            style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px; background: #ffffff; color: #0F141E; border: 2px solid #0F141E;">
                            Сбросить фильтр
                        </button>
                        <button id="add-card-btn_outcomes" class="st_calc-btn st_calc_primary"
                            style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;
                                   opacity: ${isMax ? '0.4' : '1'}; cursor: ${isMax ? 'not-allowed' : 'pointer'};"
                            ${isMax ? 'disabled' : ''}>
                            ${isMax ? 'Достигнут лимит (7)' : '+ Добавить выборку'}
                        </button>
                    </div>
                </div>
                <div id="cards-container_outcomes" class="st_calc-cards-grid"></div>
            </div>
        `
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPageOutcomes(this.parent, cardId, this.data, this.onGoBack)
        productPage.render()
    }

    renderCards(data) {
        const grid = this.cardsGrid
        grid.innerHTML = ''

        data.forEach(item => {
            const card = new StatCardComponentOutcomes(grid)
            card.render(item, this.clickCard.bind(this), this.onDelete)
        })
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponentOutcomes(this.parent)
        header.render(() => window.location.reload())

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById('add-card-btn_outcomes')
            .addEventListener('click', this.onAdd)

        this.renderCards(this.data)

        document.getElementById('filter-btn_outcomes')
            .addEventListener('click', () => {
                const query = document.getElementById('filter-input_outcomes').value.toLowerCase().trim()
                if (query === '') return
                const filtered = this.data.filter(item =>
                    item.title.toLowerCase().includes(query)
                )
                this.renderCards(filtered)
            })

        document.getElementById('reset-filter-btn_outcomes')
            .addEventListener('click', () => {
                document.getElementById('filter-input_outcomes').value = ''
                this.renderCards(this.data)
            })
    }
}
