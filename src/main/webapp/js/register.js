
$(function(){
    //给用户名做ajax判断
    $("#uname").blur(function(){

        //1.获得用户名
        var uname=$(this).val();
        //2.通过ajax传到服务器端判断用户是否存在
        $.get("http://localhost:8080/testShop/users/isExistsUname?uname="+uname,function(msg){

            //3.处理结果
            if(msg=="1") {
                $("#msg_span").html("该用户已存在");
                $("#submit").attr("disabled",true);
            }
            else {
                $("#msg_span").html("可以注册");
                $("#submit").attr("disabled",false);
            }



        })


    })

})