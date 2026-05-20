export class BackButtonComponentOutcomes {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button_outcomes")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="back-button_outcomes" class="btn btn-primary" type="button">Назад</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}
