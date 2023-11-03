// window.onload = function init() {
//     const canvas = document.getElementById("gl-canvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const renderer = new THREE.WebGLRenderer({ canvas });
//     renderer.setSize(canvas.width, canvas.height);

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000000);

//     const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
//     camera.position.set(150, 150, 150);

//     const controls = new THREE.OrbitControls(camera, renderer.domElement);

//     const loader = new THREE.GLTFLoader();
//     let skull;

//     loader.load('./model/scene.gltf', function (gltf) {
//         skull = gltf.scene.children[0];
//         skull.scale.set(1.0, 1.0, 1.0);
//         skull.position.set(0, 0, 0); // Place at origin
//         scene.add(gltf.scene);
//         animate();
//     }, undefined, function (error) {
//         console.error(error);
//     });

//     // light 3
//     const light1 = new THREE.PointLight(0xffffff, 1);
//     light1.position.set(0, 200, 0);
//     scene.add(light1);

//     // light 3
//     const light2 = new THREE.PointLight(0xffffff, 1);
//     light2.position.set(200, 0, 0);
//     scene.add(light2);

//     // light 3
//     const light3 = new THREE.PointLight(0xffffff, 1);
//     light3.position.set(0, 0, 200);
//     scene.add(light3);

//     function animate() {
//         // if (skull) {
//         //     // rotate
//         //     skull.rotation.x += 0.005;
//         // }
//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     }
// }

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
    let skull;

    loader.load('./model/moohan_fisrt.glb', function (gltf) {
        skull = gltf.scene.children[0];
        skull.scale.set(1000.0, 1000.0, 1000.0);
        skull.position.set(0, 0, 0);
        scene.add(gltf.scene);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    const textureLoader = new THREE.TextureLoader();
    let userImageTexture;

    // 이미지 업로드 이벤트 핸들러
    const fileInput = document.getElementById('image-upload-input');
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        userImageTexture = textureLoader.load(imageUrl);

        if (skull) {
            skull.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = userImageTexture;
                    child.material.needsUpdate = true;
                }
            });
        }
    });

    const light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.set(0, 200, 0);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1);
    light2.position.set(200, 0, 0);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xffffff, 1);
    light3.position.set(0, 0, 200);
    scene.add(light3);

    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}

