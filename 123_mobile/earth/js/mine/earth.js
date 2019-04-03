let THREE = require('../three/three.js')

var {
    Scene,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    SpotLight,
    Orbitcontrols,
    Group,
    AmbientLight,
    DirectionalLight,
    SphereGeometry,
    TextureLoader
} = THREE

export default class earth {

    constructor() {
        this.initThree();
    }

    initThree() {
        let camera, scene, renderer
        let group;
        var width = window.innerWidth, height = window.innerHeight
        init();
        render();

        function init() {
            scene = new Scene()//创建场景
            group = new Group()//创建组
            scene.add(group)

            camera = new PerspectiveCamera(80, width / height, 1, 2000)//创建相机
            camera.position.x = -10
            camera.position.y = 15
            camera.position.z = 500
            camera.lookAt(scene.position)


            //光源
            let ambi = new AmbientLight(0x686868);
            scene.add(ambi);

            let spotLight = new DirectionalLight(0xffffff);
            spotLight.position.set(550, 100, 550);
            spotLight.intensity = 0.6;
            scene.add(spotLight);


            let geometry = new SphereGeometry(200, 20, 20);
            var texture = new TextureLoader().load("images/land_ocean.jpg");
            var material = new MeshBasicMaterial({ map: texture });
            let mesh = new Mesh(geometry, material);
            group.add(mesh);

            renderer = new WebGLRenderer({
                canvas: canvas,
                antialias: true
            });
            renderer.setClearColor(0xffffff);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);

            document.body.appendChild(renderer.domElement); // 把画笔插入到dom中

        }
        function render() {
            requestAnimationFrame(render);
            group.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
    }
}