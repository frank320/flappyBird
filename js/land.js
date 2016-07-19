/**
 * Created by Frank on 2016/7/6.
 */
define(function (require, exports, module) {
    var util = require('./util')
    var Pipe = require('./pipe')
    module.exports = Land
    //大地对象模式
    function Land(cvs, ctx, x) {
        //实例化时 先判断大地图片是否初始化
        if (!Land.isInit) {
            throw '请先初始化Land类!';
        }
        this.cvs = cvs;
        this.ctx = ctx;
        this.x = x || 0;
        this.y = cvs.height - Land.IMG_HEIGHT;
        this.speed = -1.5;
    }

//给大地类加一个静态方法
    Land.init = function (img) {
        Land.img = img;
        Land.IMG_WIDTH = Land.img.width;
        Land.IMG_HEIGHT = Land.img.height;
        //大地类是否初始化控制
        if (img) Land.isInit = true;
    }

//给大地类的原型添加实例成员
    util.extend(Land.prototype, {
        draw: function () {
            //载入图片
            this.ctx.drawImage(Land.img, this.x, this.y);
        },
        update: function () {
            //更新大地的x轴位置
            this.speed = Pipe.speed;
            this.x += this.speed;
            if (this.x < -Land.IMG_WIDTH) {
                this.x += Land.IMG_WIDTH * 4;
            }
        }

    });

})
