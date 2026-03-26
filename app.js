import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MAX_USER_MODELS = 7;
let nextUserNum = 1; // счётчик автонумерации

const PRESETS = [
    { id: 1, title: "Математическое ожидание", model: "models/mat_exp.glb" },
    { id: 2, title: "Дисперсия", model: "models/disp.glb" },
    { id: 3, title: "Медиана", model: "models/median.glb" },
    { id: 4, title: "Ковариация", model: "models/cov.glb" },
];

let userModels = [];
const cardList = document.getElementById('card-list');

// Загружаем пользовательские модели из IndexedDB при загрузке страницы
getAllModelsFromDB().then(models => {
    userModels = models;
    // Восстанавливаем счётчик на основе уже сохранённых моделей
    nextUserNum = userModels.length + 1;
    renderCards();
    initUploadModal();
});

function renderCards() {
    cardList.innerHTML = '';
    PRESETS.forEach(model => addCard(model, false, model.id));
    userModels.forEach(model => addCard(model, true, model.id));
    updateUploadButtonState();
}

// Обновляем состояние кнопки загрузки (блокируем при лимите)
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

// Инициализация модального окна
function initUploadModal() {
    const modal = document.getElementById('upload-modal');
    const openBtn = document.getElementById('open-upload-modal');
    const cancelBtn = document.getElementById('cancel-upload-btn');
    const confirmBtn = document.getElementById('confirm-upload-btn');
    const nameInput = document.getElementById('model-name-input');
    const fileInput = document.getElementById('model-file-input');
    const errorDiv = document.getElementById('upload-error');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', () => {
        if (userModels.length >= MAX_USER_MODELS) return;
        // Сбрасываем форму
        nameInput.value = '';
        fileInput.value = '';
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
        modal.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие по клику вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    confirmBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        const rawName = nameInput.value.trim();

        // Валидация
        if (!file) {
            errorDiv.textContent = 'Выберите .glb файл';
            errorDiv.style.display = 'block';
            return;
        }

        // Автонумерация если название не введено
        const title = rawName || `Загруженная модель №${nextUserNum}`;
        nextUserNum++;

        const reader = new FileReader();
        reader.onload = function(e) {
            const modelObj = {
                title: title,
                buffer: e.target.result,
                filename: file.name
            };
            addModelToDB(modelObj).then(id => {
                modelObj.id = id;
                userModels.push(modelObj);
                modal.style.display = 'none';
                renderCards();
            });
        };
        reader.readAsArrayBuffer(file);
    });
}

// --- ГЛАВНАЯ ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ С ПРЕВЬЮ ---
function addCard(model, isUser, userId) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.position = 'relative';
    card.tabIndex = 0;

    // Canvas-превью
    const previewCanvas = document.createElement('canvas');
    previewCanvas.className = 'preview-canvas';
    previewCanvas.width = 140;
    previewCanvas.height = 140;
    card.appendChild(previewCanvas);

    renderPreviewModelToCanvas(model, isUser, previewCanvas);

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = model.title || 'Загруженная модель';
    card.appendChild(title);

    // Кнопка удаления — только для пользовательских моделей
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
            e.stopPropagation(); // не открываем detail при удалении
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

// Удаление пользовательской модели
function deleteUserModel(id) {
    deleteModelFromDB(id).then(() => {
        userModels = userModels.filter(m => m.id !== id);
        renderCards();
    }).catch(() => {
        // Если функции удаления нет в idb.js — удаляем только из памяти
        userModels = userModels.filter(m => m.id !== id);
        renderCards();
    });
}

// --- РЕНДЕР ПРЕВЬЮ-МОДЕЛИ В CANVAS ---
function renderPreviewModelToCanvas(model, isUser, canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0xe6ebf5, 1);
    renderer.setSize(canvas.width, canvas.height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(0, 0.7, 2);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(2, 6, 4);
    scene.add(light);

    const loader = new GLTFLoader();

    function normalizeModelToFloor(obj) {
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        obj.position.x -= center.x;
        obj.position.z -= center.z;
        obj.position.y -= box.min.y;
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) obj.scale.multiplyScalar(1.1 / maxDim);
    }

    if (isUser && model.buffer) {
        loader.parse(model.buffer, '', gltf => {
            const obj = gltf.scene;
            normalizeModelToFloor(obj);
            scene.add(obj);
            renderer.render(scene, camera);
        }, () => drawFallback(canvas));
    } else if (model.model) {
        loader.load(model.model, gltf => {
            const obj = gltf.scene;
            normalizeModelToFloor(obj);
            scene.add(obj);
            renderer.render(scene, camera);
        }, undefined, () => drawFallback(canvas));
    } else if (model.models && Array.isArray(model.models)) {
        const gap = 0.6;
        let loaded = 0;
        model.models.forEach((m, idx) => {
            loader.load(m.model, gltf => {
                const obj = gltf.scene;
                normalizeModelToFloor(obj);
                obj.position.x = idx === 0 ? -gap : gap;
                scene.add(obj);
                loaded++;
                if (loaded === 2) renderer.render(scene, camera);
            }, undefined, () => {
                loaded++;
                if (loaded === 2) renderer.render(scene, camera);
            });
        });
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