$(function () {
    //动态生成商品列表
    $.get("./api/commods").then((res) => {
        let data = res.data;
        var str = ``;
        for (let i = 0; i < 6; i++) {
            str += `<div>
            <a href="./commodity.html?id=${data[i].c_id}" class="commodlink">
                <img src="${JSON.parse(data[i].c_imgs)[0]}">
            </a>
            <a href="./commodity.html?id=${data[i].c_id}" class="commodlink">${data[i].c_name}</a>
            <span>${data[i].c_money}</span>
        </div>`;
        }
        $(".ocjbox1 .box2").html(str);
    })

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

    //首页大轮播图

    var bigimgindex = 0;
    function bigimganimate() {
        bigimgindex++;
        if (bigimgindex >= 7) {
            bigimgindex = 0;
        }
        $(".bigimg>div").eq(bigimgindex).animate({ opacity: 1 }, 500).siblings("div").animate({ opacity: 0 }, 500);
        $(".bigimg>ol li").eq(bigimgindex).addClass("create").siblings().removeClass("create");
    }
    var timer4 = setInterval(() => {
        bigimganimate();
    }, 5000);
    $(".bigimg").on("mouseenter", function () {
        clearInterval(timer4);
    }).on("mouseleave", function () {
        timer4 = setInterval(() => {
            bigimganimate();
        }, 5000);
    })
    $(".bigimg ol li").on("click", function () {
        let index = $(this).index();
        bigimgindex = index - 1;
        bigimganimate();
    })

    //商品轮播图

    var ocjbox1index = 0;
    function ocjbox1animate() {
        ocjbox1index++;
        if (ocjbox1index >= 5) {
            ocjbox1index = 0;
        }
        $(".ocjbox1 .box1 .inner img").eq(ocjbox1index).animate({ opacity: 1 }, 500).siblings("img").animate({ opacity: 0 }, 500);
        $(".ocjbox1 .box1 .inner ol li").eq(ocjbox1index).addClass('create').siblings().removeClass("create");
        $(".ocjbox1 .box1 ul li").eq(ocjbox1index).animate({ opacity: 1 }, 500).siblings().animate({ opacity: 0 }, 500);
    }
    var timer5 = setInterval(() => {
        ocjbox1animate();
    }, 3000);
    $(".ocjbox1 .box1 .inner").on("mouseenter", function () {
        clearInterval(timer5);
    }).on("mouseleave", function () {
        timer5 = setInterval(() => {
            ocjbox1animate();
        }, 3000);
    })
    $(".ocjbox1 .box1 .inner ol li").on("click", function () {
        let index = $(this).index();
        ocjbox1index = index - 1;
        ocjbox1animate();
    })


    //购物车刷新和删除
    function getcart() {
        $.ajax({
            url: "./api/getcart",
            type: "post"
        }).then((res) => {
            if (res.status==1&&res.data.length >= 1) {
                let str = `<ul>`
                res.data.forEach(el => {
                    str += `<li data-s_id=${el.s_id}>
                    <div>
                        <a href='javascript:;'>
                            <img src='${el.s_img}'>
                        </a>
                        <div>
                            <a href='./commodity.html?id=${el.c_id}'>${el.s_name}</a>
                            <p>￥<span>${el.s_money}</span><b>×${el.s_num}</b></p>
                        </div>
                        <span class='del'>删除</span>
                    </div>
                </li>`;
                })
                str += `</ul><span class='gocart'>去购物车结算</span>`;
                $(".g-settleup-content").html(str);
                $(".num").text(res.data.length);
            }else{
                $(".g-settleup-content").html("<p>购物车中还没有商品，赶紧选购吧！</p>");
                $(".num").text(0);
            }
        })
    }
    getcart();
    $(".g-settleup-content").on("click", function (evt) {
        if (evt.target.className == "del") {
            let obj = {
                s_id:$(evt.target).parents("li").data("s_id")
            }
            
            $.ajax({
                url:"./api/delcart",
                type:"post",
                data:obj
            }).then((res)=>{
                layer.msg(res.msg);
                getcart();
            })
        }
        if (evt.target.className == "gocart") {
            window.location.assign("./cart.html");
        }
    })

    $(".cart_main").on("mouseenter", function () {
        $(".cart").addClass("hover");
        $(".cartbox").addClass("hover");
    }).on("mouseleave", function () {
        $(".cart").removeClass("hover");
        $(".cartbox").removeClass("hover");
    })

    $(".go-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        })
    })

    $(".leftnav .nav1 li").on("mouseenter", function () {
        var index = $(this).index();
        $(this).find(".libox").addClass("create").parent().siblings().find(".libox").removeClass("create");
        $(".nav3 li").eq(index).addClass("create").siblings().removeClass("create");
    })
    $(".leftnav").on("mouseleave", function () {
        $(".nav1 li").find(".libox").removeClass("create");
        $(".nav3 li").removeClass("create");
    })

    $(".commodlink").on("click", function () {
        $.cookie("commodId", $(this).parent().attr("id"), { expires: 999 });
        window.location.assign("./commodity.html");
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
                        getcart();
                    }
                })
            })
        }
    })
})