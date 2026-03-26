export class HeaderComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
            <header class="st_calc_site-header">
                <div class="st_calc_header-row">
                    <span class="st_calc-label">СТАТКАЛЬКУЛЯТОР</span>
                    <button id="open-upload-modal" class="upload-btn">+ Загрузить модель</button>
                </div>
                <h1 class="st_calc-module-title">Калькулятор статистического анализа</h1>
                <p class="st_calc-module-description">Арифметика, дисперсия и другие операции над выборкой</p>
            </header>

            <!-- Модальное окно загрузки -->
            <div id="upload-modal" style="
                display: none; position: fixed; inset: 0;
                background: rgba(0,0,0,0.5); z-index: 1000;
                align-items: center; justify-content: center;">
                <div style="
                    background: #fff; border-radius: 16px;
                    padding: 28px 32px; min-width: 320px;
                    display: flex; flex-direction: column; gap: 14px;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Загрузить модель</h3>

                    <label style="font-size: 14px; color: #555;">Название модели</label>
                    <input id="model-name-input" type="text" placeholder="Введите название..."
                        style="border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; font-size: 15px;" />

                    <label style="font-size: 14px; color: #555;">Файл (.glb)</label>
                    <input id="model-file-input" type="file" accept=".glb"
                        style="font-size: 14px;" />

                    <div id="upload-error" style="color: red; font-size: 13px; display: none;"></div>

                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 4px;">
                        <button id="cancel-upload-btn" class="upload-btn" 
                            style="background: #ebeff4; color: #0f141e;">Отмена</button>
                        <button id="confirm-upload-btn" class="upload-btn">Добавить</button>
                    </div>
                </div>
            </div>
        `
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}