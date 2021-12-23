import * as THREE from "three";
import {
    ColorRepresentation,
    ExtrudeGeometryOptions,
    Group,
    PerspectiveCamera, PointLight,
    Scene,
    Shape, WebGLRenderer
} from "three";

// Functions extracted from the three.js example: https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html
export function newScene(): Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    return scene;
}

export function newCamera(): PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 500);
    return camera;
}

export function newLight(): PointLight {
    return new THREE.PointLight(0xffffff, 0.8);
}


/**
 * Create a squircle. It's like rounded square.
 *
 * Definition of squircle: https://en.wikipedia.org/wiki/Squircle
 *
 * This shape code was taken from the three.js example: https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html
 */
export function newSquircle(width: number, height: number, radius: number): Shape {
    const shape = new THREE.Shape();

    const x = 0, y = 0;

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    return shape;
}

export function newRenderer(): WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

/**
 * Add a shape a group. Extrude the shape into a 3D object (I think?)
 */
export function addShape(group: Group, shape: Shape, extrudeSettings: ExtrudeGeometryOptions, color: ColorRepresentation, x: number, y: number, z: number, rx: number, ry: number, rz: number, s: number) {

    // Extrude the shape
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}));
    mesh.position.set(x, y, z - 75);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);

    group.add(mesh);
}
