/**
 *  DOM加载完成执行函数
 *
 *  问题：
 *  处理页面文档加载的时候，我们遇到一个难题，就是使用window.onload这种将所有内容加载后（包括DOM文档结构，外部脚本、样式，图片音乐等）
 *  这样会导致在长时间加载页面的情况下，JS程序是不可用的状态。
 *  而JS其实只需要HTML DOM文档结构构造完毕之后就可以使用了，没必要等待诸如图片音乐和外部内容加载
 *
 *  了解一下浏览器加载的顺序：
 *   1.HTML解析完毕；
 *   2.外部脚本和样式加载完毕；
 *   3.脚本在文档内解析并执行；
 *   4.HTML DOM完全构造起来；
 *   5.图片和外部内容加载；
 *   6.网页完成加载。
 *
 *   因为第4步之后的加载会非常的慢。所以一般我们只需要等到DOM加载完成之后就可以进行js的执行了。
 *   那么对于DOM加载完毕的判断，不同得刘浏览器以及不同的版本都是有区别的。这里我们需要进行跨浏览器的兼容
 *
 *   window.DOMContentLoaded 事件:        支持浏览器 IE9+、Firefox、Chrome、Safari 3.1+和Opera 9+
 *   document.doScroll()方法 ：           兼容浏览器 IE 6+
 *   document && document.getElementById && document.getElementsByTagName && document.body 轮询：向下兼容pera8-，webkit引擎浏览器525-，Firefox2。
 *   当然也可以使用document.readyState来进行轮询或者直接使用window.onload来兼容。
 */
//兼容第三类需要进行浏览器版本检测.实际情况我们可以不兼容第三类(市场份额几乎绝迹)。
(function () {
    window.webBrowser = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? webBrowser.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? webBrowser.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? webBrowser.chrome = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? webBrowser.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? webBrowser.safari = s[1] :
    (s = ua.match(/webkit\/([\d.]+)/)) ? webBrowser.webkit = s[1]:
    0;
})();

/*
*   DOM加载
*   FUNCTION fn 执行函数
*/

function addDomLoaded(fn) {
    var isReady = false;
    var timer = null;
    function doReady() {
        if (timer) clearInterval(timer);
        if (isReady) return;
        isReady = true;
        fn();
    }

    if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) { //兼容第三类
        /*timer = setInterval(function () {
         if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
         doReady();
         }
         }, 1);*/

        timer = setInterval(function () {
            if (document && document.getElementById && document.getElementsByTagName && document.body) {
                doReady();
            }
        }, 1);
    } else if (document.addEventListener) {                             //W3C
        addEvent(document, 'DOMContentLoaded', function () {
            fn();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);
        });
    } else if (sys.ie && sys.ie < 9){                                  //IE 6、7、8
        var timer = null;
        timer = setInterval(function () {
            try {
                document.documentElement.doScroll('left');
                doReady();
            } catch (e) {}
        }, 1);
    }
}