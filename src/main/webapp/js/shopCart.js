$(function(){

    //点击+ 号  添加购物车商品数量
    $(".add").click(function(){

        var skuId=$(this).parents("ul").find(":checkbox").val();

        var obj=$(this);

        $.get("http://localhost:8080/testShop/cart/addGoodsToCart?skuId="+skuId+"&buyNum=1",function(msg){

            //数据库中购物车的商品数量更改后 页面上也更改
            //obj.prev().val( obj.prev().val()+1);
            //当前商品购买总价增加
            var price=obj.parents("ul").find(".J_Price").html();
            var num=obj.prev().val();
            obj.parents("ul").find(".J_ItemSum").html(price*num+".0");

        })

    })


    //点击购物车中的删除按钮
    $(".delete").click(function(){

        if(confirm("确定要删除吗")) {

            var skuId = $(this).parents("ul").find(":checkbox").val();

            var obj = $(this);

            $.get("http://localhost:8080/testShop/cart/deleteGoodsFromCart?skuId=" + skuId, function (msg) {

                //删除成功
                if (msg >= 0) {
                    //将页面上的内容也要移除
                    obj.parents("ul").remove();
                    //更新购物车总数
                    $("#J_MiniCartNum").html(msg);
                }
                else if(msg==0)
                {
                    //将页面上的内容也要移除
                    obj.parents("ul").remove();
                    //更新购物车总数
                    $("#J_MiniCartNum").html(msg);



                }
                else if (msg == -1) {
                    alert("未登录，请先登陆");
                }


            })
        }

    })


    //点击提交
    $("#J_Go").click(function(){

        //1.获得选中的skuId
       var arr=$(".check:checked");

       var skuIdStr="";

       arr.each(function(){

           var skuId= $(this).val();

           skuIdStr+=skuId+",";

       })

        // skuIdStr 内存储格式 比如 :4001,4003,4005
       skuIdStr= skuIdStr.substr(0,skuIdStr.length-1);

        //2.将选中的skuId传到控制器 处理
        location.href="http://localhost:8080/testShop/order/submitOrder?skuIdStr="+skuIdStr;


    })

    //选择商品后  计算总价
    var totalPrice=0;
    $(".check").click(function(){


        if($(this).prop("checked")==true)
        {
            totalPrice=totalPrice+parseFloat($(this).parents("ul").find(".J_ItemSum").html());
        }
        else
        {
            totalPrice=totalPrice-parseFloat($(this).parents("ul").find(".J_ItemSum").html());
        }

        $("#J_Total").html(totalPrice+".0")


    })



})