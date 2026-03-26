import {BackButtonComponent} from "../../components/back-button/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        const data = {
            1: { title: "Выборка №1", text: "Анализ случайной выборки из 10 элементов", mean: 42.5, variance: 18.3, median: 41.0, std: 4.28 },
            2: { title: "Выборка №2", text: "Анализ случайной выборки из 20 элементов", mean: 55.1, variance: 24.7, median: 54.5, std: 4.97 },
            3: { title: "Выборка №3", text: "Анализ случайной выборки из 30 элементов", mean: 38.9, variance: 31.2, median: 37.0, std: 5.59 },
        }
        return data[this.id]
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
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render()

        const data = this.getData()
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    }
}