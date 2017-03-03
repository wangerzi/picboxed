/*!
 * jQuery.picboxed插件，用于放大图片，适用于各种需要对图片进行全屏放大操作的地方。
 * 
 * Author:Jeffrey Wang
 *
 * Version:v1.0.0
 *
 * Usage: <img class="picboxed" src="..." data-header="头部信息" data-footer="尾部信息" >，动态添加图片时需要自行初始化：$(...).picboxed();
 *
 * Info: 灵感来源materialze的materiabox插件，但在实际部署中遇到了一些问题，于是就重写了，不依赖其他库。
 */
(function($){
	$.fn.picboxed=function(){
		return this.each(function(){
			origin = $(this);
			
			if(origin.is('.initialized')){
				return ;
			}
			origin.addClass('initialized');//添加初始化标记，避免重复初始化。
			origin.on('click',function(){
				origin = $(this);
				screenWidth = window.innerWidth;
				screenHeight = window.innerHeight;
				
				item = origin.parents('.carousel-item:first');
				//console.log(item.is('.active'));
				if(item.length && !item.is('.active'))//跟materialze的carousel融合时出现的问题，如果是item并且不是激活状态则不进行操作。
					return ;
				
				oldWidth = origin.width();//在图片加载完成后执行，否则获取高度为0。
				oldHeight = origin.height();
				//console.log(oldWidth+'+'+oldHeight);
				
				newWidth = screenWidth * 0.8;
				newHeight = newWidth * oldHeight / oldWidth;
				//console.log(newWidth+':'+newHeight);
				if(newHeight > screenHeight){
					newHeight = screenHeight*0.8;
					newWidth = newHeight * (oldWidth / oldHeight);
				}
				header = origin.attr('data-header');
				footer = origin.attr('data-footer');
				header = typeof header == 'undefined' ? '' : header;
				footer = typeof footer == 'undefined' ? '' : footer;
				
				wrap = '<div class="img-wrap"></a>';
				override = $('<div></div>').addClass('picboxed-override').css({
					width:screenWidth,
					height:screenHeight,
					opacity:0,
				})
				.append('<div class="img-header">'+header+'</div>')
				.animate({opacity:1},'fast')
				.append(origin.clone().css({
					width:oldWidth,
					height:oldHeight,
					top:origin.offset().top-$(document).scrollTop(),
					left:origin.offset().left
				}))//放置到展区中，设置css是为了过渡平缓，从原图位置开始动画。
				.append('<div class="img-footer">'+footer+'</div>')
				.click(function(){//放大后的点击，直接返回。
					returnToOrigin();
				});
				//滚动即退出全屏。
				$(window).scroll(function(){
					returnToOrigin();
				});
				
				clone = $("body").append(override).find('img.picboxed:last');
				
				clone
				.wrap(wrap)
				.addClass('active')
				.animate({
					width : newWidth,
					height: newHeight,
					top:(screenHeight - newHeight)/2,
					left:(screenWidth - newWidth)/2,
				},'slow');
			});
			
			//返回页面
			function returnToOrigin(){
				override = $("body .picboxed-override:last");
				clone = override.find('img.picboxed')
				override.fadeOut('normal');
				clone.animate({
					width:oldWidth,
					height:oldHeight,
					//top:(screenHeight - oldHeight)/2,
					//left:(screenWidth - oldWidth)/2,
					top:origin.offset().top-$(document).scrollTop(),//恢复到图片所在的绝对位置。
					left:origin.offset().left,
				},'normal',function(){
					//console.log((origin.offset().top-$(document).scrollTop())+':'+origin.offset().left);
					override.remove();
					origin.removeClass('active');
				});
			}
		});
	}
	$(document).ready(function(){
		$('.picboxed').picboxed();
	  });
} ( jQuery ) );