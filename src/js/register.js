$(function () {

    var yzm = -1;

    function txtanimate() {
        $("#textanimate").css("top", 0);
        $("#textanimate").animate({ top: -29 }, 500);
        $("#textanimate").append($("#textanimate").find("div").first().clone(true));
        $("#textanimate").find("div").first().remove();
    }
    var timer2 = setInterval(() => {
        txtanimate();
    }, 2000);
    var gotopindex = 0;
    function gotopanimate() {
        gotopindex++;
        if (gotopindex >= 4) {
            gotopindex = 0;
        }
        $(".gotop .inner ul li").eq(gotopindex).animate({ opacity: 1 }).siblings().animate({ opacity: 0 });
        $(".gotop ol li").eq(gotopindex).addClass("create").siblings().removeClass("create");
    }
    var timer3 = setInterval(() => {
        gotopanimate();
    }, 2000);
    $(".gotop .inner li").on("mouseenter", function () {
        clearInterval(timer3);
    }).on("mouseleave", function () {
        timer3 = setInterval(() => {
            gotopanimate();
        }, 2000);
    })
    $(".gotop ol").on("mouseenter", function () {
        clearInterval(timer3);
    }).on("mouseleave", function () {
        timer3 = setInterval(() => {
            gotopanimate();
        }, 2000);
    })
    $(".gotop ol li").on("click", function () {
        let index = $(this).index();
        gotopindex = index - 1;
        gotopanimate();
    })


    //添加验证项
    $.validator.addMethod("checkName", (value, element, param) => {
        var reg = /^[\u4e00-\u9fa5]{1,}$/;
        return reg.test(value);
    })

    $.validator.addMethod("checktel", (value, element, param) => {
        var reg = /^\d{11}$/;
        return reg.test(value);
    })


    //手机号注册信息验证
    $("form").eq(1).validate({
        rules: {
            utel: {
                required: true,
                checktel: true
            },
            upwd: {
                required: true,
                rangelength: [6, 16]
            },
            upwd2: {
                equalTo: "#upwd"
            }
        },
        messages: {
            utel: {
                required: "手机号必填！",
                checktel: "请输入11位手机号码"
            },
            upwd: {
                required: "密码必填！",
                rangelength: "密码长度不合法！"
            },
            upwd2: {
                equalTo: "两次密码不一致"
            }
        },
        submitHandler() {
            //注册

            $("form.create .yzm")
            if ($(".yzm").eq(0).siblings("input").val() == yzm && yzm != -1) {
                
                var obj = {
                    utel: $("form")[1].utel.value,
                    upwd: $("form")[1].upwd.value,
                }
                $.ajax({
                    url: "./api/reg1",
                    data: obj,
                    type: "post"
                }).then((res) => {
                    if (res.status == 1) {
                        layer.confirm("注册成功！是否前往登录？",{btn:["是","否"]},()=>{
                            window.location.href = "./login.html";
                        });
                    }else{
                        layer.msg("手机号已注册");
                        return false;
                    }
                })
            }
            return false;
        }
    })

    //电视注册信息验证
    $("form").eq(2).validate({
        rules: {
            uname: {
                required: true,
                checkName: true
            },
            utel: {
                required: true,
                checktel: true
            },
            upwd: {
                required: true,
                rangelength: [6, 16]
            },
            upwd2: {
                equalTo: "#upwd2"
            }
        },
        messages: {
            uname: {
                required: "姓名必填！",
                checkName: "请输入中文姓名"
            },
            utel: {
                required: "手机号必填！",
                checktel: "请输入11位手机号码"
            },
            upwd: {
                required: "密码必填！",
                rangelength: "密码长度不合法！"
            },
            upwd2: {
                equalTo: "两次密码不一致"
            }
        },
        submitHandler() {
            //注册
            
            if ($(".yzm").eq(1).siblings("input").val() == yzm && yzm != -1) {
                var obj = {
                    uname: $("form")[2].uname.value,
                    utel: $("form")[2].utel.value,
                    upwd: $("form")[2].upwd.value,
                }
                $.ajax({
                    url: "./api/reg2",
                    data: obj,
                    type: "post"
                }).then((res) => {
                    if (res.status == 1) {
                        // if (confirm("注册成功！是否前往登录？")) {
                        //     window.location.assign("./login.html");
                        // }

                        layer.confirm("注册成功！是否前往登录？",{btn:["是","否"]},()=>{
                            window.location.assign("./login.html");
                        })
                    }else{
                        layer.msg("手机号已注册");
                        return false;
                    }
                })
            }
            return false;
        }
    })


    //注册切换
    $(".regbox .nav").find("div").on("click", function () {
        var index = $(this).index();
        $(this).addClass("create").siblings("div").removeClass("create");
        $(".regtxt>div").eq(index).show().siblings().hide();
        $("form").removeClass("create").eq(index + 1).addClass("create");
    })

    //密码强度
    $("form").find("[name=upwd]").on("input", function () {
        if ($(this).val().length >= 6 && $(this).val().length < 10) {
            $(".pw-bar-on").css("width", 60);
        } else if ($(this).val().length >= 10 && $(this).val().length < 13) {
            $(".pw-bar-on").css("width", 120);
        } else if ($(this).val().length >= 13 && $(this).val().length <= 16) {
            $(".pw-bar-on").css("width", 179);
        } else {
            $(".pw-bar-on").css("width", 0);
        }
    })

    //获取验证码
    $(".yzm").on("click", function () {
        yzm = parseInt(Math.random() * 10000);
        alert("验证码为：" + yzm);
    })


    $(".go-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        })
    })

    $.ajax({
        url:"./api/getuser",
        type:"post"
    }).then((res)=>{
        if(res.data!=undefined&&res.data!=null){
            $(".inlogin").find("a").text(res.data);
            $(".nologin").hide();
            $(".inlogin").show().on("mouseenter",function(){
                $(this).find("a").addClass("hover");
                $(this).find("div").show();
            }).on("mouseleave",function(){
                $(this).find("a").removeClass("hover");
                $(this).find("div").hide();
            })
            $(".inlogin button").on("click",function(){
                $.get("./api/quit").then((res)=>{
                    layer.msg(res.msg);
                    if(res.status==1){
                        $(".nologin").show();
                        $(".inlogin").hide();
                    }
                })
            })
        }
    })
})