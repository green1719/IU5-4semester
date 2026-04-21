import {BackButtonComponent} from "../../components/back-button/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {ajax} from "../../modules/ajax.js";
import {statsUrls} from "../../modules/statsUrls.js";

export class ProductPage {
    constructor(parent, id, data, onGoBack) {
        this.parent = parent
        this.id = id
        this.data = data
        this.onGoBack = onGoBack
    }

    getData() {
        ajax.get(statsUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        })
    }
    renderData(item) {
        const html = this.getHTML(item)
        this.pageRoot.insertAdjacentHTML('afterbegin', html)
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML(data) {
        return `
            <div id="product-page" class="st_calc-calculator-wrapper">
                <h2 class="st_calc-module-title mb-1">${data.title}</h2>
                <p class="st_calc-module-description mb-3">${data.text}</p>
                <hr>
                <p><span class="st_calc-label">Среднее арифметическое:</span> <strong>${data.mean}</strong></p>
                <p><span class="st_calc-label">Дисперсия:</span> <strong>${data.variance}</strong></p>
                <p><span class="st_calc-label">Медиана:</span> <strong>${data.median}</strong></p>
                <p><span class="st_calc-label">Стандартное отклонение:</span> <strong>${data.std}</strong></p>
            </div>
        `
    }

    clickBack() {
        this.onGoBack()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render(this.clickBack.bind(this))

        const html = this.getHTML({title: '', text: '', mean: 0, variance: 0, median: 0, std: 0})
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData()

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    }
}
