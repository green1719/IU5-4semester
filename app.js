import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { sumOfSquares, getSumAndMult, diff, isPalindrome } from './tasks.js';

const MAX_USER_MODELS = 7;
let nextUserNum = 1;

const PRESETS = [
    { id: 1, title: "Математическое ожидание", model: "models/mat_exp.glb", taskId: "1.3" },
    { id: 2, title: "Дисперсия",               model: "models/disp.glb",    taskId: "1.4" },
    { id: 3, title: "Медиана",                 model: "models/median.glb",  taskId: "2.4" },
    { id: 4, title: "Ковариация",              model: "models/cov.glb",     taskId: "3.8" },
];

let userModels = [];
const cardList = document.getElementById('card-list');

// Позиция буквы в русском алфавите (А=1 … Я=33)
const RUS_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

function titleToLetterPairs(title) {
    const chars = [...title.toLowerCase()]; // очередь символов заголовка
    const pairs = [];

    do {
        const ch = chars.shift();                    // берём следующий символ
        const pos = RUS_ALPHABET.indexOf(ch);
        if (pos !== -1) {
            pairs.push({ letter: ch.toUpperCase(), code: pos + 1 });
        }
    } while (chars.length > 0);                     // пока в очереди есть символы

    return pairs;
}

// ---- Бейдж задачи на карточке ----
function computeTaskBadge(model) {
    try {
        const pairs = titleToLetterPairs(model.title);
        const codesStr = pairs.map(p => p.code).join(',');

        switch (model.taskId) {
            case '1.3': {
                const result = sumOfSquares(codesStr);
                const preview = pairs.slice(0, 5)
                    .map(p => `${p.letter}(${p.code})`).join(' ');
                const more = pairs.length > 5 ? '…' : '';
                return `Задача 1.3 — ${preview}${more}\nСумма квадратов кодов = ${result}`;
            }
            case '1.4': {
                const { sum, mult } = getSumAndMult(codesStr);
                const codesDisplay = pairs.map(p => `${p.letter}(${p.code})`).join(' ');
                const multFmt = mult > 1e9 ? mult.toExponential(2) : mult;
                return `Задача 1.4 — ${codesDisplay}\nСумма = ${sum}, Произв. = ${multFmt}`;
            }
            case '2.4': {
                const half = Math.ceil(pairs.length / 2);
                const s1 = pairs.slice(0, half).map(p => p.code).join(',');
                const s2 = pairs.slice(half).map(p => p.code).join(',');
                const result = diff(s1, s2);
                const p1label = pairs.slice(0, half).map(p => `${p.letter}(${p.code})`).join(' ');
                const p2label = pairs.slice(half).map(p => `${p.letter}(${p.code})`).join(' ');
                const resLabel = result.length
                    ? result.map(n => {
                        const found = pairs.find(p => p.code === n);
                        return found ? `${found.letter}(${n})` : n;
                    }).join(' ')
                    : '∅';
                return `Задача 2.4 — [${p1label}] \\ [${p2label}] = [${resLabel}]`;
            }
            case '3.8': {
                const palindrome = isPalindrome(model.title);
                return `Задача 3.8 — «${model.title}»: ${palindrome ? '✓ палиндром' : '✗ не палиндром'}`;
            }
            default:
                return null;
        }
    } catch (e) {
        return null;
    }
}

// ---- Рендер карточек ----
function renderCards(filteredPresets, filteredUsers) {
    cardList.innerHTML = '';
    filteredPresets.forEach(m => addCard(m, false, m.id));
    filteredUsers.forEach(m => addCard(m, true, m.id));
    updateUploadButtonState();
}

function filterCards(query) {
    const q = query.toLowerCase();
    return {
        presets: PRESETS.filter(m => m.title.toLowerCase().includes(q)),
        users:   userModels.filter(m => (m.title || '').toLowerCase().includes(q))
    };
}

function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', (e) => {
        const r = filterCards(e.target.value);
        renderCards(r.presets, r.users);
    });
}

// ---- Загрузка из IndexedDB ----
getAllModelsFromDB().then(models => {
    userModels = models;
    nextUserNum = userModels.length + 1;
    renderCards(PRESETS, userModels);
    initUploadModal();
    initSearch();
}).catch(() => {
    // DB недоступна — показываем хотя бы пресеты
    renderCards(PRESETS, []);
    initUploadModal();
    initSearch();
});

// ---- Кнопка загрузки ----
function updateUploadButtonState() {
    const btn = document.getElementById('open-upload-modal');
    if (!btn) return;
    if (userModels.length >= MAX_USER_MODELS) {
        btn.textContent = `Лимит достигнут (${MAX_USER_MODELS})`;
        btn.disabled = true;
        btn.style.opacity = '0.4';
        btn.style.cursor = 'not-allowed';
    } else {
        btn.textContent = '+ Загрузить модель';
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    }
}

function initUploadModal() {
    const modal     = document.getElementById('upload-modal');
    const openBtn   = document.getElementById('open-upload-modal');
    const cancelBtn = document.getElementById('cancel-upload-btn');
    const confirmBtn = document.getElementById('confirm-upload-btn');
    const nameInput  = document.getElementById('model-name-input');
    const fileInput  = document.getElementById('model-file-input');
    const errorDiv   = document.getElementById('upload-error');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', () => {
        if (userModels.length >= MAX_USER_MODELS) return;
        nameInput.value = '';
        fileInput.value = '';
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
        modal.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => { modal.style.display = 'none'; });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    confirmBtn.addEventListener('click', () => {
        const file    = fileInput.files[0];
        const rawName = nameInput.value.trim();

        if (!file) {
            errorDiv.textContent = 'Выберите .glb файл';
            errorDiv.style.display = 'block';
            return;
        }

        const title = rawName || `Загруженная модель №${nextUserNum}`;
        nextUserNum++;

        const reader = new FileReader();
        reader.onload = function(e) {
            const modelObj = { title, buffer: e.target.result, filename: file.name };
            addModelToDB(modelObj).then(id => {
                modelObj.id = id;
                userModels.push(modelObj);
                modal.style.display = 'none';
                renderCards(PRESETS, userModels);
            });
        };
        reader.readAsArrayBuffer(file);
    });
}

// ---- Создание карточки ----
function addCard(model, isUser, userId) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.position = 'relative';
    card.tabIndex = 0;

    const previewCanvas = document.createElement('canvas');
    previewCanvas.className = 'preview-canvas';
    previewCanvas.width = 140;
    previewCanvas.height = 140;
    card.appendChild(previewCanvas);

    renderPreviewModelToCanvas(model, isUser, previewCanvas);

    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = model.title || 'Загруженная модель';
    card.appendChild(titleEl);

    if (!isUser) {
        const badge = computeTaskBadge(model);
        if (badge) {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'card-task-badge';
            badgeEl.textContent = badge;
            badgeEl.style.display = 'none';

            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'card-task-toggle';
            toggleBtn.textContent = `Задача ${model.taskId}`;
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const visible = badgeEl.style.display !== 'none';
                badgeEl.style.display = visible ? 'none' : 'block';
                toggleBtn.textContent = visible ? `Задача ${model.taskId}` : `Скрыть`;
            });

            card.appendChild(toggleBtn);
            card.appendChild(badgeEl);
        }
    }

    if (isUser) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Удалить';
        deleteBtn.style.cssText = `
            position: absolute; top: 6px; right: 6px;
            background: #ff4d4d; color: white; border: none;
            border-radius: 50%; width: 24px; height: 24px;
            font-size: 12px; cursor: pointer; z-index: 10;
            display: flex; align-items: center; justify-content: center;
        `;
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteUserModel(userId);
        });
        card.appendChild(deleteBtn);
    }

    card.onclick = () => {
        if (isUser) {
            window.location.href = `detail.html?user=${userId}`;
        } else {
            window.location.href = `detail.html?id=${model.id}`;
        }
    };

    cardList.appendChild(card);
}

function deleteUserModel(id) {
    deleteModelFromDB(id).then(() => {
        userModels = userModels.filter(m => m.id !== id);
        renderCards(PRESETS, userModels);
    }).catch(() => {
        userModels = userModels.filter(m => m.id !== id);
        renderCards(PRESETS, userModels);
    });
}

// ---- 3D превью ----
function renderPreviewModelToCanvas(model, isUser, canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0xe6ebf5, 1);
    renderer.setSize(canvas.width, canvas.height, false);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(0, 0.7, 2);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(2, 6, 4);
    scene.add(light);

    const loader = new GLTFLoader();

    function normalizeModelToFloor(obj) {
        const box    = new THREE.Box3().setFromObject(obj);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        obj.position.x -= center.x;
        obj.position.z -= center.z;
        obj.position.y -= box.min.y;
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) obj.scale.multiplyScalar(1.1 / maxDim);
    }

    if (isUser && model.buffer) {
        loader.parse(model.buffer, '', gltf => {
            normalizeModelToFloor(gltf.scene);
            scene.add(gltf.scene);
            renderer.render(scene, camera);
        }, () => drawFallback(canvas));
    } else if (model.model) {
        loader.load(model.model, gltf => {
            normalizeModelToFloor(gltf.scene);
            scene.add(gltf.scene);
            renderer.render(scene, camera);
        }, undefined, () => drawFallback(canvas));
    } else {
        drawFallback(canvas);
    }
}

function drawFallback(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = "#dde6f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "56px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#666";
    ctx.fillText("🧩", canvas.width / 2, canvas.height / 2);
}
