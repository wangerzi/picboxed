# picboxed penguin for Jquery
jQuery 图片盒子插件

# OVERVIEW
jQuery.picboxed插件，用于放大图片，适用于各种需要对图片进行全屏放大操作的场景。
本插件灵感来源[materialze](http://materializecss.com)的materialbox插件，但在materialze环境和非materialze环境下部署时都遇到了一些问题，于是就自己写了一个图片放大插件，依赖jQuery库。
另外，在materialze中的.carsouel组件中使用 materialbox插件无法达到效果，因为 .materialbox的position='absolute'，相对定位点被改变，使用本插件可避免此问题。

# STRUCT

	|---css/-picboxed.css			#样式文件
	|
	|		|--jquery.1.2.1.js		#jQuery文件
	|---js/-|
	|		|--picboxed.js			#核心js文件
	|		|--picboxed.min.js		#压缩过的核心文件
	|
	|---demo/-demo_1.html			#与materialze插件结合的样例
	

# USAGE
1. 引用 `css/picboxed.css` 加载样式表
1. 引用 `js/jquery.1.2.1.js` 加载jQuery，版本1.1以上
1. 引用 `js/picboxed.js` 加载picboxed插件
1. 在HTML的`img`标签中使用`class="picboxed" data-header='头部信息' data-footer='尾部信息'`即可
1. 如果图片是动态添加的话，需要调用 `$('.picboxed').picboxed();`。  

# VERSION
1. 2017年4月16日15:42:08	v1.0.0		最初版本，实现全屏放大，并且解决图片的相对/绝对定位导致无法全屏放大的问题。
1. 2017年4月16日15:42:13	v1.1.0		新增滚轮放大图片指定位置的功能。
1. 2017年4月16日16:56:30	v1.1.2		对display:none;的隐藏图片点击做了优化过渡处理。
1. 2017年4月18日10:04:48	v1.1.3		修复放大图片后图片变形的bug，优化放大时的页面滚动。

# EFFECT
- 鼠标放在图片上有放大镜手势
- 点击图片，图片以合适的速度全屏，并显示头部和尾部信息。
- 鼠标放在放大后的图片上有缩小手势
- 点击放大的图片，图片以合适的速度缩小并定位到原图片所在位置。
![Markdown](http://i1.piimg.com/1949/c2e3d88921b1105e.jpg)  

![Markdown](http://i1.piimg.com/1949/6ea36cd0e9448aff.jpg)
