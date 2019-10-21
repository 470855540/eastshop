$(function () {
    function showcommod(data) {
        let str = `<h1 data-c_id=${data.c_id}>
                <span></span>
                ${data.c_name}
            </h1>`;
        $(".pv_shop_detail_title").html(str);
        let strinner = ``;
        for (let i = 1; i < JSON.parse(data.c_imgs).length; i++) {
            strinner += `<li><img src="${JSON.parse(data.c_imgs)[i]}"></li>`;
        }
        str = `<div class="bigimg">
                    <img src="${JSON.parse(data.c_imgs)[0]}" alt="">
                    <div class="smallbox"></div>
                </div>
                <div class="smalllist">
                    <span class="left"></span>
                    <div class="box">
                        <ul class="smallimg">
                            <li class="create"><img src="${JSON.parse(data.c_imgs)[0]}"></li>
                            ${strinner}
                        </ul>
                    </div>
                    <span class="right"></span>
                </div>
                <div class="bigimgbox">
                    <img src="${JSON.parse(data.c_imgs)[0]}">
                </div>
                <div class="tab">
                    <span>查看图片</span>
                </div>
                <div class="fenxiang">
                    <div class="left">
                        分享到
                        <a href="javascript:;"></a>
                        <a href="javascript:;"></a>
                    </div>
                    <div class="right">
                        <a href="javascript:;">
                            <span>收藏</span>
                        </a>
                    </div>
                </div>`;
        $(".pv_shop_detail_info .left").html(str);
        str = `<dl>
                            <dt>商品编号</dt>
                            <dd>
                                ${data.c_id}
                                <div class="com">
                                    <span>计算器</span>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>商品价格</dt>
                            <dd>
                                <span class="cost">${data.c_money}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>赠 　 品</dt>
                            <dd>
                                <span>${data.c_gift}</span>
                                <span></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>配 　 送</dt>
                            <dd>
                                <div>
                                    <em>请选择配送地区</em>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>数 　 量</dt>
                            <dd>
                                <span>
                                    <button class="subnum">-</button>
                                    <input type="text" value="1" class="shopnum">
                                    <button class="addnum">+</button>
                                </span>
                            </dd>
                        </dl>
                        <div class="buy_box">
                            <span class="buy">立即购买</span>
                            <span class="addcart">加入购物车</span>
                            <span class="installment">免息分期付款</span>
                            <div class="buy_box_code">
                                <span>
                                    <a href="javascript:;">APP首购最高减200元<br>（以下单为准）</a>
                                </span>
                                <img src="./images/15324988A.jpg">
                            </div>
                        </div>
                        <div class="dtfunc_box">
                            <div>
                                <span><img src="./images/dtfunc_icon1.png"></span>
                                <a href="javascript:;">正品保障</a>
                                <span><img src="./images/dtfunc_icon2.png"></span>
                                <a href="javascript:;">东东客服</a>
                                <span><img src="./images/icon_wuliu.png"></span>
                                <a href="javascript:;">指定配送公司配送</a>
                            </div>
                            <div>
                                <a href="javascript:;">
                                    <img src="./images/dtfunc_icon5.png">
                                    <span>提货券类商品，在提货券有效期内，未兑现成实物，可以退换货</span>
                                </a>
                            </div>
                            <div>
                                <a href="javascript:;">
                                    <img src="./images/icon_xize2.png">
                                    <span>厨具、生活家居、家装家具、办公用品类商品退换货细则</span>
                                </a>
                            </div>
                        </div>`;
        $(".pv_shop_detail_info .middle").html(str);
        $("title").text(data.c_name);
    }

    function onhtml() {
        //调整放大镜小区域大小
        $(".smallbox").css({
            width:($(".bigimg").width()/$(".bigimgbox img").width())*$(".bigimgbox").width(),
            height:($(".bigimg").height()/$(".bigimgbox img").height())*$(".bigimgbox").height()
        })
        //放大镜图片移动比例
        let ratio = $(".bigimgbox").width()/$(".smallbox").width();
        $(".cart_main").on("mouseenter", function () {
            $(".cart").addClass("hover");
            $(".cartbox").addClass("hover");
        }).on("mouseleave", function () {
            $(".cart").removeClass("hover");
            $(".cartbox").removeClass("hover");
        })

        $(".smalllist .left").on("click", () => {
            $(".smalllist .box ul").stop().animate({ left: 0 }, 500);
        })
        $(".smalllist .right").on("click", () => {
            if ($(".smallimg li").length > 5)
                $(".smalllist .box ul").stop().animate({ left: -280 }, 500);
        })
        $(".smalllist .box ul li").on("mouseenter", function () {
            $(".bigimg img").attr("src", $(this).find("img").attr("src"))
        })

        $(".bigimg").on("mouseenter", function () {
            $(".smallbox").show();
            $(".bigimgbox").show().find("img").attr("src", $(this).find("img").attr("src"));
            $(document).on("mousemove",boxmove);
        }).on("mouseleave", function () {
            $(".smallbox").hide();
            $(".bigimgbox").hide();
        })

        //放大镜移动函数
        function boxmove(e){
            let disX = e.pageX-$(".bigimg").offset().left-$(".smallbox").width()/2;
            let disY = e.pageY-$(".bigimg").offset().top-$(".smallbox").height()/2;
            if(disX<=0){
                disX=0;
            }
            if(disY<=0){
                disY=0;
            }
            if(disX>=$(".bigimg").width()-$(".smallbox").width()){
                disX=$(".bigimg").width()-$(".smallbox").width();
            }
            if(disY>=$(".bigimg").height()-$(".smallbox").height()){
                disY=$(".bigimg").height()-$(".smallbox").height();
            }
            $(".smallbox").css({
                left:disX,
                top:disY
            })
            $(".bigimgbox img").css({
                left:-(disX*ratio),
                top:-(disY*ratio)
            })
        }

        var imgsrc = $(".smallimg li").eq(0).find("img").attr("src");
        //飞入购物车特效
        $('.addcart').shoping({
            endElement: ".cart_main", //结束元素节点，即页面上购物车位置
            iconCSS: "width:50px;height:50px;border:none;", //飞过的图片样式
            iconImg: imgsrc, //飞过的图片信息
            endFunction: function (element) { //动画结束后的回调
                var obj = {
                    c_id: $("h1").data("c_id"),
                    s_name: $(".pv_shop_detail_title h1").text().trim(),
                    s_money: $(".cost").text().match(/\d+(,)*\d+$/)[0],
                    s_num: $(".shopnum").val().trim(),
                    s_img: $(".smallimg li").eq(0).find("img").attr("src")
                }
                $.ajax({
                    url: "./api/cart",
                    type: "post",
                    data: obj
                }).then((res) => {
                    layer.msg(res.msg)
                    getcart();
                })


                return false;
            }
        })

        //购物数量选择
        $(".addnum").on("click", function () {
            var tmpnum = $(this).siblings("input").val();
            if (tmpnum == 99) {
                return;
            } else {
                $(this).siblings("input").val(++tmpnum);
            }
        })
        $(".subnum").on("click", function () {
            var tmpnum = $(this).siblings("input").val();
            if (tmpnum == 1) {
                return;
            } else {
                $(this).siblings("input").val(--tmpnum);
            }
        })
        $(".shopnum").on("input", function () {
            if ($(this).val() > 99) {
                $(this).val(99);
            } else if ($(this).val() < 1) {
                $(this).val(1);
            } else if (isNaN($(this).val())) {
                $(this).val(1);
            }
        })
    }
    //获取详情页数据
    function getcommods() {
        let path = location.search.split("?")[1].split("=")[1];
        $.get("./api/commod/" + path).then((res) => {
            let data = res.data;

            showcommod(data);
            onhtml();
        })
    }
    getcommods();

    //文字轮播图
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
                s_id: $(evt.target).parents("li").data("s_id")
            }

            $.ajax({
                url: "./api/delcart",
                type: "post",
                data: obj
            }).then((res) => {
                layer.msg(res.msg);
                getcart();
            })
        }
        if (evt.target.className == "gocart") {
            window.location.assign("./cart.html");
        }
    })

    $(".details ul").find("li").on("click", function () {
        let index = $(this).index();
        $(".details ol").find("li").eq(index).show().siblings().hide();
        $(this).addClass("create").siblings().removeClass("create");
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
                        getcart();
                    }
                })
            })
        }
    })
})