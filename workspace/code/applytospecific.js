
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


    const colorButton = document.createElement('button');
    colorButton.textContent = 'Select Color';
    document.body.appendChild(colorButton);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.display = 'none';
    document.body.appendChild(colorPicker);


    loader.load('./model/moohan_T_shirt.glb', function (gltf) {
        const shirtMeshName = 'body';

        const allMeshes = [];

        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                // If multiple meshes are present, store them all
                if(child.name === 'body') {
                    allMeshes.push(child);
                }

                if (child.name === shirtMeshName) {
                    shirtMesh = child;

                    // Configure the material for the shirt mesh
                    shirtMesh.material.map.wrapS = THREE.RepeatWrapping;
                    shirtMesh.material.map.repeat.x = 1;

                    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
                    scene.add(ambientLight);
    
                    scene.add(gltf.scene);
                    animate();
                }
            }
        });

        // Apply changes to all meshes found in the model
        const applyMaterialToAllMeshes = (material) => {
            allMeshes.forEach((mesh) => {
                mesh.material = material;
            });
        };

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

                applyMaterialToAllMeshes(newMaterial);
            }
        });

        // Apply selected image as texture to the T-shirt
        imageUpload.addEventListener('change', function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const texture = new THREE.TextureLoader().load(e.target.result, function (loadedTexture) {
                    if (shirtMesh) {
                        userImageTexture = loadedTexture;

                        // Create a new material with the uploaded image texture
                        const newMaterial = new THREE.MeshBasicMaterial({ map: userImageTexture });

                        applyMaterialToAllMeshes(newMaterial);
                    }
                });
            };

            reader.readAsDataURL(file);
        });




    });


    // Add the rest of your code for the rendering loop and functionality
    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    

}