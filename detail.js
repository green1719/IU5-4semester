import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ---- ПРЕСЕТЫ ----
const PRESETS = [
  { id: 1, title: "Математическое ожидание", model: "models/mat_exp.glb" },
  { id: 2, title: "Дисперсия",               model: "models/disp.glb" },
  { id: 3, title: "Медиана",                 model: "models/median.glb" },
  { id: 4, title: "Ковариация",              model: "models/cov.glb" },
];
// ---- ГЛОБАЛЬНЫЕ camera и controls ----
let camera, controls;

// ---- ВЫБОР МОДЕЛИ ----
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const userId = params.get('user');

let modelData = null;
let title = '';
let toRender = [];

if (id) {
  modelData = PRESETS.find(m => m.id === Number(id));
  title = modelData?.title || '';
  if (modelData?.models) {
    toRender = modelData.models.map(x => ({ model: x.model }));
  } else if (modelData?.model) {
    toRender = [{ model: modelData.model }];
  }
  renderModel();
} else if (userId) {
  getModelByIdFromDB(userId).then(userModel => {
    if (!userModel) {
      document.getElementById('model-title').textContent = "Модель не найдена";
      return;
    }
    title = userModel.title;
    toRender = [{ buffer: userModel.buffer, filename: userModel.filename }];
    renderModel();
  });
} else {
  document.getElementById('model-title').textContent = 'Нет данных';
}

// ---- Рендер превью в offscreen canvas → img ----
function renderPreviewImage(item, imgEl, titleText) {
  const offscreen = document.createElement('canvas');
  offscreen.width  = 320;
  offscreen.height = 320;

  const renderer = new THREE.WebGLRenderer({ canvas: offscreen, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setClearColor(0xe6ebf5, 1);
  renderer.setSize(320, 320, false);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(0, 0.7, 2);
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(2, 6, 4);
  scene.add(light);

  const loader = new GLTFLoader();

  function normalize(obj) {
    const box    = new THREE.Box3().setFromObject(obj);
    const size   = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    obj.position.x -= center.x;
    obj.position.z -= center.z;
    obj.position.y -= box.min.y;
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) obj.scale.multiplyScalar(1.1 / maxDim);
  }

  function finish(gltf) {
    normalize(gltf.scene);
    scene.add(gltf.scene);
    renderer.render(scene, camera);
    imgEl.src   = offscreen.toDataURL();
    imgEl.alt   = titleText;
    imgEl.style.display = 'block';
    renderer.dispose();
  }

  if (item.model) {
    loader.load(item.model, finish, undefined, () => { imgEl.style.display = 'none'; });
  } else if (item.buffer) {
    loader.parse(item.buffer, '', finish, () => { imgEl.style.display = 'none'; });
  }
}

// ---- ФУНКЦИЯ ОТРИСОВКИ ----
function renderModel() {
  document.getElementById('model-title').textContent = title || "3D модель";

  // ---- Картинка рядом с 3D ----
  const imgEl = document.getElementById('model-image');
  if (imgEl && toRender.length > 0) {
    renderPreviewImage(toRender[0], imgEl, title);
  } else if (imgEl) {
    imgEl.style.display = 'none';
  }

  const canvas = document.getElementById('viewer-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe6ebf5);

  // camera и controls — глобальные!
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 2 , 3);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.target.set(0, 0 , 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(4, 10, 8);
  scene.add(dirLight);

  const loader = new GLTFLoader();
  let loaded = [];
  const gap = 1.8;

  if (toRender.length === 2) {
    toRender.forEach((item, i) => {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        model.position.x = i === 0 ? -gap : gap;
        scene.add(model);
        loaded.push(model);
      });
    });
  } else if (toRender.length === 1) {
    const item = toRender[0];
    if (item.model) {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        scene.add(model);
        loaded.push(model);
      });
    } else if (item.buffer) {
      loader.parse(item.buffer, '', gltf => {
        const model = gltf.scene;
        scene.add(model);
        loaded.push(model);
      }, error => {
        alert('Не удалось загрузить модель');
        console.error(error);
      });
    }
  }

  // --- КНОПКИ УПРАВЛЕНИЯ ---
  document.getElementById('zoom-in').onclick = () => {
    const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.addScaledVector(vec, -0.5);
    controls.update();
  };
  document.getElementById('zoom-out').onclick = () => {
    const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.addScaledVector(vec, 0.5);
    controls.update();
  };

  const distance = () => camera.position.distanceTo(controls.target);

  function setCameraDirection(dir) {
    const d = distance();
    if (dir === "front")  { camera.position.set(0, 2, d); }
    if (dir === "back")   { camera.position.set(0, 2, -d); }
    if (dir === "left")   { camera.position.set(-d, 2, 0); }
    if (dir === "right")  { camera.position.set(d, 2, 0); }
    controls.target.set(0, 0, 0);
    controls.update();
}

  document.getElementById('view-front').onclick = () => setCameraDirection('front');
  document.getElementById('view-back').onclick = () => setCameraDirection('back');
  document.getElementById('view-left').onclick = () => setCameraDirection('left');
  document.getElementById('view-right').onclick = () => setCameraDirection('right');

  // --- Resize и animate ---
  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', resizeRendererToDisplaySize);
}
