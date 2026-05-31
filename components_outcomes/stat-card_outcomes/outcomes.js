export class StatCardComponentOutcomes {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="st_calc-card" id="card-${data.id}">
                ${data.image ? `<img src="${data.image}" alt="${data.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">` : ''}
                <div class="st_calc-card-header">
                    <span class="st_calc-card-num">${data.id}</span>
                    <h5 class="st_calc-card-title">${data.title}</h5>
                </div>
                <p class="st_calc-card-text">${data.text}</p>
                <div class="st_calc-card-stats">
                    <div class="st_calc-stat-item">
                        <span class="st_calc-stat-label">Среднее</span>
                        <span class="st_calc-stat-value">${data.mean}</span>
                    </div>
                    <div class="st_calc-stat-item">
                        <span class="st_calc-stat-label">Дисперсия</span>
                        <span class="st_calc-stat-value">${data.variance}</span>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-2">
                    <button class="st_calc-btn st_calc_primary"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px;"
                        id="click-card-${data.id}" data-id="${data.id}">
                        Рассчитать
                    </button>
                    <button class="st_calc-btn"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px; background: #ffffff; color: #0F141E;"
                        id="edit-card-${data.id}" data-id="${data.id}">
                        Изменить
                    </button>
                </div>
                <div class="d-flex gap-2 mt-2">
                    <button class="st_calc-btn"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px; background: #ff4d4d; color: white;"
                        id="delete-card-${data.id}" data-id="${data.id}">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    render(data, clickListener, editListener, deleteListener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById(`click-card-${data.id}`)
            .addEventListener('click', clickListener)

        document.getElementById(`edit-card-${data.id}`)
            .addEventListener('click', () => editListener(data))

        document.getElementById(`delete-card-${data.id}`)
            .addEventListener('click', () => deleteListener(data.id))
    }
}
