(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="st_calc-card" id="card-${e.id}">
                <div class="st_calc-card-header">
                    <span class="st_calc-card-num">${e.id}</span>
                    <h5 class="st_calc-card-title">${e.title}</h5>
                </div>
                <p class="st_calc-card-text">${e.text}</p>
                <div class="st_calc-card-stats">
                    <div class="st_calc-stat-item">
                        <span class="st_calc-stat-label">Среднее</span>
                        <span class="st_calc-stat-value">${e.mean}</span>
                    </div>
                    <div class="st_calc-stat-item">
                        <span class="st_calc-stat-label">Дисперсия</span>
                        <span class="st_calc-stat-value">${e.variance}</span>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-2">
                    <button class="st_calc-btn st_calc_primary"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px;"
                        id="click-card-${e.id}" data-id="${e.id}">
                        Подробнее
                    </button>
                    <button class="st_calc-btn"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px; background: #ff4d4d; color: white;"
                        id="delete-card-${e.id}" data-id="${e.id}">
                        Удалить
                    </button>
                </div>
            </div>
        `}render(e,t,n){let r=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,r),document.getElementById(`click-card-${e.id}`).addEventListener(`click`,t),document.getElementById(`delete-card-${e.id}`).addEventListener(`click`,()=>n(e.id))}},t=class{constructor(e){this.parent=e}getHTML(){return`
            <header class="st_calc_site-header">
                <div class="st_calc_header-row">
                    <span class="st_calc-label">СТАТКАЛЬКУЛЯТОР</span>
                    <button id="home-btn" class="st_calc_header-control-btn">Домой</button>
                </div>
                <h1 class="st_calc-module-title">Калькулятор статистического анализа</h1>
                <h4 class="st_calc-module-description">Арифметика, дисперсия и другие операции над выборкой</h4>
            </header>
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),e&&document.getElementById(`home-btn`).addEventListener(`click`,e)}},n=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button`).addEventListener(`click`,e)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}},r=new class{async get(e){return(await fetch(e)).json()}async post(e,t){return(await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}async patch(e,t){return(await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}async delete(e){let t=await(await fetch(e,{method:`DELETE`})).text();return t?JSON.parse(t):null}},i=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/stats`}getStockById(e){return`${this.baseUrl}/stats/${e}`}createStock(){return`${this.baseUrl}/stats`}removeStockById(e){return`${this.baseUrl}/stats/${e}`}updateStockById(e){return`${this.baseUrl}/stats/${e}`}},a=class{constructor(e,t,n,r){this.parent=e,this.id=t,this.data=n,this.onGoBack=r}async getData(){let e=await r.get(i.getStockById(this.id));this.renderData(e)}renderData(e){let t=this.getHTML(e);this.pageRoot.insertAdjacentHTML(`afterbegin`,t)}get pageRoot(){return document.getElementById(`product-page`)}getHTML(e){return`
            <div id="product-page" class="st_calc-calculator-wrapper">
                <h2 class="st_calc-module-title mb-1">${e.title}</h2>
                <p class="st_calc-module-description mb-3">${e.text}</p>
                <hr>
                <p><span class="st_calc-label">Среднее арифметическое:</span> <strong>${e.mean}</strong></p>
                <p><span class="st_calc-label">Дисперсия:</span> <strong>${e.variance}</strong></p>
                <p><span class="st_calc-label">Медиана:</span> <strong>${e.median}</strong></p>
                <p><span class="st_calc-label">Стандартное отклонение:</span> <strong>${e.std}</strong></p>
            </div>
        `}clickBack(){this.onGoBack()}render(){this.parent.innerHTML=``,new t(this.parent).render(this.clickBack.bind(this));let e=this.getHTML({title:``,text:``,mean:0,variance:0,median:0,std:0});this.parent.insertAdjacentHTML(`beforeend`,e),this.getData(),new n(this.pageRoot).render(this.clickBack.bind(this))}},o=class{constructor(e,t,n,r,i){this.parent=e,this.data=t,this.onAdd=n,this.onDelete=r,this.onGoBack=i}async getData(){let e=await r.get(i.getStocks());this.renderData(e)}renderData(t){t.forEach(t=>{new e(this.cardsGrid).render(t,this.clickCard.bind(this),this.onDelete)})}get pageRoot(){return document.getElementById(`main-page`)}get cardsGrid(){return document.getElementById(`cards-grid`)}getHTML(){return`
            <div id="main-page" class="st_calc-calculator-wrapper">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <input id="search-input" class="st_calc-display-panel" type="text"
                        placeholder="Поиск по названию..."
                        style="width: 260px; height: 40px; border: none; border-radius: 12px;
                               padding: 8px 14px; font-size: 15px; outline: none; text-align: left; margin: 0;">
                    <button id="add-card-btn" class="st_calc-btn st_calc_primary"
                        style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;
                               opacity: 1; cursor: pointer;"
                        >
                        + Добавить выборку
                    </button>
                </div>
                <div id="cards-grid" class="st_calc-cards-grid"></div>
            </div>
        `}clickCard(e){let t=e.target.dataset.id;new a(this.parent,t,this.data,this.onGoBack).render()}renderCards(t){let n=this.cardsGrid;n.innerHTML=``,t.forEach(t=>{new e(n).render(t,this.clickCard.bind(this),this.onDelete)})}render(){this.parent.innerHTML=``,new t(this.parent).render(()=>window.location.reload());let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),document.getElementById(`add-card-btn`).addEventListener(`click`,this.onAdd),this.getData(),document.getElementById(`search-input`).addEventListener(`input`,e=>{let t=e.target.value;r.get(i.getStocks()+`?title=`+t).then(e=>{this.cardsGrid.innerHTML=``,this.renderData(e)})})}},s=document.getElementById(`root`);function c(e){new o(s,e,u,d,c).render()}async function l(){c(await r.get(i.getStocks()))}async function u(){let e={title:`Выборка №${Date.now()}`,description:`Новая статистическая выборка`,values:[]};await r.post(i.createStock(),e),l()}async function d(e){await r.delete(i.removeStockById(e)),l()}l();