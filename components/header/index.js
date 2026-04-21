export class HeaderComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
            <header class="st_calc_site-header">
                <div class="st_calc_header-row">
                    <span class="st_calc-label">СТАТКАЛЬКУЛЯТОР</span>
                    <button id="home-btn" class="st_calc_header-control-btn">Домой</button>
                </div>
                <h1 class="st_calc-module-title">Калькулятор статистического анализа</h1>
                <h4 class="st_calc-module-description">Арифметика, дисперсия и другие операции над выборкой</h4>
            </header>
        `
    }

    render(onHome) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        if (onHome) {
            document.getElementById('home-btn')
                .addEventListener('click', onHome)
        }
    }
}