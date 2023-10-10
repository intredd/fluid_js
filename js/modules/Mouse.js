import * as THREE from "three";
import Common from "./Common.js";

const parent = document.getElementById('parent');

class Mouse{
    constructor(){
        this.mouseMoved = false;
        this.coords = new THREE.Vector2();
        this.coords_old = new THREE.Vector2();
        this.diff = new THREE.Vector2();
        this.timer = null;
        this.count = 0;
    }

    init(){
        parent.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );
        parent.addEventListener( 'touchstart', this.onDocumentTouchStart.bind(this), false );
        parent  .addEventListener( 'touchmove', this.onDocumentTouchMove.bind(this), false );
    }

    setCoords( x, y ) {
        if(this.timer) clearTimeout(this.timer);
        this.coords.set( ( x / Common.width ) * 2 - 1, - ( y / Common.height ) * 2 + 1 );
        this.mouseMoved = true;
        this.timer = setTimeout(() => {
            this.mouseMoved = false;
        }, 100);

    }
    onDocumentMouseMove( event ) {
      let rect = event.target.getBoundingClientRect();
        this.setCoords( event.clientX - rect.left, event.clientY - rect.top);
    }
    onDocumentTouchStart( event ) {
        if ( event.touches.length === 1 ) {
          let rect = event.target.getBoundingClientRect();
            // event.preventDefault();
            this.setCoords( event.touches[ 0 ].pageX - rect.left, event.touches[ 0 ].pageY - rect.top );
        }
    }
    onDocumentTouchMove( event ) {
        if ( event.touches.length === 1 ) {
          let rect = event.target.getBoundingClientRect();
            // event.preventDefault();

            this.setCoords( event.touches[ 0 ].pageX - rect.left, event.touches[ 0 ].pageY - rect.top );
        }
    }

    update(){
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);

        if(this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
    }
}

export default new Mouse();
