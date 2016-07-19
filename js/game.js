/**
 * Created by Frank on 2016/7/9.
 */

define(function (require, exports, module) {
    var getImgObj = require('./getImgObj')
    var Bird = require('./bird')
    var Land = require('./land')
    var Pipe = require('./pipe')
    var Sky = require('./sky')

    function Game() {
    }

    module.exports = Game

    Game.run = function () {

        //获取canvas对象
        var cvs = document.getElementById("cvs");
        //创建环境
        var ctx = cvs.getContext("2d");

        var gameOver = false;

        getImgObj(function (imgObj) {
            //初始化小鸟类图片
            Bird.init(imgObj["birds"]);
            //初始化天空类图片
            Sky.init(imgObj["sky"]);
            //初始化大地图片
            Land.init(imgObj["land"]);
            //初始化管道图片
            Pipe.init({down: imgObj["pipeDown"], up: imgObj["pipeUp"]});

            //实例化小鸟
            var bird = new Bird(cvs, ctx, 10, 10, 54, 45);
            //实例化天空
            var sky1 = new Sky(cvs, ctx);
            var sky2 = new Sky(cvs, ctx, Sky.IMG_WIDTH);
            //实例化大地
            var lands = [];
            for (var i = 0; i < 4; i++) {
                lands[i] = new Land(cvs, ctx, Land.IMG_WIDTH * i);
            }
            //实例化管道
            var pipes = [];
            for (var i = 0; i < 6; i++) {
                pipes[i] = new Pipe(cvs, ctx, Pipe.IMG_WIDTH * 3 * i + 200);
            }
            //点击时 小鸟上升
            document.addEventListener('click',function () {
                bird.speed = -2;
            })
            //兼容移动设备
            document.addEventListener('touchstart', function () {
                bird.speed = -2;
            })

            var timer = setInterval(function () {
                //碰撞检测
                gameOver = (bird.y < -10) ||
                    (bird.y > cvs.height - Land.IMG_HEIGHT - bird.height ) ||
                    ctx.isPointInPath(bird.x + bird.width * 0.8, bird.y + bird.height * 0.3) ||
                    ctx.isPointInPath(bird.x + bird.width * 0.8, bird.y + bird.height * 0.8);
                if (gameOver) clearInterval(timer);
                //绘制小鸟时 先清除画布
                ctx.clearRect(0, 0, cvs.width, cvs.height);//清除画布 不会清除路径
                //新开辟路径
                ctx.beginPath();
                //天空
                sky1.draw();
                sky1.update();
                sky2.draw();
                sky2.update();

                //管道
                pipes.forEach(function (pipe) {
                    pipe.draw();
                    pipe.update();
                });
                //大地
                lands.forEach(function (land) {
                    land.draw();
                    land.update();
                });
                //小鸟
                bird.draw();
                bird.update();

            }, 15);
        });

    }
})


