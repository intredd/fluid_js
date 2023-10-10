// import * as THREE from "three";
import Common from "./Common.js";
import Output from "./Output.js";
import Mouse from "./Mouse.js";

export default class Webgl{
    constructor(props){
        this.props = props;

        Common.init();
        Mouse.init();

        this.init();
        this.loop();

        window.addEventListener("resize", this.resize.bind(this));
    }

    init(){
        this.props.$wrapper.prepend(Common.renderer.domElement);
        this.output = new Output();
    }

    resize(){
        Common.resize();
        this.output.resize();
    }

    render(){
        Mouse.update();
        Common.update();
        this.output.update();
    }

    loop(){
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }
}
