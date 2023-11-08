
window.onload = function init() {
    const canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(500, 500, 500);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    const loader = new THREE.GLTFLoader();

    const colorButton = document.createElement('button');
    colorButton.textContent = 'Select Color';
    document.body.appendChild(colorButton);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.display = 'none';
    document.body.appendChild(colorPicker);

    let shirtMesh; // Shirt mesh

    loader.load('./model/moohan_T_shirt.glb', function (gltf) {
        const shirtMeshName = 'customize';

        gltf.scene.traverse(function (child) {
            if (child.isMesh && child.name === shirtMeshName) {
                shirtMesh = child;

                // 이미지를 X 축 미러링 방지
                shirtMesh.material.map.wrapS = THREE.RepeatWrapping;
                shirtMesh.material.map.repeat.x = 1;

                const ambientLight = new THREE.AmbientLight(0xffffff, 1);
                scene.add(ambientLight);

                scene.add(gltf.scene);
                animate();
            }
        });
    });

    const textureLoader = new THREE.TextureLoader();
    let userImageTexture;

    // Add color selection button event
    colorButton.addEventListener('click', function () {
        colorPicker.click();
    });

    // Apply selected color to the T-shirt material
    colorPicker.addEventListener('input', function (event) {
        const selectedColor = event.target.value;

        if (shirtMesh) {
        // Create a new material with the specified color
        const newMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(selectedColor) });
        
        // Replace the current material on the shirt mesh
        shirtMesh.material = newMaterial;
        }
    });

    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}