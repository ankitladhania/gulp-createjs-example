/* jshint devel:true */
var canvas,preload, w,h;
function init() {
    // get a reference to the canvas we'll be working with:
    preload = new createjs.LoadQueue();
    preload.on('complete',handleFileUpload,this);
    preload.loadFile({id:"yeoman",src:"images/yeoman.png"});

    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    canvas = document.getElementById("testCanvas");
    canvas.width = w - 10;
    canvas.height = h - 10;
    // create a stage object to work with the canvas. This is the top level node in the display list:
    var stage = new createjs.Stage(canvas);

    // Create a new Text object:
    var text = new createjs.Text("Hello World!", "bold 7em Arial", "#ff7700");

    // add the text as a child of the stage. This means it will be drawn any time the stage is updated
    // and that its transformations will be relative to the stage coordinates:
    stage.addChild(text);

    // position the text on screen, relative to the stage coordinates:
    //console.log(window.innerWidth,window.innerHeight);
    var b = text.getBounds();
    text.x = (canvas.width - 150 - b.width) / 2;
    text.y = (canvas.height - 100 - b.height) / 2;

    // call update on the stage to make it render the current display list to the canvas:
    stage.update();
}

function handleFileUpload(event){
    var bitmap = new createjs.Bitmap(event.result);
    canvas.addChild(bitmap);
    canvas.update();
}