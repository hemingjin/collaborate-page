$(function(){
     $('.section').css({'height': $(window).height()});
     $.scrollify({
        section: '.section',
        after: function(){
            console.log(1111);
        }
     });

    //提交事件
    $('#confirm').on('click', function(){
        var username = $.trim($('#username').val());
        var tel = $.trim($('#tel').val());
        var email = $.trim($('#email').val());
        if(username == ''){
            console.log( "用户名不能为空");
            return;
        }else if(tel == ""){
            console.log("tel不能为空");
            return;
        }else if(email == ""){
            console.log("email不能为空");
            return;
        }else if(!validators.isMobile(tel)){
            console.log('手机号码格式不正确');
            return;
        }else if(!validators.isEmail(email)){
            console.log('邮箱地址格式不正确');
            return;
        }else{
            //$('#addUser').submit();
            $.ajax({
                type: 'post',
                url: "/user/add",
                dataType: "json",
                data: $('#addUser').serialize(),
                success: function (result) {
                    console.log(result);//打印服务端返回的数据(调试用)
                    if (result.code == 200) {
                        alert("SUCCESS");
                        window.location.reload();
                    }
                },
                error: function() {
                    alert("异常！");
                }
            })
        }
    });

    $('#list').on('click', function(){
        $.ajax({
            type: 'get',
            url: '/user',
            error: function(err){
                console.log(err)
            },
            success: function(res){
                console.log(res);
                $('#test').empty();
                tdItem(res);
            }
        })
    })
});

//validators
var validators = {
    //邮箱格式验证  return boolean
    isEmail: function(str){
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return reg.test(str);
    },
    //手机号格式验证,13X xxxxxxxx, 15x xxxxxxxx ...  return boolean
    isMobile: function(str){
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        return reg.test(str);
    },
    //电话号码
    isTel: function(str){
        var reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
        return reg.test(str);
    }
}

function tdItem(data){
    var item = '<tr><td>id</id><td>用户名</id><td>联系电话</id><td>邮箱</id></tr>'
    for(var i = 0; i < data.length; i++){
        item += '<tr><td>'+data[i].id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].tel+'</td><td>'+data[i].email+'</td></tr>'
    }
    $('#test').append(item);
}