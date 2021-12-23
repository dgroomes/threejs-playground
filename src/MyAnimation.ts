import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

/**
 * This class encapsulates the core animation code in this project.
 */
export class MyAnimation {

    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly cube: Mesh<BoxGeometry, MeshBasicMaterial>;
    private animate: () => void;
    private renderer: WebGLRenderer;

    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({color: 0x00ff00});
        this.cube = new Mesh(geometry, material);
        this.scene.add(this.cube);

        // This code is written in a wacky way.
        // Rotate the cube continuously!
        const that = this;
        this.animate = function animate() {
            requestAnimationFrame(animate);

            that.cube.rotation.x += 0.01;
            that.cube.rotation.y += 0.01;
            that.renderer.render(that.scene, that.camera);
        }
    }

    /**
     * Attach the animation to the DOM and activate the animation.
     */
    activate(): void {
        document.body.appendChild(this.renderer.domElement);
        this.animate();
    }
}
