import {BackButtonComponent} from "../../components/back-button/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id, data) {
        this.parent = parent
        this.id = id
        this.data = data
    }

    getData() {
        return this.data.find(item => item.id == this.id)
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
        const mainPage = new MainPage(this.parent, this.data)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render(this.clickBack.bind(this))

        const data = this.getData()
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    }
}