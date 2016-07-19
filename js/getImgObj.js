/**
 * Created by Frank on 2016/7/6.
 */
define(function (require, exports, module) {
    function getImgObj(fn) {
        //图片路径的对象
        var imgpathObj = {
            birds: "./imgs/birds.png",
            land: "./imgs/land.png",
            pipeDown: "./imgs/pipeDown.png",
            pipeUp: "./imgs/pipeUp.png",
            sky: "./imgs/sky.png"
        };
        //图片对象
        var imgObj = {};
        //记录图片加载完成的张数
        var imgLoadCount = 0;
        //遍历图片路径对象 加载图片
        for (var k in imgpathObj) {
            var path = imgpathObj[k];
            var img = new Image();
            img.addEventListener("load", function () {
                imgLoadCount++;
                if (imgLoadCount >= 5)   fn(imgObj);
            });
            img.src = path;
            //保存图片对象
            imgObj[k] = img;
        }
    }

    module.exports = getImgObj
})
