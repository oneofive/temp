// 내가 원하는 부위만 색깔 변경되도록


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
    let shirtMesh; // Shirt mesh
    let faceMesh; // Face mesh
    let bodyMesh; // Body mesh

    // Button for selecting body part
    const bodyButton = document.createElement('button');
    bodyButton.textContent = 'Select Body';
    document.body.appendChild(bodyButton);

    // Button for selecting face part
    const faceButton = document.createElement('button');
    faceButton.textContent = 'Select Face';
    document.body.appendChild(faceButton);

    // Button for selecting color
    const colorButton = document.createElement('button');
    colorButton.textContent = 'Select Color';
    document.body.appendChild(colorButton);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.display = 'none';
    document.body.appendChild(colorPicker);

    loader.load('./model/moohan_T_shirt.glb', function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                if (child.name === 'face') {
                    faceMesh = child;
                } else if (child.name === 'body') {
                    bodyMesh = child;
                }
            }
        });

        const applyColorToMesh = (mesh, selectedColor) => {
            if (mesh) {
                const newMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(selectedColor) });
                mesh.material = newMaterial;
            }
        };

        bodyButton.addEventListener('click', function () {
            colorButton.addEventListener('click', function () {
                colorPicker.click();
                colorPicker.oninput = function (event) {
                    const selectedColor = event.target.value;
                    applyColorToMesh(bodyMesh, selectedColor);
                };
            });
        });

        faceButton.addEventListener('click', function () {
            colorButton.addEventListener('click', function () {
                colorPicker.click();
                colorPicker.oninput = function (event) {
                    const selectedColor = event.target.value;
                    applyColorToMesh(faceMesh, selectedColor);
                };
            });
        });

        function animate() {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate(); // Start the rendering loop
    });
};
