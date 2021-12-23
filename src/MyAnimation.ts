import {ColorRepresentation, Fog, Group, PerspectiveCamera, Scene, WebGLRenderer} from "three";
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

            // I don't have time to figure out what is idiomatic, but I'm creating a coordinate system defined as
            // 0-indexed where the origin is the top left of the viewport.
            let column = 0;

            // The amount to offset the "row" and "column" logical representations when rendering to the viewport
            const X_OFFSET = -150;
            const Y_OFFSET = 200;
            const X_SIZE = 50; // The 'x size' is the width of each squircle-pixel (SP)
            const Y_SIZE = 50; // The 'y size' is the height of each SP

            /** Add a squircle-pixel */
            const addSp = (row: number, column: number, color: ColorRepresentation): void => {
                addShape(this.group, squircle, extrudeSettings, color, column * X_SIZE + X_OFFSET, Y_OFFSET - row * Y_SIZE, 0, 0, 0, 0, 1);
            }

            // 1 - first row  (top)
            addSp(0, 0, HEX_GREEN_FOREST);
            addSp(0, 1, HEX_GREEN_FOREST);
            addSp(0, 2, HEX_GREEN_FOREST);
            addSp(0, 3, HEX_GREEN);

            // 2 - second row (second from top)
            // addShape(this.group, squircle, extrudeSettings, HEX_GREEN_FOREST, -150, 150, 0, 0, 0, 0, 1);
            addSp(1, 0, HEX_GREEN_FOREST);
            addSp(1, 1, HEX_GREEN_FOREST);
            addSp(1, 2, HEX_GREEN);

            // 3
            addSp(2, 0, HEX_GREEN_FOREST);
            addSp(2, 1, HEX_GREEN);

            // 4
            addSp(3, 0, HEX_WHITE);
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
