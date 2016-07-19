/**
 * Created by Frank on 2016/7/6.
 */
define(function (require, exports, module) {
    module.exports = {
        // 把角度转换为弧度
        angleToRad: function (angle) {
            return Math.PI / 180 * angle
        },
        //extend函数
        extend: function (obj1, obj2) {
            for (var k in obj2) {
                obj1[k] = obj2[k]
            }
        }
    }

    console.log('util被调用了多次 但只执行了1次  因为util第一次执行后就被缓存了');
})

