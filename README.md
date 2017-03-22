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
    现代绑定中W3C使用的是：addEventListener和removeEventListener。
    IE使用的是attachEvent和detachEvent。我们知道IE的这两个问题多多，并且伴随内存泄漏。所以，解决这些问题非常有必要。
    我们希望解决事件绑定的问题有：
      1.支持同一元素的同一事件句柄可以绑定多个监听函数；
      2.如果在同一元素的同一事件句柄上多次注册同一函数，那么第一次注册后的所有注册都被忽略；
      3.函数体内的this指向的应当是正在处理事件的节点（如当前正在运行事件句柄的节点）；
      4.监听函数的执行顺序应当是按照绑定的顺序执行；
      5.在函数体内不用使用 event = event || window.event; 来标准化Event对象；
   使用下面的封装函数。即可完美解决跨浏览器问题。如果你不使用jQuery等第三方库只能使用原生JS时。这个可以帮到你。
   
   有addEvent()和removeEvent()两个方法。你可以多进行一层封装。
   
## js-browser-inspect (浏览器版本检测)
    通过自执行函数在window对象上绑定一个webBrowser对象。能够检测相应的浏览器以及版本号。为不同浏览器的兼容提供判断依据。