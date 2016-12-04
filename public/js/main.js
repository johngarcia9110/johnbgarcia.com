// This docuement contains the following:
// Jumbotron background
// Navigation Scroll Effects

if(document.getElementById('jumbotron')){
  paper.install(window);
  var SQRT_3 = Math.pow(3, 0.5);
  var count = 60;

  window.onload = function() {
    paper.setup('canvas');

    var canvasHeight = document.getElementById('jumbotron').offsetHeight;
    var canvasWidth = document.getElementById('jumbotron').offsetWidth;

    canvas.width = canvasHeight;
    canvas.height = canvasWidth;
    //D = Math.max(W, H);
    view.viewSize = new Size(canvasWidth, canvasHeight);
    //mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
    position = paper.view.center;

    // Draw the BG
    var background = new Path.Rectangle(view.bounds);
    //     background.fillColor = '#3B3251';
    buildStars();

    paper.view.draw();

    paper.view.onFrame = function(event) {
      var vector = (view.center.subtract(position)).divide(20);
      moveStars(vector);
      //triangle.update();
    };
  };



  // ---------------------------------------------------
  //  Helpers
  // ---------------------------------------------------
  window.onresize = function() {
    project.clear();
    var canvasHeight = document.getElementById('jumbotron').offsetHeight;
    var canvasWidth = document.getElementById('jumbotron').offsetWidth;

    canvas.width = canvasHeight;
    canvas.height = canvasWidth;
    //D = Math.max(W, H);
    view.viewSize = new Size(canvasWidth, canvasHeight);
    //D = Math.max(paper.view.getSize().width, paper.view.getSize().height);
    // Draw the BG
    var background = new Path.Rectangle(view.bounds);
    //     background.fillColor = '#3B3251';
    buildStars();
    paper.view.onFrame = function(event) {
      var vector = (view.center.subtract(position)).divide(20);
      moveStars(vector);
      //triangle.update();
    };
  };

  var random = function(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
  };





  var buildStars = function() {
    // Create a symbol, which we will use to place instances of later:
    var path = new Path.Circle({
      center: [0, 0],
      radius: 5,
      fillColor: '#0d6c81',
      strokeColor: '#0d6c81'
    });

    var symbol = new Symbol(path);

    // Place the instances of the symbol:
    for (var i = 0; i < count; i++) {
      // The center position is a random point in the view:
      var center = Point.random().multiply(paper.view.size);
      var placed = symbol.place(center);
      placed.scale(i / count + 0.01);
      placed.data = {
        vector: new Point({
          angle: Math.random() * 360,
          length : (i / count) * Math.random() / 5
        })
      };
    }

    var vector = new Point({
      angle: 45,
      length: 1
    });
  };

  var keepInView = function(item) {
    var position = item.position;
    var viewBounds = paper.view.bounds;
    if (position.isInside(viewBounds))
      return;
    var itemBounds = item.bounds;
    if (position.x > viewBounds.width + 5) {
      position.x = -item.bounds.width;
    }

    if (position.x < -itemBounds.width - 5) {
      position.x = viewBounds.width;
    }

    if (position.y > viewBounds.height + 5) {
      position.y = -itemBounds.height;
    }

    if (position.y < -itemBounds.height - 5) {
      position.y = viewBounds.height;
    }
  };

  var moveStars = function(vector) {
    // Run through the active layer's children list and change
    // the position of the placed symbols:
    var layer = project.activeLayer;
    for (var i = 1; i < count + 1; i++) {
      var item = layer.children[i];
      var size = item.bounds.size;
      var length = vector.length / 10 * size.width / 10;
      item.position = item.position.add( vector.normalize(length).add(item.data.vector));
      keepInView(item);
    }
  };
}


/*---------------------------------------
 Navigation Scroll Effects
---------------------------------------*/

var nav = document.getElementById('nav');
var logo = document.getElementById('logo');

window.addEventListener('scroll', function(e){
  var position = window.pageYOffset; // get our current scroll position
  if(position < 200){
    nav.classList.remove('light-nav');
    logo.src = '/images/logo-light1.svg';
  }else{
    nav.classList.add('light-nav');
    logo.src = '/images/logo-dark.svg';
  }
});
