import {HeaderComponentOutcomes} from "../../components_outcomes/header_outcomes/outcomes.js";
import {apiOutcomes} from "../../modules_outcomes/ajax_outcomes.js";
import {statsUrlsOutcomes} from "../../modules_outcomes/statsUrls_outcomes.js";
import {normalizeOutcome} from "../../modules_outcomes/normalize_outcomes.js";

export class ProductPageOutcomes {
    constructor(parent, id, data, onGoBack) {
        this.parent = parent
        this.id = id
        this.data = data
        this.onGoBack = onGoBack
    }

    async getData() {
        const data = await apiOutcomes.get(statsUrlsOutcomes.getStockById(this.id));
        this.renderData(data);
    }

    renderData(item) {
        const html = this.getHTML(normalizeOutcome(item))
        this.pageRoot.insertAdjacentHTML('afterbegin', html)

    }

    get pageRoot() {
        return document.getElementById('product-page_outcomes')
    }

    getHTML(data) {
        const valuesBlock = Array.isArray(data.values)
            ? `<p class="st_calc-module-description mb-3" style="font-style: italic;">[${data.values.join(', ')}]</p>`
            : ''
        const imgBlock = data.image
            ? `<img src="${data.image}" alt="${data.title ?? ''}"
                   style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 14px; margin-bottom: 14px;">`
            : ''
        return `
            ${imgBlock}
            <h2 class="st_calc-module-title mb-1">${data.title ?? ''}</h2>
            <p class="st_calc-module-description mb-2">${data.text ?? ''}</p>
            ${valuesBlock}
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p><span class="st_calc-label">Среднее арифметическое:</span> <strong style="color: #fff;">${data.mean ?? ''}</strong></p>
            <p><span class="st_calc-label">Дисперсия:</span> <strong style="color: #fff;">${data.variance ?? ''}</strong></p>
            <p><span class="st_calc-label">Медиана:</span> <strong style="color: #fff;">${data.median ?? ''}</strong></p>
            <p><span class="st_calc-label">Стандартное отклонение:</span> <strong style="color: #fff;">${data.std ?? ''}</strong></p>
        `
    }

    clickBack() {
        this.onGoBack()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponentOutcomes(this.parent)
        header.render(this.clickBack.bind(this))

        this.parent.insertAdjacentHTML('beforeend',
            '<div id="product-page_outcomes" class="st_calc-calculator-wrapper"></div>')

        this.getData()
    }
}
