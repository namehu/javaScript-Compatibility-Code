/*
*   简易的浏览器以及版本检测
*
*/
(function () {
    window.webBrowser = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? webBrowser.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? webBrowser.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? webBrowser.chrome = s[1] :
                (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? webBrowser.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? webBrowser.safari = s[1] :
                        0;
})();