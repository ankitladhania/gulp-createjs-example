/* jshint devel:true */
(function () {
    var stage,preload,cW,cH,winW,winH;
    var road,city1,city2,sky,build1,build2;
    function init(){
        var canvas = document.getElementById("testCanvas");
        winW = window.innerWidth;
        winH = window.innerHeight;
        canvas.width = cW = winW - 10;
        canvas.height = cH =  winH - 10;

        stage = new createjs.Stage(canvas);

        preload = new createjs.LoadQueue();

        var manifest =[{id:"road",src:"images/srijan/road.png"},
            {id:"build1",src:"images/srijan/centralPerk.png"},
            {id:"build2",src:"images/srijan/phoneBooth.png"},
            {id:"farbuild1",src:"images/srijan/nearer layer.jpg"},
            {id:"farbuild2",src:"images/srijan/farthest layer.jpg"},
            {id:"sky",src:"images/srijan/sky.png"}
        ];
        preload.loadManifest(manifest);
        preload.on("complete",handleComplete);
    }

    function handleComplete(){
        sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(preload.getResult("sky"),"repeat-x").drawRect(0, 0, cW, cH);

        var roadImg = preload.getResult("road");
        road = new createjs.Shape();
        road.graphics.beginBitmapFill(roadImg).drawRect(0, 0, cW + roadImg.width, roadImg.height*1);
        road.tileW = roadImg.width;
        road.y = cH - roadImg.height;

        /*var matrix = new createjs.Matrix2D(1,2,3,4,5,6);*/

        build1 = new createjs.Bitmap(preload.getResult("build1"));
        build1.setTransform(Math.random()*cW ,cH - build1.image.height * 0.7 - roadImg.height, 0.7,0.7);
        build1.alpha = 1;

        build2 = new createjs.Bitmap(preload.getResult("build2"));
        //console.log(cH - build2.image.height * 1 - roadImg.height);
        build2.setTransform(Math.random()*cW ,cH - build2.image.height * 0.7 - roadImg.height, 0.7,0.7);
        build2.alpha = 1;

        stage.addChild(sky,build1,build2,road);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        document.onkeydown = tick;
        //createjs.Ticker.addEventListener("tick", tick);
    }

    function tick(event){
        if(event.keyCode === 37){
            var deltaS = event.delta / 1000 || 40/1000;
            road.x = (road.x - deltaS * 200) % road.tileW;

            build1.x = (build1.x - deltaS * 60);
            if (build1.x + build1.image.width * build1.scaleX <= 0) {
                build1.x = cW;
            }
            build2.x = (build2.x - deltaS * 75);
            if (build2.x + build2.image.width * build2.scaleX <= 0) {
                build2.x = cW;
            }
            stage.update(event);
        }
    }

    init();
})();