// window.onload = function init() {
//     const canvas = document.getElementById("gl-canvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const renderer = new THREE.WebGLRenderer({ canvas });
//     renderer.setSize(canvas.width, canvas.height);

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff);

//     const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
//     camera.position.set(500, 500, 500);

//     const controls = new THREE.OrbitControls(camera, renderer.domElement);

//     const loader = new THREE.GLTFLoader();
//     let skull;

//     loader.load('./model/moohan_T_shirt.glb', function (gltf) {
//         skull = gltf.scene.children[0];
//         skull.scale.set(1000.0, 1000.0, 1000.0);
//         skull.position.set(0, 0, 0);
//         scene.add(gltf.scene);

//         // 광원 추가
//         const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//         scene.add(ambientLight);

//         animate();
//     }, undefined, function (error) {
//         console.error(error);
//     });

//     const textureLoader = new THREE.TextureLoader();
//     let userImageTexture;

//     // 이미지 업로드 이벤트 핸들러
//     const fileInput = document.getElementById('image-upload-input');
//     fileInput.addEventListener('change', function (event) {
//         const file = event.target.files[0];
//         const imageUrl = URL.createObjectURL(file);
//         userImageTexture = textureLoader.load(imageUrl);

//         if (skull) {
//             skull.traverse(function (child) {
//                 if (child.isMesh) {
//                     child.material.map = userImageTexture;
//                     child.material.needsUpdate = true;
//                 }
//             });
//         }
//     });

//     function animate() {
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
    let shirtMesh; // 상의 메쉬

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

    // 이미지 업로드 이벤트 핸들러
    const fileInput = document.getElementById('image-upload-input');
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        userImageTexture = textureLoader.load(imageUrl);

        if (shirtMesh) {
            // 이미지를 X 축을 기준으로 미러링 방지
            userImageTexture.wrapS = THREE.RepeatWrapping;
            userImageTexture.repeat.x = 1;

            // 상의 메쉬에만 새로운 이미지 텍스처를 적용
            shirtMesh.material.map = userImageTexture;
            shirtMesh.material.needsUpdate = true;
        }
    });

    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}
