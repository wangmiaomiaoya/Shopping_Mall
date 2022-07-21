
$(function(){

    //默认选择的地址 显示在确认付款的地方
    $(".buy-footer-address .province").html($(".defaultAddr .province").html());
    $(".buy-footer-address .city").html($(".defaultAddr .province").html());
    $(".buy-footer-address .dist").html($(".defaultAddr .province").html());
    $(".buy-footer-address .street").html($(".defaultAddr .province").html());
    $(".buy-footer-address .buy-user").html($(".defaultAddr .buy-user").html());
    $(".buy-footer-address .buy-phone").html($(".defaultAddr .buy-phone").html());

    //选择地址 后显示在确认付款的地方
    $(".user-addresslist").click(function(){

            $(".buy-footer-address .province").html($(this).find(".province").html());
            $(".buy-footer-address .city").html($(this).find(".city").html());
            $(".buy-footer-address .dist").html($(this).find(".dist").html());
            $(".buy-footer-address .street").html($(this).find(".street").html());
            $(".buy-footer-address .buy-user").html($(this).find(".buy-user").html());
            $(".buy-footer-address .buy-phone").html($(this).find(".buy-phone").html());

    })



    //提交订单
    $("#J_Go").click(function(){

         //1.获得地址id
         var addressId=$("li.defaultAddr").find(":hidden").val();

        //2.获得选中的商品id
         var arr=$(".skuId");
         var skuIdStr="";
         arr.each(function(){
             skuIdStr+=$(this).val()+",";
         })
         skuIdStr=skuIdStr.substr(0,skuIdStr.length-1);

         //3. 获得订单金额
        var orderAmount= $("#J_ActualFee").html();
        //4.提交到服务器端处理
        $.get("http://localhost:8080/testShop/order/addOrder?addressId="+addressId+"&skuIdStr="+skuIdStr+"&orderAmount="+orderAmount,function(msg){

            //alert(msg);
            //跳转到付款页面
            location.href="http://localhost:8080/testShop/pay/alipayTradePagePay?orderId="+msg+"&orderAmount="+orderAmount;




        })



    })


    //省市区三级联动
    var province_arr=["安徽", "上海", "福建", "甘肃", "广东"];

    var  city_arr  = [
        [ "安庆市", "蚌埠市", "巢湖市" ] ,
        [ "上海市"] ,
        [ "福州市", "龙岩市", "南平市", "宁德市" ] ,
        [ "白银市", "定西市", "甘南藏族自治州市"] ,
        [ "潮州市", "佛山市"]
    ];

    var  area_arr = [
        [
            [ "安庆市", "怀宁县", "潜山县", "宿松县", "太湖县", "桐城市"] ,
            [ "蚌埠市", "固镇县", "怀远县", "五河县"] ,
            [ "巢湖市", "含山县", "和县", "庐江县", "无为县"]
        ],
        [
            [ "浦东区", "长宁区","宝山区","黄浦区"]
        ],
        [
            [ "长乐市", "福清市", "福州市", "连江县"] ,
            [ "龙岩市", "长汀县", "连城县"] ,
            [ "光泽县", "建阳市", "建瓯市", "南平市", "浦城县", "邵武市"] ,
            [ "古田县", "宁德市", "屏南县", "寿宁县"]
        ],
        [
            [ "白银市", "会宁县", "景泰县", "靖远县"] ,
            [ "定西县", "临洮县", "陇西县", "通渭县", "渭源县", "漳县", "岷县"] ,
            [ "迭部县", "合作市", "临潭县", "碌曲县", "玛曲县", "夏河县", "舟曲县", "卓尼县"]
        ],
        [
            ["潮安县", "潮州市", "饶平县"] ,
            ["佛山市"]
        ]

    ];

    $("select[name='province']").append("<option value='-1'>请选择</option>")


    //加载所有的省
    $.each(province_arr,function(index,value){

        //创建一个option
        var option=$("<option></option>");
        option.val(index);
        option.html(value);

        //添加到select中
        $("select[name='province']").append(option);


    })





    $("select[name='province']").change(function(){

        //获得省id
        var pid=$(this).val();

        //找到省对应的市
        var citys=city_arr[pid];

        //先清除之前的市
        $("select[name='city']").empty();
        $("select[name='city']").append("<option value='-1'>请选择</option>")

        //添加到select中
        $.each(citys,function(index,value){

                var option=$("<option></option>");
                option.val(index);
                option.html(value);

                $("select[name='city']").append(option);

        })


    })




    $("select[name='city']").change(function(){

        //获得选中的市id
        var cid=$(this).val();

        //获得选中的省id
        var pid=$("select[name='province']").val();

        //清除之前的区县
        $("select[name='town']").empty();
        $("select[name='town']").append("<option value='-1'>请选择</option>")


        //根据省id和市id获得对应的区县

        var areas=area_arr[pid][cid];

        $.each(areas,function(index,value){

            var option=$("<option></option>");
            option.val(index);
            option.html(value);

            $("select[name='town']").append(option);


        })

    })





})