import {Fog, Group, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {addShape, newCamera, newLight, newRenderer, newSquircle, newScene} from "./animation-util";

const HEX_GRAY = 0x808080;
const HEX_GREEN_FOREST = 0x008000;
const HEX_GREEN = 0x6fd251;
const HEX_WHITE = 0xfcfcfc;

/**
 * This class encapsulates the core animation code in this project.
 */
export class MyAnimation {

    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private animate: () => void;
    private renderer: WebGLRenderer;
    private group: Group;

    constructor() {
        this.scene = newScene();
        // this.scene.fog = new Fog(HEX_GRAY)

        this.camera = newCamera();
        this.scene.add(this.camera);
        const light = newLight();
        this.camera.add(light);

        this.renderer = newRenderer();

        {
            this.group = new Group();
            this.group.position.y = 50;
            this.scene.add(this.group);
            const squircle = newSquircle();
            const extrudeSettings = {
                depth: 8,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 1,
                bevelThickness: 1
            };

            // 1 - first row  (top)
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -150, 200, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -100, 200, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -50, 200, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, 0, 200, 0, 0, 0, 0, 1);

            // 2 - second row (second from top)
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN_FOREST, -150, 150, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN_FOREST, -100, 150, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -50, 150, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, 0, 150, 0, 0, 0, 0, 1);

            // 3
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN_FOREST, -150, 100, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN_FOREST, -100, 100, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_WHITE, -50, 100, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_WHITE, 0, 100, 0, 0, 0, 0, 1);

            // 4
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -150, 50, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -100, 50, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, -50, 50, 0, 0, 0, 0, 1);
            addShape(this.group, squircle, extrudeSettings, HEX_GREEN, 0, 50, 0, 0, 0, 0, 1);
        }

        // This code is written in a wacky way.
        // Rotate the group continuously!
        const that = this;
        this.animate = function animate() {
            requestAnimationFrame(animate);
            that.group.rotation.y += 0.01;
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
