import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls, model;
let modalElement, canvasContainer;

function setup3DViewer() {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'viewer-modal';
    modal.className = 'viewer-modal';
    modal.innerHTML = `
        <div class="viewer-modal-overlay"></div>
        <div class="viewer-modal-content">
            <button class="viewer-modal-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <h2 class="viewer-modal-title"></h2>
            <div class="viewer-canvas-container"></div>
            <div class="viewer-controls-hint">
                <span>🖱️ Drag to rotate • Scroll to zoom</span>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modalElement = modal;
    canvasContainer = modal.querySelector('.viewer-canvas-container');

    // Add event listeners to all 3D view buttons (both card and inline)
    document.querySelectorAll('.view-3d-btn, .view-3d-btn-inline').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modelPath = btn.dataset.model;
            const title = btn.dataset.title;
            open3DViewer(modelPath, title);
        });
    });

    // Close modal handlers
    modal.querySelector('.viewer-modal-close').addEventListener('click', close3DViewer);
    modal.querySelector('.viewer-modal-overlay').addEventListener('click', close3DViewer);
}

function open3DViewer(modelPath, title) {
    modalElement.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalElement.querySelector('.viewer-modal-title').textContent = title;

    // Wait for modal to be fully visible before initializing
    setTimeout(() => {
        initScene();
        loadModel(modelPath);
    }, 50);
}

function close3DViewer() {
    modalElement.classList.remove('active');
    document.body.style.overflow = '';

    // Clean up Three.js resources
    if (renderer) {
        renderer.dispose();
        if (controls) controls.dispose();
        canvasContainer.innerHTML = '';
        scene = null;
        camera = null;
        renderer = null;
        controls = null;
        model = null;
    }
}

function initScene() {
    console.log('Initializing 3D scene...');
    console.log('Canvas container dimensions:', canvasContainer.clientWidth, 'x', canvasContainer.clientHeight);

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f7);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        45,
        canvasContainer.clientWidth / canvasContainer.clientHeight,
        1,
        10000
    );
    camera.position.set(0, 50, 100);

    // Create renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        depth: true,
        stencil: false
    });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = true;
    canvasContainer.appendChild(renderer.domElement);

    console.log('Renderer initialized:', renderer.domElement.width, 'x', renderer.domElement.height);

    // Add lights for better PCB visualization
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Key light from top-front-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    // Fill light from bottom-left
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-10, -5, -10);
    scene.add(fillLight);

    // Rim light from behind
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 5, -15);
    scene.add(rimLight);

    // Additional soft light from the side
    const sideLight = new THREE.DirectionalLight(0xffffff, 0.4);
    sideLight.position.set(-15, 10, 0);
    scene.add(sideLight);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 2000;
    controls.maxPolarAngle = Math.PI;

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
}

function loadModel(modelPath) {
    console.log('Loading model from:', modelPath);
    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            console.log('Model loaded successfully:', gltf);
            model = gltf.scene;

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            console.log('Model size:', size);
            console.log('Model center:', center);

            // Center the model at origin
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;

            scene.add(model);

            // Calculate optimal camera distance based on model size
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraDistance = maxDim * 1.5;

            console.log('Max dimension:', maxDim);
            console.log('Calculated camera distance:', cameraDistance);

            // Update camera clipping planes based on model size
            camera.near = maxDim * 0.01;
            camera.far = maxDim * 1000;
            camera.updateProjectionMatrix();

            // Position camera at an angle to see the PCB nicely
            camera.position.set(
                cameraDistance,
                cameraDistance * 0.7,
                cameraDistance
            );

            // Update controls distance limits based on model size
            controls.minDistance = maxDim * 0.5;
            controls.maxDistance = maxDim * 5;

            // Set controls to orbit around the model center (origin)
            controls.target.set(0, 0, 0);
            controls.update();

            console.log('Camera position:', camera.position);
            console.log('Controls target:', controls.target);
            console.log('Distance limits:', controls.minDistance, '-', controls.maxDistance);
        },
        (progress) => {
            console.log('Loading progress:', Math.round(progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('Error loading model:', error);
        }
    );
}

function animate() {
    if (!renderer) return;
    requestAnimationFrame(animate);
    if (controls) controls.update();
    if (scene && camera) {
        renderer.render(scene, camera);
    }
}

function onWindowResize() {
    if (!camera || !renderer || !canvasContainer) return;
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

// Export for use in main script
window.setup3DViewer = setup3DViewer;
