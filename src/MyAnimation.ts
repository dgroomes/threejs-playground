import {ColorRepresentation, Fog, Group, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {addShape, newCamera, newLight, newRenderer, newSquircle, newScene} from "./animation-util";

const HEX_GRAY = 0x808080;
const HEX_GREEN_FOREST = 0x008000;
const HEX_GREEN = 0x6fd251;
const HEX_WHITE = 0xfcfcfc;
const HEX_BLACK = 0x000000;

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
            const X_SIZE = 25; // The 'x size' is the width of each squircle-pixel (SP)
            const Y_SIZE = 25; // The 'y size' is the height of each SP
            const X_OFFSET = - 4 * X_SIZE;
            const Y_OFFSET = 10 * Y_SIZE;
            const squircle = newSquircle(X_SIZE, Y_SIZE,10);

            /** Add a squircle-pixel */
            const addSp = (row: number, column: number, color: ColorRepresentation): void => {
                addShape(this.group, squircle, extrudeSettings, color, column * X_SIZE + X_OFFSET, Y_OFFSET - row * Y_SIZE, 0, 0, 0, 0, 1);
            }

            // Begin plotting pixels, row-by-row, to make some pixel art.
            // There will be 16 rows and 14 columns total. That means the origin is (0,0) and the opposite corner is (15, 13)

            // First row (top)
            addSp(0, 5, HEX_BLACK);
            addSp(0, 6, HEX_BLACK);
            addSp(0, 7, HEX_BLACK);
            addSp(0, 8, HEX_BLACK);

            // Second row (one below the top row)
            addSp(1, 4, HEX_BLACK);
            addSp(1, 9, HEX_BLACK);

            addSp(2, 3, HEX_BLACK);
            addSp(2, 10, HEX_BLACK);

            addSp(3, 2, HEX_BLACK);
            addSp(3, 11, HEX_BLACK);

            addSp(4, 2, HEX_BLACK);
            addSp(4, 11, HEX_BLACK);

            addSp(5, 1, HEX_BLACK);
            addSp(5, 12, HEX_BLACK);

            addSp(6, 1, HEX_BLACK);
            addSp(6, 12, HEX_BLACK);

            addSp(7, 0, HEX_BLACK);
            addSp(7, 13, HEX_BLACK);

            addSp(8, 0, HEX_BLACK);
            addSp(8, 13, HEX_BLACK);

            addSp(9, 0, HEX_BLACK);
            addSp(9, 13, HEX_BLACK);

            addSp(10, 0, HEX_BLACK);
            addSp(10, 13, HEX_BLACK);

            addSp(11, 1, HEX_BLACK);
            addSp(11, 12, HEX_BLACK);

            addSp(12, 1, HEX_BLACK);
            addSp(12, 12, HEX_BLACK);

            addSp(13, 2, HEX_BLACK);
            addSp(13, 11, HEX_BLACK);

            addSp(14, 3, HEX_BLACK);
            addSp(14, 4, HEX_BLACK);
            addSp(14, 9, HEX_BLACK);
            addSp(14, 10, HEX_BLACK);

            addSp(15, 5, HEX_BLACK);
            addSp(15, 6, HEX_BLACK);
            addSp(15, 7, HEX_BLACK);
            addSp(15, 8, HEX_BLACK);
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
