/**
 * Created by Frank on 2016/7/6.
 */
define(function (require, exports, module) {
    var util = require('./util')
    module.exports = Bird
    //小鸟类
    function Bird(cvs, ctx, x, y, width, height) {
        //实例化时 先判断小鸟图片是否初始化
        if (!Bird.isInit) {
            throw '请先初始化Bird类!';
        }
        this.cvs = cvs;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = 0;
        this.speed = 2;
        this.speedPlus = 0.1;
    }

//给小鸟类加一个静态方法
    Bird.init = function (img) {
        Bird.img = img;
        Bird.IMG_WIDTH = Bird.img.width / 3;
        Bird.IMG_HEIGHT = Bird.img.height;
        //小鸟是否初始化控制
        if (img) Bird.isInit = true;
    }

//给小鸟类的原型添加实例成员
    util.extend(Bird.prototype, {
        draw: function () {
            //小鸟头部旋转
            this.ctx.save();//保存当前画布状态
            var coreX = this.x + this.width / 2;
            var coreY = this.y + this.height / 2;
            //平移坐标系到小鸟中心位置
            this.ctx.translate(coreX, coreY);
            //旋转坐标系
            var rad = this.speed * 10;
            rad = rad > 30 ? 30 : rad;
            rad = util.angleToRad(rad);
            this.ctx.rotate(rad);
            //载入图片
            this.ctx.drawImage(Bird.img,
                this.index * Bird.IMG_WIDTH, 0, Bird.IMG_WIDTH, Bird.IMG_HEIGHT,
                -this.width / 2, -this.height / 2, this.width, this.height
            );
            this.ctx.restore();//回滚到上一画布状态
        },
        update: function () {
            this.index = ++this.index % 3;
            //更新小鸟的y轴位置
            this.y += this.speed;
            this.speed += this.speedPlus;
        }

    });
})

