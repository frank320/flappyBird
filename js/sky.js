/**
 * Created by Frank on 2016/7/6.
 */
define(function (require, exports, module) {
    var util = require('./util')
    var Pipe = require('./pipe')
    module.exports = Sky
    //天空对象模式
    function Sky(cvs, ctx, x) {
        //实例化时 先判断天空图片是否初始化
        if (!Sky.isInit) {
            throw '请先初始化Sky类!';
        }
        this.cvs = cvs;
        this.ctx = ctx;
        this.x = x || 0;
        this.y = 0;
        this.speed = -3;
    }

//给天空类加一个静态方法
    Sky.init = function (img) {
        Sky.img = img;
        Sky.IMG_WIDTH = Sky.img.width;
        Sky.IMG_HEIGHT = Sky.img.height;
        //天空类是否初始化控制
        if (img) Sky.isInit = true;
    }

//给天空类的原型添加实例成员
    util.extend(Sky.prototype, {
        draw: function () {
            //载入图片
            this.ctx.drawImage(Sky.img, this.x, this.y);
        },
        update: function () {
            this.speed = Pipe.speed - 1
            //跟新天空的x轴位置
            this.x += this.speed;
            if (this.x < -Sky.IMG_WIDTH) {
                this.x += Sky.IMG_WIDTH * 2;
            }
        }

    });
})

