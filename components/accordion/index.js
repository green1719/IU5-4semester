export class AccordionComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        const items = data.map(item => `
            <div class="accordion-item border-0 mb-2" style="border-radius: 12px; overflow: hidden;">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#item-${item.id}"
                        style="background: #EBEFF4; color: #0F141E; font-weight: 600; font-size: 18px;">
                        <span class="me-3" style="
                            width: 40px; height: 40px; background: #3187FF; color: white;
                            border-radius: 50%; display: flex; align-items: center;
                            justify-content: center; font-size: 18px; font-weight: bold;
                            flex-shrink: 0;">
                            ${item.id}
                        </span>
                        ${item.title}
                    </button>
                </h2>
                <div id="item-${item.id}" class="accordion-collapse collapse" data-bs-parent="#main-accordion">
                    <div class="accordion-body" style="background: #EBEFF4;">
                        <p class="st_calc-module-description">${item.text}</p>
                        <button class="st_calc-btn st_calc_primary px-4" 
                            style="width: auto; border-radius: 34px; font-size: 15px;"
                            id="click-card-${item.id}" data-id="${item.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `).join('')

        return `<div class="accordion" id="main-accordion">${items}</div>`
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        data.forEach(item => {
            document
                .getElementById(`click-card-${item.id}`)
                .addEventListener("click", listener)
        })
    }
}