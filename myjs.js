jQuery(window).load(function(){
				$('#loading2').removeClass('loading1');
				return false;
		});
			$(window).scroll(function () {
				if ($(this).scrollTop() >150) {
					$('#toTop').css("opacity","1");
					//$('.nav1').addClass("sabit");
				} else {
					$('#toTop').css("opacity","0");
					//$('.nav1').removeClass("sabit");
				}
			});
			$('[data-toggle="tooltip"]').tooltip();
		 $('#toTop').click(function(){
			 $("html, body").animate({ scrollTop: 0 }, 600);
		 });
		$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
			event.preventDefault(); 
			event.stopPropagation(); 
			$(this).parent().siblings(".open").removeClass('open');
			$(this).parent().toggleClass('open');
			var menu = $(this).parent().find("ul");
			var menupos = menu.offset();
			if ((menupos.left + menu.width()) + 30 > $(window).width()) {
				var newpos = - menu.width();      
			} else {
				var newpos = $(this).parent().width();
			}
			menu.css({ left:newpos });
		});
		$(document).ready(function(){
	
var c_sure=6000;
var c_toplamLi=$('.list_carousel ul li').size();
var c_liwidth=$('.list_carousel ul li').width();
var c_liheight=$('.list_carousel ul li').height();
var c_liIndex=1;
var c_toplamWidth=c_liwidth*c_toplamLi*2;
$('.list_carousel ul').css('width',c_toplamWidth+'px');
$('.list_carousel ul').css('marginLeft','-'+c_liwidth+'px');
var c_clone;
	c_clone=$('.list_carousel ul li:last').clone();
	$('.list_carousel ul').prepend(c_clone);
	$('.list_carousel ul li:last').remove();

if(Math.round($('.list_carousel').width()/c_liwidth)>=c_toplamLi){
	$('.list_carousel ul').css('marginLeft','0px');
	$('#list_carousel .next').hide();
	$('#list_carousel .prev').hide();
	$('#list_carousel #boxdown').hide();
}
$('#list_carousel .next').click(function(){
	if(Math.round($('.list_carousel').width()/c_liwidth)<c_toplamLi){
		if(c_liIndex > c_toplamLi-1){
			c_liIndex=0;
		}
		c_liIndex++;
		c_clone=$('.list_carousel ul li').eq(0).clone();
		$('.list_carousel ul').append(c_clone);
		$('.list_carousel ul li').eq(0).remove();
		$('.list_carousel ul').css('marginLeft','0px');
		$('.list_carousel ul').animate({marginLeft:"-"+c_liwidth+"px"},300);
	}
	return false;
})
$('#list_carousel .prev').click(function(){
	
		if(c_liIndex==1){
			c_liIndex=c_toplamLi+1;
		}
		c_liIndex--;
		c_clone=$('.list_carousel ul li:last').clone();	
		$('.list_carousel ul').prepend(c_clone);	
		if(c_toplamLi==1){
			$('.list_carousel ul').append(c_clone);
			$('.list_carousel ul li:last').remove();
			$('.list_carousel ul').css('marginLeft','-'+c_liwidth+'px');
			$('.list_carousel ul').animate({marginLeft:"0px"},300);
		}else{
			$('.list_carousel ul li:last').remove();
			$('.list_carousel ul').css('marginLeft','-'+(c_liwidth*2)+'px');
			$('.list_carousel ul').animate({marginLeft:"-"+c_liwidth+"px"},300);
		}

	return false;
})
$.list_carouselFunc=function(){
	$('#list_carousel .next').click();
}
var c_don=setInterval('$.list_carouselFunc()',c_sure);
$('#list_carousel').hover(function(){
	clearInterval(c_don);
},function(){
	if(!slideStart){
		c_don=setInterval('$.list_carouselFunc()',c_sure);
	}
})
var slideStart=false;

$('#list_carousel #boxdown').click(function(){
	if (slideStart) {
		$('.list_carousel').css('height',c_liheight+'px');
		$('.list_carousel ul').css('width',c_toplamWidth+'px');
		$('.list_carousel ul').css('marginLeft','-'+c_liwidth+'px');
		$('#list_carousel .next').show();
		$('#list_carousel .prev').show();
		$('#list_carousel #boxdown').removeClass('boxup');
		$('#list_carousel #boxdown').addClass('boxdown');
		slideStart=false;
	} else {
		var toplamHeight=(Math.ceil((c_toplamLi*c_liwidth)/$('.list_carousel').width()))*c_liheight;
		$('.list_carousel').css('height',toplamHeight+'px');
		$('.list_carousel ul').css('marginLeft','0px');
		$('.list_carousel ul').css('width',$('.list_carousel').width()+'px');
		$('#list_carousel .next').hide();
		$('#list_carousel .prev').hide();
		clearInterval(c_don);
		$('#list_carousel #boxdown').removeClass('boxdown');
		$('#list_carousel #boxdown').addClass('boxup');
		slideStart=true;
	}
});

/*$(".list_carousel").swipe( {
	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	  if( direction=='right' ){
		$('.prev').click();
	  } 
	  if( direction=='left' ){
		$('.next').click();
	  } 
	},
	 threshold:50
  });
*/
/////////////////////////////////////resize
	$.openBoxResize= function(){
		if(slideStart){
				$('.list_carousel ul').css('width',$('.list_carousel').width()+'px');
				toplamHeight=(Math.ceil((c_toplamLi*c_liwidth)/$('.list_carousel').width()))*c_liheight;
				$('.list_carousel').css('height',toplamHeight+'px');
			}
		if(Math.round($('.list_carousel').width()/c_liwidth)>=c_toplamLi){
			$('.list_carousel ul').css('marginLeft','0px');
			$('#list_carousel .next').hide();
			$('#list_carousel .prev').hide();
			$('#list_carousel #boxdown').hide();
		}else{
			$('#list_carousel .next').show();
			$('#list_carousel .prev').show();
			$('#list_carousel #boxdown').show();
		}
	}
	$.list_carousel_resize=function(){
			$('#list_carousel').css('width','100%');
			$('.list_carousel').css('width','80%');
			$.openBoxResize();
	}
	$.blok_boy=function(){
		var genislik=$(window).width();
		  if(genislik>992){
			  var a=$("#okul_bilgi").height();
			  $("#okul_bilgi .col-md-12>div").css("height",a+"px");
			  $("#okul_bilgi .col-md-12>div .devami").addClass("buton_yer");
			  
			  var b=$("#ust_blok").height();
			   $("#ust_blok>div").css("height",b+"px");
			   $("#ust_blok>div .devami").addClass("buton_yer");
  
		  }
		  else{
			  $("#okul_bilgi .col-md-12>div").css("height","auto");
			  $("#okul_bilgi .col-md-12>div .devami").removeClass("buton_yer");
			  
			  $("#ust_blok>div").css("height","auto");
			  $("#ust_blok>div .devami").removeClass("buton_yer");
		  }
	}
	$.list_carousel_resize();
	$.blok_boy();
	$(window).resize(function(){			
		$.list_carousel_resize();
		$.blok_boy();
	});
	
	
		$('.pgwSlider').pgwSlider({
			maxHeight : 320,
			transitionEffect : 'sliding',
			displayControls : true,
			verticalCentering : true,
			adaptiveHeight : true,
			intervalDuration : 6000
			});
			
			/*$(".pgwSlider").swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			  if( direction=='right' ){
				$('.ps-prev').click();
			  } 
			  if( direction=='left' ){
				$('.ps-next').click();
			  } 
			},
			 threshold:50
			});*/
	
			$("#vlightbox1 table").after("<div id='responsive-table' class='table-responsive'></div>");
			$("#vlightbox1 table").appendTo("#responsive-table");

	
});