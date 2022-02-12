import {ColorRepresentation, Fog, Group, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {addShape, newCamera, newLight, newRenderer, newSquircle, newScene} from "./animation-util";

const HEX_GRAY = 0x808080;

const HEX_GREEN = 0x6fd251;
const HEX_GREEN_EMOJI_ALIAS = "🟩";

const HEX_WHITE = 0xfcfcfc;
const HEX_WHITE_EMOJI_ALIAS = "▢";

const HEX_BLACK = 0x000000;
const HEX_BLACK_EMOJI_ALIAS = "⬛️";

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
            const X_OFFSET = -4 * X_SIZE;
            const Y_OFFSET = 10 * Y_SIZE;
            const squircle = newSquircle(X_SIZE, Y_SIZE, 10);

            /**
             * This auto-converts emoji color aliases to the right color code.
             * @param color should be a proper ColorRepresentation or stringly-typed "emoji" alias
             * @return a proper ColorRepresentation
             *
             * For example:
             *
             * `maybeConvertEmojiColorAlias("🟩")` will return the hex code for green: `0x6fd251`.
             *
             * `maybeConvertEmojiColorAlias(0x6fd251)` will just return the given value: `0x6fd251`.
             */
            const maybeConvertEmojiColorAlias = (color: ColorRepresentation): ColorRepresentation => {
                if (color == HEX_GREEN_EMOJI_ALIAS) {
                    return HEX_GREEN;
                } else if (color == HEX_WHITE_EMOJI_ALIAS) {
                    return HEX_WHITE;
                } else if (color == HEX_BLACK_EMOJI_ALIAS) {
                    return HEX_BLACK;
                } else {
                    return color;
                }
            }

            /** Add a squircle-pixel */
            const addSp = (row: number, column: number, color: ColorRepresentation): void => {
                color = maybeConvertEmojiColorAlias(color);
                addShape(this.group, squircle, extrudeSettings, color, column * X_SIZE + X_OFFSET, Y_OFFSET - row * Y_SIZE, 0, 0, 0, 0, 1);
            }

            // Begin plotting pixels, row-by-row, to make some pixel art.
            // There will be 16 rows and 14 columns total. That means the origin is (0,0) and the opposite corner is (15, 13)

            // First row (top)
            addSp(0, 5, "⬛️");
            addSp(0, 6, "⬛️");
            addSp(0, 7, "⬛️");
            addSp(0, 8, "⬛️");

            // Second row (one below the top row)
            addSp(1, 4, "⬛️");
            addSp(1, 5, "▢");
            addSp(1, 6, "▢");
            addSp(1, 7, "▢");
            addSp(1, 8, "▢");
            addSp(1, 9, "⬛️");

            addSp(2, 3, "⬛️");
            addSp(2, 4, "🟩");
            addSp(2, 5, "🟩");
            addSp(2, 6, "▢");
            addSp(2, 7, "▢");
            addSp(2, 8, "▢");
            addSp(2, 9, "▢");
            addSp(2, 10, "⬛️");

            addSp(3, 2, "⬛️");
            addSp(3, 3, "🟩");
            addSp(3, 4, "🟩");
            addSp(3, 5, "🟩");
            addSp(3, 6, "▢");
            addSp(3, 7, "▢");
            addSp(3, 8, "▢");
            addSp(3, 9, "🟩");
            addSp(3, 10, "🟩");
            addSp(3, 11, "⬛️");

            {
                let row4Column = 2;
                const row4 = (color: ColorRepresentation): void => {
                    addSp(4, row4Column, color);
                    row4Column++;
                }
                row4("⬛️");
                row4("🟩");
                row4("🟩");
                row4("🟩");
                row4("▢");
                row4("▢");
                row4("▢");
                row4("🟩");
                row4("🟩");
                row4("🟩");
                addSp(4, 11, "⬛️");
            }

            {
                addSp(5, 1, "⬛️");
                const row5 = (colors: ColorRepresentation[]): void => {
                    let column = 2;
                    for (let color of colors) {
                        addSp(5, column++, color);
                    }
                }
                row5([
                    "▢", "🟩", "🟩", "▢", "▢", "▢", "▢", "🟩", "🟩", "🟩"
                ]);
                addSp(5, 12, "⬛️");
            }

            // I got desperate and clever at this point and defined a helper function to build a row of squircles
            // from an array of colors. This is more expressive.
            const rowOf = (row: number, startingColumn: number, colors: ColorRepresentation[]): void => {
                for (let color of colors) {
                    addSp(row, startingColumn++, color);
                }
            }

            rowOf(6, 1, ["⬛️", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "🟩", "🟩", "⬛️"]);
            rowOf(7, 0, ["⬛️", "🟩", "▢", "▢", "▢", "🟩", "🟩", "🟩", "▢", "▢", "▢", "▢", "▢", "⬛️"]);
            rowOf(8, 0, ["⬛️", "▢", "▢", "▢", "🟩", "🟩", "🟩", "🟩", "🟩", "▢", "▢", "▢", "▢", "⬛️"])
            rowOf(9, 0, ["⬛️", "▢", "▢", "▢", "🟩", "🟩", "🟩", "🟩", "🟩", "▢", "▢", "🟩", "🟩", "⬛️"])
            rowOf(10, 0, ["⬛️", "🟩", "🟩", "▢", "🟩", "🟩", "🟩", "🟩", "🟩", "▢", "🟩", "🟩", "🟩", "⬛️"])
            rowOf(11, 1, ["⬛️", "🟩", "🟩", "▢", "🟩", "🟩", "🟩", "▢", "▢", "🟩", "🟩", "⬛️"])
            rowOf(12, 1, ["⬛️", "🟩", "🟩", "▢", "▢", "▢", "▢", "▢", "▢", "🟩", "🟩", "⬛️"])
            rowOf(13, 2, ["⬛️", "🟩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "⬛️"])
            rowOf(14, 3, ["⬛️", "⬛️", "▢", "▢", "▢", "▢", "⬛️", "⬛️"])
            rowOf(15, 5, ["⬛️", "⬛️", "⬛️", "⬛️"])
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
