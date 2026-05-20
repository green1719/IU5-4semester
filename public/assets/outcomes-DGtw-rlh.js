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
                    <button id="home-btn_outcomes" class="st_calc_header-control-btn">Домой</button>
                </div>
                <h1 class="st_calc-module-title">Калькулятор статистического анализа</h1>
                <h4 class="st_calc-module-description">Арифметика, дисперсия и другие операции над выборкой</h4>
            </header>
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),e&&document.getElementById(`home-btn_outcomes`).addEventListener(`click`,e)}},n=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button_outcomes`).addEventListener(`click`,e)}getHTML(){return`
                <button id="back-button_outcomes" class="btn btn-primary" type="button">Назад</button>
            `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}},r=new class{async get(e){return(await fetch(e)).json()}async post(e,t){return(await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}async patch(e,t){return(await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}async delete(e){let t=await(await fetch(e,{method:`DELETE`})).text();return t?JSON.parse(t):null}},i=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/outcomes`}getStockById(e){return`${this.baseUrl}/outcomes/${e}`}createStock(){return`${this.baseUrl}/outcomes`}removeStockById(e){return`${this.baseUrl}/outcomes/${e}`}updateStockById(e){return`${this.baseUrl}/outcomes/${e}`}};function a(e,t){if(!Array.isArray(e))return``;let n=e.find(e=>e.name===t);return n?n.result:``}function o(e){return!e||typeof e!=`object`?e:{id:e.id,title:e.title??``,text:e.description??e.text??``,values:e.values??[],mean:a(e.methods,`Математическое ожидание`),variance:a(e.methods,`Дисперсия`),median:a(e.methods,`Медиана`),std:a(e.methods,`Стандартное отклонение`)}}function s(e){return Array.isArray(e)?e.map(o):[]}var c=class{constructor(e,t,n,r){this.parent=e,this.id=t,this.data=n,this.onGoBack=r}async getData(){let e=await r.get(i.getStockById(this.id));this.renderData(e)}renderData(e){let t=this.getHTML(o(e));this.pageRoot.insertAdjacentHTML(`afterbegin`,t),new n(this.pageRoot).render(this.clickBack.bind(this))}get pageRoot(){return document.getElementById(`product-page_outcomes`)}getHTML(e){let t=Array.isArray(e.values)?`<p class="st_calc-module-description mb-3" style="font-style: italic;">[${e.values.join(`, `)}]</p>`:``;return`
            <h2 class="st_calc-module-title mb-1">${e.title??``}</h2>
            <p class="st_calc-module-description mb-2">${e.text??``}</p>
            ${t}
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p><span class="st_calc-label">Среднее арифметическое:</span> <strong style="color: #fff;">${e.mean??``}</strong></p>
            <p><span class="st_calc-label">Дисперсия:</span> <strong style="color: #fff;">${e.variance??``}</strong></p>
            <p><span class="st_calc-label">Медиана:</span> <strong style="color: #fff;">${e.median??``}</strong></p>
            <p><span class="st_calc-label">Стандартное отклонение:</span> <strong style="color: #fff;">${e.std??``}</strong></p>
        `}clickBack(){this.onGoBack()}render(){this.parent.innerHTML=``,new t(this.parent).render(this.clickBack.bind(this)),this.parent.insertAdjacentHTML(`beforeend`,`<div id="product-page_outcomes" class="st_calc-calculator-wrapper"></div>`),this.getData()}},l=class{constructor(e,t,n,r,i){this.parent=e,this.data=t,this.onAdd=n,this.onDelete=r,this.onGoBack=i}async getData(){let e=await r.get(i.getStocks());this.renderData(e)}renderData(t){this.cardsGrid.innerHTML=``,s(t).forEach(t=>{new e(this.cardsGrid).render(t,this.clickCard.bind(this),this.onDelete)})}get pageRoot(){return document.getElementById(`main-page_outcomes`)}get cardsGrid(){return document.getElementById(`cards-container_outcomes`)}getHTML(){return`
            <div id="main-page_outcomes" class="st_calc-calculator-wrapper">
                <div class="d-flex flex-column align-items-center gap-2 mb-3">
                    <input id="filter-input_outcomes" class="form-control w-50" type="text"
                        placeholder="Введите название выборки">
                    <div class="d-flex gap-2">
                        <button id="filter-btn_outcomes" class="st_calc-btn st_calc_primary"
                            style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;">
                            Применить фильтр
                        </button>
                        <button id="reset-filter-btn_outcomes" class="st_calc-btn"
                            style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px; background: #ffffff; color: #0F141E; border: 2px solid #0F141E;">
                            Сбросить фильтр
                        </button>
                        <button id="add-card-btn_outcomes" class="st_calc-btn st_calc_primary"
                            style="width: auto; border-radius: 34px; font-size: 15px; padding: 8px 20px;
                                   opacity: 1; cursor: pointer;"
                            >
                            + Добавить выборку
                        </button>
                    </div>
                </div>
                <div id="cards-container_outcomes" class="st_calc-cards-grid"></div>
            </div>
        `}clickCard(e){let t=e.target.dataset.id;new c(this.parent,t,this.data,this.onGoBack).render()}render(){this.parent.innerHTML=``,new t(this.parent).render(()=>window.location.reload());let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),document.getElementById(`add-card-btn_outcomes`).addEventListener(`click`,this.onAdd),this.getData(),document.getElementById(`filter-btn_outcomes`).addEventListener(`click`,async()=>{let e=document.getElementById(`filter-input_outcomes`).value.trim();if(e===``)return;let t=await r.get(i.getStocks()+`?title=`+encodeURIComponent(e));this.renderData(t)}),document.getElementById(`reset-filter-btn_outcomes`).addEventListener(`click`,()=>{document.getElementById(`filter-input_outcomes`).value=``,this.getData()})}},u=document.getElementById(`root`);function d(e){new l(u,e,p,m,d).render()}async function f(){d(await r.get(i.getStocks()))}async function p(){let e={title:`Выборка №${Date.now()}`,description:`Новая статистическая выборка`,values:[]};await r.post(i.createStock(),e),f()}async function m(e){await r.delete(i.removeStockById(e)),f()}f();