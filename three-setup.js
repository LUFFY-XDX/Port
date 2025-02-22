// Three.js scene setup
let scene, camera, renderer;
let geometry, material, mesh;
let floatingElements = [];

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        antialias: true
    });

    // Configure renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2196f3, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create floating geometries
    createGeometries();

    // Add stars
    Array(200).fill().forEach(addStar);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('scroll', onScroll, false);
    window.addEventListener('mousemove', onMouseMove, false);
}

function createGeometries() {
    // Main torus
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2196f3,
        wireframe: true,
        metalness: 0.8,
        roughness: 0.2
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    floatingElements.push(torus);

    // Floating cubes
    for(let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xff4081,
            wireframe: true,
            metalness: 0.8,
            roughness: 0.2
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            Math.random() * 30 - 15,
            Math.random() * 30 - 15,
            Math.random() * 30 - 15
        );
        scene.add(cube);
        floatingElements.push(cube);
    }
}

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2
    });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Subtle camera movement based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
}

function onScroll() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01 + 30;
    camera.rotation.y = t * -0.0002;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Animate floating elements
    floatingElements.forEach((element, index) => {
        element.rotation.x += 0.01;
        element.rotation.y += 0.005;
        element.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
    });

    renderer.render(scene, camera);
}

init();
animate();
