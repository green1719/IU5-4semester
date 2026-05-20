import {StatCardComponentOutcomes} from "../../components_outcomes/stat-card_outcomes/outcomes.js";
import {HeaderComponentOutcomes} from "../../components_outcomes/header_outcomes/outcomes.js";
import {ProductPageOutcomes} from "../product_outcomes/outcomes.js";
import {ajaxOutcomes} from "../../modules_outcomes/ajax_outcomes.js";
import {statsUrlsOutcomes} from "../../modules_outcomes/statsUrls_outcomes.js";
import {normalizeOutcomes} from "../../modules_outcomes/normalize_outcomes.js";

export class MainPageOutcomes {
    constructor(parent, data, onAdd, onDelete, onGoBack) {
        this.parent = parent;
        this.data = data;
        this.onAdd = onAdd;
        this.onDelete = onDelete;
        this.onGoBack = onGoBack;
    }

    getData() {
        ajaxOutcomes.get(statsUrlsOutcomes.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    renderData(items) {
        this.cardsGrid.innerHTML = ''
        const list = normalizeOutcomes(items)
        list.forEach((item) => {
            const card = new StatCardComponentOutcomes(this.cardsGrid)
            card.render(item, this.clickCard.bind(this), this.onDelete)
        })
    }

    get pageRoot() {
        return document.getElementById('main-page_outcomes')
    }

    get cardsGrid() {
        return document.getElementById('cards-container_outcomes')
    }

    getHTML() {
        return `
            <div id="main-page_outcomes" class="st_calc-calculator-wrapper">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <input id="filter-input_outcomes" type="text"
                        placeholder="Поиск по выборке"
                        style="flex: 1; border: none; border-radius: 34px; font-size: 13px; padding: 6px 16px; outline: none; background: #ffffff; color: #0F141E; height: 34px;">
                    <button id="filter-btn_outcomes" class="st_calc-btn st_calc_primary"
                        style="white-space: nowrap; width: auto; border-radius: 34px; font-size: 13px; padding: 6px 14px; margin: 0; height: 34px;">
                        Найти
                    </button>
                    <button id="reset-filter-btn_outcomes" class="st_calc-btn"
                        style="white-space: nowrap; width: auto; border-radius: 34px; font-size: 13px; padding: 6px 14px; background: #ffffff; color: #0F141E; border: none; margin: 0; height: 34px;">
                        Сбросить
                    </button>
                    <button id="add-card-btn_outcomes" class="st_calc-btn st_calc_primary"
                        style="white-space: nowrap; width: auto; border-radius: 34px; font-size: 13px; padding: 6px 14px; margin: 0; height: 34px;">
                        + Добавить
                    </button>
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

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponentOutcomes(this.parent)
        header.render(() => window.location.reload())

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById('add-card-btn_outcomes')
            .addEventListener('click', this.onAdd)

        this.getData()

        document.getElementById('filter-btn_outcomes')
            .addEventListener('click', () => {
                const query = document.getElementById('filter-input_outcomes').value.trim()
                if (query === '') return
                ajaxOutcomes.get(statsUrlsOutcomes.getStocks() + '?title=' + encodeURIComponent(query), (data) => {
                    this.renderData(data)
                })
            })

        document.getElementById('reset-filter-btn_outcomes')
            .addEventListener('click', () => {
                document.getElementById('filter-input_outcomes').value = ''
                this.getData()
            })
    }
}
