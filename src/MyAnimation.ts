import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

/**
 * This class encapsulates the core animation code in this project.
 */
export class MyAnimation {

    private readonly scene: Scene;
    private renderer: WebGLRenderer;
    private readonly camera: PerspectiveCamera;

    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({color: 0x00ff00});
        const cube = new Mesh(geometry, material);
        this.scene.add(cube);
    }

    /**
     * Attach the animation to the DOM and activate the animation.
     */
    activate(): void {
        document.body.appendChild(this.renderer.domElement);
        requestAnimationFrame(this.activate);
        this.renderer.render(this.scene, this.camera);
    }
}
