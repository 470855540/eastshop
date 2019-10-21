$(function () {
    $.idcode.setCode();

    var arr = JSON.parse($.cookie("myuser") || '{}');
    $("form").eq(1).find("[name=uname]").val(arr.utel);
    $("form").eq(1).find("[name=upwd]").val(arr.upwd);



    $(".loginbox .inner ul").append($(".loginbox .inner ul li:first").clone(true));

    var imgindex = 0;
    function imganimate() {
        imgindex++;
        if (imgindex >= 4) {
            imgindex = 1;
            $(".loginbox .inner ul").css("left", 0);
        }
        $(".loginbox .inner ul").animate({ left: -imgindex * 450 }, 500);
        var olindex = imgindex;
        if (olindex == 3) {
            olindex = 0;
        }
        $(".loginbox ol li").eq(olindex).addClass("create").siblings().removeClass("create");
    }
    var timer = setInterval(() => {
        imganimate();
    }, 2000);



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

    $("form").eq(1).on("submit", function () {
        var IsBy = $.idcode.validateCode();
        if (IsBy) {
            var obj = {
                utel: $("form")[1].uname.value,
                upwd: $("form")[1].upwd.value
            }
            $.ajax({
                url: "./api/login",
                type: "post",
                data: obj
            }).then((res) => {
                if (res.status==2) {
                    if ($("form").eq(1).find("[type=checkbox]").val()) {
                        $.cookie("myuser", JSON.stringify(obj), { expires: 10 });
                    }
                    layer.confirm(res.msg,{btn:["去主页浏览","切换账号"]},()=>{
                        window.location.href = "./index.html";
                    });
                    return false;
                } else {
                    layer.msg(res.msg);
                }
            })
        }else{
            layer.msg("验证码错误");
        }
        return false;
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