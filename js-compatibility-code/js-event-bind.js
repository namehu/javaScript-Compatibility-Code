/*
*   现代绑定中W3C使用的是：addEventListener和removeEventListener。
*   IE使用的是attachEvent和detachEvent。我们知道IE的这两个问题多多，并且伴随内存泄漏。所以，解决这些问题非常有必要。
*   我们希望解决事件绑定的问题有：
*       1.支持同一元素的同一事件句柄可以绑定多个监听函数；
*       2.如果在同一元素的同一事件句柄上多次注册同一函数，那么第一次注册后的所有注册都被忽略；
*       3.函数体内的this指向的应当是正在处理事件的节点（如当前正在运行事件句柄的节点）；
*       4.监听函数的执行顺序应当是按照绑定的顺序执行；
*       5.在函数体内不用使用 event = event || window.event; 来标准化Event对象；
*    使用下面的封装函数。即可完美解决跨浏览器问题。如果你不使用jQuery等第三方库只能使用原生JS时。这个可以帮到你。
*/

/*
*   跨浏览器事件绑定
*   Object      obj     绑定对象
*   String      type    绑定类型
*   Function    fn      处理函数
* */
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {                       //W3C
        obj.addEventListener(type, fn, false);                              //不捕获。需要的另行扩展
    } else {                                                                //IE
        //创建一个存放事件的哈希表(散列表)
        if (!obj.events) obj.events = {};
        //第一次执行时执行
        if (!obj.events[type]) {
            //创建一个存放事件处理函数的数组
            obj.events[type] = [];
            //把第一次的事件处理函数先储存到第一个位置上
            if (obj['on' + type]) obj.events[type][0] = fn;
        } else {
            //同一个注册函数进行屏蔽，不添加到计数器中
            if (addEvent.equal(obj.events[type], fn)) return false;
        }
        //从第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;
        //执行事件处理函数
        obj['on' + type] = addEvent.exec;
    }
}

/*
 *   跨浏览器删除事件
 *   Object      obj     绑定对象
 *   String      type    解绑类型
 *   Function    fn      处理函数
 * */
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {                                      //W3C
        obj.removeEventListener(type, fn, false);
    } else {                                                                                   //IE
        for (var i in obj.events[type]) {
            if (obj.events[type][i] == fn) {
                delete obj.events[type][i];
            }
        }
    }
}

//为每个事件分配一个计数器
addEvent.ID = 1;

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
    this.returnValue = false;
};

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
};

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    return event;
};

//执行事件处理函数
addEvent.exec = function (event) {
    var e = event || addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for (var i in es) {
        es[i].call(this, e);                                                        //对象冒充，解决this指向以及事件对象传参问题
    }
};

//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
    for (var i in es) {
        if (es[i] == fn) return true;
    }
    return false;
}


