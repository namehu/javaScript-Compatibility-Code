# javaScript-Compatibility-Code
javaScript 浏览器兼容代码
里面会保存有一些针对不同浏览器的兼容代码写法，随时更新;
代码会跟据每一个功能分成不同的js片段。这里会提供相应的说明的说明。

## 代码提交说明
    FUNCTION ADD		        功能新增
    FUNCTION MODIFY		        功能改进
    FUNCTION DELETE		        功能删除
    FUNCTION REPAIR		        BUG修复
    FUNCTION OPTIMIZE           代码优化
    
## js-event-bind (事件绑定兼容)
    window.addEvent(obj, event, fn)         //绑定一个事件
    window.removeEvent(obj, event, fn)。    //解除绑定事件
    
    现代绑定中W3C使用的是：addEventListener和removeEventListener。
    IE使用的是attachEvent和detachEvent。我们知道IE的这两个问题多多，并且伴随内存泄漏。所以，解决这些问题非常有必要。
    我们希望解决事件绑定的问题有：
      1.支持同一元素的同一事件句柄可以绑定多个监听函数；
      2.如果在同一元素的同一事件句柄上多次注册同一函数，那么第一次注册后的所有注册都被忽略；
      3.函数体内的this指向的应当是正在处理事件的节点（如当前正在运行事件句柄的节点）；
      4.监听函数的执行顺序应当是按照绑定的顺序执行；
      5.在函数体内不用使用 event = event || window.event; 来标准化Event对象；
   使用下面的封装函数。即可完美解决跨浏览器问题。如果你不使用jQuery等第三方库只能使用原生JS时。这个可以帮到你。
    
## js-browser-inspect (浏览器版本检测)
    支持浏览器类性：
        1.IE 
        2.chrome
        3.firefox
        4.opera
        5.safari
        6.webkit
   
    通过自执行函数在window对象上绑定一个webBrowser对象。能够检测相应的浏览器以及版本号。为不同浏览器的兼容提供判断依据。
    
## js-dom-ready   (dom加载完成检测)
    
     DOM加载完成执行函数
     window.addDomLoaded(fn)     传入函数。函数将在DOM加载完毕之后进行执行
    
     问题：
     处理页面文档加载的时候，我们遇到一个难题，就是使用window.onload这种将所有内容加载后（包括DOM文档结构，外部脚本、样式，图片音乐等）
     这样会导致在长时间加载页面的情况下，JS程序是不可用的状态。
     而JS其实只需要HTML DOM文档结构构造完毕之后就可以使用了，没必要等待诸如图片音乐和外部内容加载
    
     了解一下浏览器加载的顺序：
        1.HTML解析完毕；
        2.外部脚本和样式加载完毕；
        3.脚本在文档内解析并执行；
        4.HTML DOM完全构造起来；
        5.图片和外部内容加载；
        6.网页完成加载。
     
     因为第4步之后的加载会非常的慢。所以一般我们只需要等到DOM加载完成之后就可以进行js的执行了。
     那么对于DOM加载完毕的判断，不同得刘浏览器以及不同的版本都是有区别的。这里我们需要进行跨浏览器的兼容
     
     window.DOMContentLoaded 事件:        支持浏览器 IE9+、Firefox、Chrome、Safari 3.1+和Opera 9+
     document.doScroll()方法 ：           兼容浏览器 IE 6+
     document && document.getElementById && document.getElementsByTagName && document.body 轮询：向下兼容pera8-，webkit引擎浏览器525-，Firefox2。
     当然也可以使用document.readyState来进行轮询或者直接使用window.onload来兼容。