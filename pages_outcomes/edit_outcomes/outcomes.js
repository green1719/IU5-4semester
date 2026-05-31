import {HeaderComponentOutcomes} from "../../components_outcomes/header_outcomes/outcomes.js";
import {apiOutcomes} from "../../modules_outcomes/ajax_outcomes.js";
import {statsUrlsOutcomes} from "../../modules_outcomes/statsUrls_outcomes.js";

export class EditPageOutcomes {
    constructor(parent, data, onGoBack, onEdit) {
        this.parent = parent
        this.data = data   // уже нормализованный объект с id, title, text
        this.onGoBack = onGoBack
        this.onEdit = onEdit
    }

    get pageRoot() {
        return document.getElementById('edit-page_outcomes')
    }

    getHTML() {
        return `
            <div id="edit-page_outcomes" class="st_calc-calculator-wrapper">
                <h2 class="st_calc-module-title mb-3">Редактировать выборку</h2>
                <div class="mb-3">
                    <label class="st_calc-label d-block mb-1">Название</label>
                    <input id="edit-title_outcomes" type="text" value="${this.data.title}"
                        style="width: 100%; border: none; border-radius: 12px;
                               background: rgba(255,255,255,0.15); color: #ffffff;
                               padding: 10px 14px; font-size: 15px; outline: none;">
                </div>
                <div class="mb-4">
                    <label class="st_calc-label d-block mb-1">Описание</label>
                    <textarea id="edit-desc_outcomes" rows="3"
                        style="width: 100%; border: none; border-radius: 12px;
                               background: rgba(255,255,255,0.15); color: #ffffff;
                               padding: 10px 14px; font-size: 15px; outline: none; resize: none;">${this.data.text}</textarea>
                </div>
                <div class="d-flex gap-2">
                    <button id="edit-save_outcomes" class="st_calc-btn st_calc_primary"
                        style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 24px;">
                        Сохранить
                    </button>
                    <button id="edit-cancel_outcomes" class="st_calc-btn"
                        style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 24px;
                               background: rgba(255,255,255,0.15); color: #ffffff; border: none;">
                        Отмена
                    </button>
                </div>
            </div>
        `
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponentOutcomes(this.parent)
        header.render(this.onGoBack)

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        document.getElementById('edit-save_outcomes')
            .addEventListener('click', async () => {
                const title = document.getElementById('edit-title_outcomes').value.trim()
                const description = document.getElementById('edit-desc_outcomes').value.trim()
                await this.onEdit(this.data.id, { title, description })
                this.onGoBack()
            })

        document.getElementById('edit-cancel_outcomes')
            .addEventListener('click', this.onGoBack)
    }
}
