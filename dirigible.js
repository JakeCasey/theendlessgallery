// import 'aframe-html-shader';
//To enable mobile compatibility you must enable the webVR polyfill, as well as enable motion controls in safari: https://github.com/aframevr/aframe/issues/3976
// https://github.com/supermedium/superframe <-- huge collection of aframe components.

AFRAME.registerComponent('wall', {
  init: function() {
    //create image
    var image = document.createElement('a-image');
    //set art attribute
    image.setAttribute('art', true);

    //add image to wall segment
    this.el.appendChild(image);
  },
});

AFRAME.registerComponent('art', {
  init: function() {
    this.el.setAttribute('src', '#cypress');
    this.el.setAttribute('position', '0 1.75 -4');
  },
});

AFRAME.registerPrimitive('a-hall', {
  defaultComponents: {
    tube: {},
  },
  mappings: {
    path: 'hall.path',
    width: 'hall.width',
  },
});

AFRAME.registerComponent('hall', {
  schema: {
    path: { default: [] },
    width: { default: 1 },
  },
  init: function() {
    var data = this.data;
    var sceneEl = this.el.sceneEl.object3D;
    if (!data.path.length) {
      console.error('[a-hall] `path` property expected but not found.');
      return;
    }
    var path = data.path;
    var pathPointOne = path[0];
    point = pathPointOne.split(' ');
    var pointOne = new THREE.Vector3(
      Number(point[0]),
      Number(point[1]),
      Number(point[2]),
    );
    var pathPointTwo = path[1];
    point = pathPointTwo.split(' ');
    var pointTwo = new THREE.Vector3(
      Number(point[0]),
      Number(point[1]),
      Number(point[2]),
    );
    var width = data.width;
    var widthAdd = width / 2;
    var length = 5;
    var height = 4;

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000, // red (can also use a CSS color string here)
      flatShading: true,
    });

    console.log(path);
    console.log(pointOne);
    console.log(pointTwo);

    console.log(width);

    //prep entites
    var wallOne = document.createElement('a-entity');
    var wallTwo = document.createElement('a-entity');

    var geometry = new THREE.BoxGeometry(width, height, length);
    geometry.translate(0, 0, length / 2);

    this.meshWallOne = new THREE.Mesh(geometry, material);

    this.meshWallOne.position.copy(pointOne);
    this.meshWallOne.lookAt(pointTwo);

    wallOne.setAttribute('wall', true);
    wallOne.setObject3D('mesh', this.meshWallOne);

    var geometry2 = new THREE.BoxGeometry(width, height, length);
    geometry2.translate(2, 0, length / 2);

    this.meshWallTwo = new THREE.Mesh(geometry2, material);

    this.meshWallTwo.position.copy(pointOne);
    this.meshWallTwo.lookAt(pointTwo);

    wallTwo.setAttribute('wall', true);
    wallTwo.setObject3D('mesh', this.meshWallTwo);

    this.el.appendChild(wallOne);
    this.el.appendChild(wallTwo);
    // this.el.setObject3D('mesh', this.mesh);
  },
});

// A $( document ).ready() block.
$(document).ready(function() {
  $('#the_scene').on('loaded', function() {
    $('#loading_screen').css('visibility', 'hidden');
  });
  setTimeout(function() {
    $('#loading_screen').css('visibility', 'hidden');
  }, 2500);
});
