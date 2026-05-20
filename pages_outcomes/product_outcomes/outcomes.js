import {BackButtonComponentOutcomes} from "../../components_outcomes/back-button_outcomes/outcomes.js";
import {HeaderComponentOutcomes} from "../../components_outcomes/header_outcomes/outcomes.js";
import {calcStats} from "../../data_outcomes/outcomes.js";

export class ProductPageOutcomes {
    constructor(parent, id, data, onGoBack) {
        this.parent = parent
        this.id = id
        this.data = data
        this.onGoBack = onGoBack
    }

    getData() {
        return this.data.find(item => item.id == this.id)
    }

    get pageRoot() {
        return document.getElementById('product-page_outcomes')
    }

    getHTML(data) {
        const stats = calcStats(data.values)
        return `
            <div id="product-page_outcomes" class="st_calc-calculator-wrapper">
                <h2 class="st_calc-module-title mb-1">${data.title}</h2>
                <p class="st_calc-module-description mb-2">${data.text}</p>
                <p class="st_calc-module-description mb-3" style="font-style: italic;">[${data.values.join(', ')}]</p>
                <hr style="border-color: rgba(255,255,255,0.3);">
                <p><span class="st_calc-label">Среднее арифметическое:</span> <strong style="color: #fff;">${stats.mean}</strong></p>
                <p><span class="st_calc-label">Дисперсия:</span> <strong style="color: #fff;">${stats.variance}</strong></p>
                <p><span class="st_calc-label">Медиана:</span> <strong style="color: #fff;">${stats.median}</strong></p>
                <p><span class="st_calc-label">Стандартное отклонение:</span> <strong style="color: #fff;">${stats.std}</strong></p>
            </div>
        `
    }

    clickBack() {
        this.onGoBack()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponentOutcomes(this.parent)
        header.render(this.clickBack.bind(this))

        const data = this.getData()
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponentOutcomes(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    }
}
