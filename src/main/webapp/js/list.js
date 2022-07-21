// JavaScript Document

//商品规格选择
$(function() {

	//页面加载完毕 判断一下默认的商品属性对应的sku信息
    chooseProperties();

	$(".theme-options").each(function() {
		var i = $(this);
		var p = i.find("ul>li");
		p.click(function() {
			if (!!$(this).hasClass("selected")) {
				$(this).removeClass("selected");

			} else {
				$(this).addClass("selected").siblings("li").removeClass("selected");

				// 选择不同属性以后 获得选择的所有属性的信息得到对应的sku商品
                chooseProperties();
			}
		})
	})

})

function chooseProperties()
{
    var arr=$(".theme-options li.selected");

    var sku_properties="";

    arr.each(function(){

        var attr_name_value_id=$(this).next().val();

        sku_properties+=attr_name_value_id+",";
    })

    // 2001:3001,2002:3013,2003:3020
    sku_properties=sku_properties.substr(0,sku_properties.length-1);

    //获得goods_id
    var goodsId=$("#goodsId").val();

    //通过ajax将sku_properties和goodsId传到服务器端端，返回查询到的sku商品信息
    $.getJSON("http://localhost:8080/testShop/goods/getSkuGoods?sku_properties="+sku_properties+"&goodsId="+goodsId,function(obj){

        //返回的是sku商品信息
        $(".sys_item_price").html(obj.price);

        $(".stock").html(obj.num);

        $("#skuId").val(obj.skuId);


    })

}


//点击添加商品到购物车时

$(function(){

	$("#LikBasket").click(function(){
		//1.获得skuId
        var skuId=$("#skuId").val();
		//2.获得选择的数量
		var buyNum=$("#text_box").val();
		//3.传到服务器端
		$.get("http://localhost:8080/testShop/cart/addGoodsToCart?skuId="+skuId+"&buyNum="+buyNum,function(msg){

			if(msg!=-1) {
                //更新购物车数量的显示
                $("#J_MiniCartNum").html(msg);

                alert("添加成功");
            }
            else
            	alert("没有登录，请先登录");

		})



	})

})





//弹出规格选择
$(document).ready(function() {
	var $ww = $(window).width();
	if ($ww <1025) {
		$('.theme-login').click(function() {
			$(document.body).css("position", "fixed");
			$('.theme-popover-mask').show();
			$('.theme-popover').slideDown(200);

		})

		$('.theme-poptit .close,.btn-op .close').click(function() {
			$(document.body).css("position", "static");
			//					滚动条复位
			$('.theme-signin-left').scrollTop(0);

			$('.theme-popover-mask').hide();
			$('.theme-popover').slideUp(200);
		})

	}
})

//导航固定
$(document).ready(function() {
	var $ww = $(window).width();
	var dv = $('ul.am-tabs-nav.am-nav.am-nav-tabs'),
		st;

	if ($ww < 623) {

				var tp =$ww+363;
				$(window).scroll(function() {
					st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
					if (st >= tp) {
						if (dv.css('position') != 'fixed') dv.css({
							'position': 'fixed',
							top: 53,
							'z-index': 1000009
						});

					} else if (dv.css('position') != 'static') dv.css({
						'position': 'static'
					});
				});
				//滚动条复位（需要减去固定导航的高度）

				$('.introduceMain ul li').click(function() {
					sts = tp;
					$(document).scrollTop(sts);
				});
       } else {

		dv.attr('otop', dv.offset().top); //存储原来的距离顶部的距离
		var tp = parseInt(dv.attr('otop'))+36;
		$(window).scroll(function() {
			st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
			if (st >= tp) {
             
					if (dv.css('position') != 'fixed') dv.css({
						'position': 'fixed',
						top: 0,
						'z-index': 998
					});

				//滚动条复位	
				$('.introduceMain ul li').click(function() {
					sts = tp-35;
					$(document).scrollTop(sts);
				});

			} else if (dv.css('position') != 'static') dv.css({
				'position': 'static'
			});
		});



	}
});



$(document).ready(function() {
	//优惠券
	$(".hot span").click(function() {
		$(".shopPromotion.gold .coupon").toggle();
	})




	//获得文本框对象
	var t = $("#text_box");
	//初始化数量为1,并失效减
	$('#min').attr('disabled', true);
	//数量增加操作
	$("#add").click(function() {
			t.val(parseInt(t.val()) + 1)
			if (parseInt(t.val()) != 1) {
				$('#min').attr('disabled', false);
			}

		})
		//数量减少操作
	$("#min").click(function() {
		t.val(parseInt(t.val()) - 1);
		if (parseInt(t.val()) == 1) {
			$('#min').attr('disabled', true);
		}

	})

})