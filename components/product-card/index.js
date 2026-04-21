export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card" style="width: 300px;">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="accordion" id="accordion-${data.id}">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mean-${data.id}">
                                    Среднее
                                </button>
                            </h2>
                            <div id="mean-${data.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${data.id}">
                                <div class="accordion-body">Среднее: <strong>${data.mean}</strong></div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#variance-${data.id}">
                                    Дисперсия
                                </button>
                            </h2>
                            <div id="variance-${data.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${data.id}">
                                <div class="accordion-body">Дисперсия: <strong>${data.variance}</strong></div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#median-${data.id}">
                                    Медиана
                                </button>
                            </h2>
                            <div id="median-${data.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${data.id}">
                                <div class="accordion-body">Медиана: <strong>${data.median}</strong></div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#std-${data.id}">
                                    Стандартное отклонение
                                </button>
                            </h2>
                            <div id="std-${data.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${data.id}">
                                <div class="accordion-body">Стандартное отклонение: <strong>${data.std}</strong></div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary mt-2" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}