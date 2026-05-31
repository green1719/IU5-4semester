(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="st_calc-card" id="card-${e.id}">
                ${e.image?`<img src="${e.image}" alt="${e.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">`:``}
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
                        Рассчитать
                    </button>
                    <button class="st_calc-btn"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px; background: #ffffff; color: #0F141E;"
                        id="edit-card-${e.id}" data-id="${e.id}">
                        Изменить
                    </button>
                </div>
                <div class="d-flex gap-2 mt-2">
                    <button class="st_calc-btn"
                        style="width: auto; border-radius: 34px; font-size: 14px; padding: 6px 18px; background: #ff4d4d; color: white;"
                        id="delete-card-${e.id}" data-id="${e.id}">
                        Удалить
                    </button>
                </div>
            </div>
        `}render(e,t,n,r){let i=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,i),document.getElementById(`click-card-${e.id}`).addEventListener(`click`,t),document.getElementById(`edit-card-${e.id}`).addEventListener(`click`,()=>n(e)),document.getElementById(`delete-card-${e.id}`).addEventListener(`click`,()=>r(e.id))}},t=class{constructor(e){this.parent=e}getHTML(){return`
            <header class="st_calc_site-header">
                <div class="st_calc_header-row">
                    <span class="st_calc-label">СТАТКАЛЬКУЛЯТОР</span>
                    <button id="home-btn_outcomes" class="st_calc_header-control-btn">Домой</button>
                </div>
                <h1 class="st_calc-module-title">Калькулятор статистического анализа</h1>
                <h4 class="st_calc-module-description">Арифметика, дисперсия и другие операции над выборкой</h4>
            </header>
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),e&&document.getElementById(`home-btn_outcomes`).addEventListener(`click`,e)}},n=new class{async get(e){return(await fetch(e)).json()}async post(e,t){return(await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}async patch(e,t){return(await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}async delete(e){let t=await(await fetch(e,{method:`DELETE`})).text();return t?JSON.parse(t):null}},r=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/outcomes`}getStockById(e){return`${this.baseUrl}/outcomes/${e}`}createStock(){return`${this.baseUrl}/outcomes`}removeStockById(e){return`${this.baseUrl}/outcomes/${e}`}updateStockById(e){return`${this.baseUrl}/outcomes/${e}`}};function i(e,t){if(!Array.isArray(e))return``;let n=e.find(e=>e.name===t);return n?n.result:``}function a(e){let t=(e??``).toLowerCase();return t.includes(`фибоначч`)?`/images_outcomes/fibonacci_spiral.svg`:t.includes(`прост`)?`/images_outcomes/primes.gif`:t.includes(`квадрат`)?`/images_outcomes/parabola.svg`:t.includes(`степен`)?`/images_outcomes/exponential.svg`:`/images_outcomes/fibonacci_spiral.svg`}function o(e){return!e||typeof e!=`object`?e:{id:e.id,title:e.title??``,text:e.description??e.text??``,values:e.values??[],mean:i(e.methods,`Математическое ожидание`),variance:i(e.methods,`Дисперсия`),median:i(e.methods,`Медиана`),std:i(e.methods,`Стандартное отклонение`),image:e.image??a(e.title)}}function s(e){return Array.isArray(e)?e.map(o):[]}var c=class{constructor(e,t,n,r){this.parent=e,this.id=t,this.data=n,this.onGoBack=r}async getData(){let e=await n.get(r.getStockById(this.id));this.renderData(e)}renderData(e){let t=this.getHTML(o(e));this.pageRoot.insertAdjacentHTML(`afterbegin`,t)}get pageRoot(){return document.getElementById(`product-page_outcomes`)}getHTML(e){let t=Array.isArray(e.values)?`<p class="st_calc-module-description mb-3" style="font-style: italic;">[${e.values.join(`, `)}]</p>`:``;return`
            ${e.image?`<img src="${e.image}" alt="${e.title??``}"
                   style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 14px; margin-bottom: 14px;">`:``}
            <h2 class="st_calc-module-title mb-1">${e.title??``}</h2>
            <p class="st_calc-module-description mb-2">${e.text??``}</p>
            ${t}
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p><span class="st_calc-label">Среднее арифметическое:</span> <strong style="color: #fff;">${e.mean??``}</strong></p>
            <p><span class="st_calc-label">Дисперсия:</span> <strong style="color: #fff;">${e.variance??``}</strong></p>
            <p><span class="st_calc-label">Медиана:</span> <strong style="color: #fff;">${e.median??``}</strong></p>
            <p><span class="st_calc-label">Стандартное отклонение:</span> <strong style="color: #fff;">${e.std??``}</strong></p>
        `}clickBack(){this.onGoBack()}render(){this.parent.innerHTML=``,new t(this.parent).render(this.clickBack.bind(this)),this.parent.insertAdjacentHTML(`beforeend`,`<div id="product-page_outcomes" class="st_calc-calculator-wrapper"></div>`),this.getData()}},l=class{constructor(e,t,n,r){this.parent=e,this.data=t,this.onGoBack=n,this.onEdit=r}get pageRoot(){return document.getElementById(`edit-page_outcomes`)}getHTML(){return`
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
        `}render(){this.parent.innerHTML=``,new t(this.parent).render(this.onGoBack),this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),document.getElementById(`edit-save_outcomes`).addEventListener(`click`,async()=>{let e=document.getElementById(`edit-title_outcomes`).value.trim(),t=document.getElementById(`edit-desc_outcomes`).value.trim();await this.onEdit(this.data.id,{title:e,description:t}),this.onGoBack()}),document.getElementById(`edit-cancel_outcomes`).addEventListener(`click`,this.onGoBack)}},u=class{constructor(e,t,n,r,i,a){this.parent=e,this.data=t,this.onAdd=n,this.onDelete=r,this.onEdit=i,this.onGoBack=a}async getData(){let e=await n.get(r.getStocks());this.renderData(e)}renderData(t){this.cardsGrid.innerHTML=``,s(t).forEach(t=>{new e(this.cardsGrid).render(t,this.clickCard.bind(this),this.clickEdit.bind(this),this.onDelete)})}get pageRoot(){return document.getElementById(`main-page_outcomes`)}get cardsGrid(){return document.getElementById(`cards-container_outcomes`)}clickCard(e){let t=e.target.dataset.id;new c(this.parent,t,this.data,this.onGoBack).render()}clickEdit(e){new l(this.parent,e,this.onGoBack,this.onEdit).render()}getHTML(){return`
            <div id="main-page_outcomes" class="st_calc-calculator-wrapper">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <input id="filter-input_outcomes" type="text"
                        placeholder="Поиск по выборке"
                        style="flex: 1; border: none; border-radius: 34px; font-size: 13px; padding: 6px 16px; outline: none; background: #ffffff; color: #0F141E; height: 34px;">
                    <button id="filter-btn_outcomes" class="st_calc-btn st_calc_primary"
                        style="white-space: nowrap; width: auto; border-radius: 34px; font-size: 13px; padding: 6px 14px; margin: 0; height: 34px;">
                        Найти
                    </button>
                    <button id="reset-filter-btn_outcomes" class="st_calc-btn"
                        style="white-space: nowrap; width: auto; border-radius: 34px; font-size: 13px; padding: 6px 14px; background: #ffffff; color: #0F141E; border: none; margin: 0; height: 34px;">
                        Сбросить
                    </button>
                    <button id="add-card-btn_outcomes" class="st_calc-btn st_calc_primary"
                        style="white-space: nowrap; width: auto; border-radius: 34px; font-size: 13px; padding: 6px 14px; margin: 0; height: 34px;">
                        + Добавить
                    </button>
                </div>
                <div id="cards-container_outcomes" class="st_calc-cards-grid"></div>
            </div>
        `}render(){this.parent.innerHTML=``,new t(this.parent).render(()=>window.location.reload());let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),document.getElementById(`add-card-btn_outcomes`).addEventListener(`click`,this.onAdd),this.getData(),document.getElementById(`filter-btn_outcomes`).addEventListener(`click`,async()=>{let e=document.getElementById(`filter-input_outcomes`).value.trim();if(e===``)return;let t=await n.get(r.getStocks()+`?title=`+encodeURIComponent(e));this.renderData(t)}),document.getElementById(`reset-filter-btn_outcomes`).addEventListener(`click`,()=>{document.getElementById(`filter-input_outcomes`).value=``,this.getData()})}},d=document.getElementById(`root`);function f(e){new u(d,e,h,g,_,f).render()}async function p(){f(await n.get(r.getStocks()))}var m=[{title:`Числа Фибоначчи`,description:`Первые 10 чисел последовательности Фибоначчи`,values:[1,1,2,3,5,8,13,21,34,55]},{title:`Простые числа`,description:`Первые 10 простых чисел`,values:[2,3,5,7,11,13,17,19,23,29]},{title:`Квадраты чисел`,description:`Квадраты натуральных чисел от 1 до 10`,values:[1,4,9,16,25,36,49,64,81,100]},{title:`Степени двойки`,description:`Степени числа 2 от 0 до 9`,values:[1,2,4,8,16,32,64,128,256,512]}];async function h(){let e=await n.get(r.getStocks()),t=m[((Array.isArray(e)&&e.length>0?Math.max(...e.map(e=>e.id))+1:1)-1)%m.length],i={title:`${t.title} (копия)`,description:t.description,values:t.values};await n.post(r.createStock(),i),p()}async function g(e){await n.delete(r.removeStockById(e)),p()}async function _(e,t){await n.patch(r.updateStockById(e),t),p()}p();