/**
 * Created by Frank on 2016/7/6.
 */
define(function (require, exports, module) {
    var util = require('./util')
    module.exports = Pipe
    var count = 0
    //管道类
    function Pipe(cvs, ctx, x, space) {
        //实例化时 先判断管道图片是否初始化
        if (!Pipe.isInit) {
            throw '请先初始化Pipe类!';
        }
        this.cvs = cvs;
        this.ctx = ctx;
        this.width = Pipe.IMG_WIDTH;
        this.height = Math.random() * 220 + 40;
        this.x = x;
        this.y = -(Pipe.IMG_HEIGHT - this.height);
        this.space = space || 150;
        this.speed = -1.5;
    }

//给管道类加一个静态方法
    Pipe.init = function (img) {
        Pipe.img = img;
        Pipe.IMG_WIDTH = Pipe.img.down.width;
        Pipe.IMG_HEIGHT = Pipe.img.down.height;
        //管道类是否初始化控制
        if (img.down && img.up) Pipe.isInit = true;
    }
    Pipe.speed = -1.5;

//给管道类的原型添加实例成员
    util.extend(Pipe.prototype, {
        draw: function () {
            //载入图片
            this.ctx.drawImage(Pipe.img.down, this.x, this.y, this.width, Pipe.IMG_HEIGHT);
            this.ctx.drawImage(Pipe.img.up, this.x, Pipe.IMG_HEIGHT + this.y + this.space, this.width, Pipe.IMG_HEIGHT);
            //绘制管道矩形路径
            this.ctx.rect(this.x, this.y, this.width, Pipe.IMG_HEIGHT);
            this.ctx.rect(this.x, Pipe.IMG_HEIGHT + this.y + this.space, this.width, Pipe.IMG_HEIGHT);
            //更新关数
            this.ctx.fillStyle = "red";
            this.ctx.font = "700 30px simsun";
            this.ctx.fillText("Score: " + count, 50, 50);
        },
        update: function () {
            this.speed = -parseInt(count / 10) * 0.3 - 1.5;//速度更新
            Pipe.speed = this.speed;//方便更新大地和天空的速度
            //更新管道的x轴位置
            this.x += this.speed;
            if (this.x < -Pipe.IMG_WIDTH) {
                this.x += Pipe.IMG_WIDTH * 3 * 6;
                //更新管道的高度
                this.height = Math.random() * 220 + 40;
                this.y = -(Pipe.IMG_HEIGHT - this.height);
                //关数更新
                count++;
            }
        }

    });

})
