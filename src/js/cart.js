$(function () {
    let heights = 0;

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


    function getcommod() {
        $.ajax({
            url: "./api/getcart",
            type: "post",
        }).then((res) => {
            if (res.status == 1 && res.data.length != 0) {
                $("#num").text(res.data.length);
                $(".pv_cart_empty").hide();
                $(".incart").show();
                var str = ``;
                res.data.forEach(el => {
                    str += `<div data-s_id=${el.s_id}>
                <div class="cols1">
                    <div>
                        <input type="checkbox" name="cart_seq" value="1" class="input_normal">
                    </div>
                    <div class="pic">
                        <a href="javascript:;">
                            <img src="${el.s_img}" alt="">
                        </a>
                    </div>
                    <div class="detail">
                        <p>
                            <em></em>
                            <a href="./commodity.html?id=${el.c_id}">${el.s_name}</a>
                        </p>
                    </div>
                </div>
                <div class="cols2">
                    <em>积</em>
                    <span>${(Number(el.s_money.replace(",", "") * el.s_num) / 100).toFixed(2)}</span>
                </div>
                <div class="cols3">
                    ￥<span>${el.s_money}</span>
                </div>
                <div class="cols4">
                    <div class="amout">
                        <span class='combtn'></span>
                        <input type="text" value="${el.s_num}" class='intnum'>
                        <span class='addbtn'></span>
                    </div>
                </div>
                <div class="cols5">
                    ￥<span>${(Number(el.s_money.replace(",", "")) * el.s_num).toFixed(1)}</span>
                </div>
                <div class="cols6">
                    <span></span>
                    <div>
                        <span class='delete'>删除</span>
                    </div>
                </div>
            </div>`
                })
                $(".left_block_list").html(str);
                heights = $(".pv_cart_balance").offset().top;
                isAllCheck();
            } else if (res.status == -1) {
                layer.confirm("请登录后查看购物车", { btn: ["去登陆", "去首页"] }, () => {
                    window.location.assign("./login.html");
                }, () => {
                    window.location.assign("./index.html");
                })
            } else {
                $(".pv_cart_empty").show();
                $(".incart").hide();
            }
        })
    }
    getcommod();
    $(".left_block_list").on("click", function (evt) {
        if (evt.target.className == "combtn") {
            var tmpnum = $(evt.target).siblings("input").val();
            if (tmpnum == 1) {
                return;
            }
            $(evt.target).siblings("input").val(--tmpnum);
            let tmpid = $(evt.target).parents(".cols4").parent().data("s_id");
            $.ajax({
                url: "./api/changenum",
                type: "post",
                data: {
                    s_num: tmpnum,
                    s_id: tmpid
                }
            }).then((res) => {
                layer.msg(res.msg);
                getcommod();
                isAllCheck();
            })
        }
    })
    $(".left_block_list").on("click", function (evt) {
        if (evt.target.className == "addbtn") {
            var tmpnum = $(evt.target).siblings("input").val();
            if (tmpnum >= 99) {
                return;
            }
            $(evt.target).siblings("input").val(++tmpnum);
            let tmpid = $(evt.target).parents(".cols4").parent().data("s_id");
            $.ajax({
                url: "./api/changenum",
                type: "post",
                data: {
                    s_num: tmpnum,
                    s_id: tmpid
                }
            }).then((res) => {
                layer.msg(res.msg);
                getcommod();
                isAllCheck();
            })
        }
    })
    $(".left_block_list").on("input", ".intnum", function (evt) {
        if (isNaN($(evt.target).val())) {
            $(evt.target).val(1);
        }
        if ($(evt.target).val() >= 99) {
            $(evt.target).val(99);
        }
        if ($(evt.target).val() <= 1) {
            $(evt.target).val(1);
        }
    }).on("blur", ".intnum", function (evt) {
        var tmpid = $(evt.target).parents(".cols4").parent().data("s_id");
        var tmpnum = $(evt.target).val();
        $.ajax({
            url: "./api/changenum",
            type: "post",
            data: {
                s_num: tmpnum,
                s_id: tmpid
            }
        }).then((res) => {
            layer.msg(res.msg);
            getcommod();
            isAllCheck();
        })
    })
    $(".left_block_list").on("click", function (evt) {
        if (evt.target.className == "delete") {
            let tmpid = $(evt.target).parents(".cols6").parent().data("s_id");
            $.ajax({
                url: "./api/delcart",
                type: "post",
                data: { s_id: tmpid }
            }).then((res) => {
                layer.msg(res.msg);
                getcommod();
                isAllCheck();
            })
        }
    })

    $(".go-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        })
    })
    $(".yiban label input").on("change", function () {
        $(".left_block_list>div .cols1 input").prop("checked", $(this).prop("checked"));
        comput();
    })
    $(".left_block_list").on("click", function (evt) {
        if ($(evt.target).attr("type") == "checkbox") {
            isAllCheck();
        }
    })
    function isAllCheck() {
        let input = $(".left_block_list > div .cols1 input");
        let flag = true;
        for (let i = 0; i < input.length; i++) {
            if (!(input.eq(i).prop("checked"))) {
                flag = false;
                break;
            }
        }
        $(".yiban label input").prop("checked", flag);
        comput();
    }
    //计算选中的总价和商品数
    function comput() {
        let input = $(".left_block_list > div .cols1 input");
        let add = 0;
        let num = 0;
        for (let i = 0; i < input.length; i++) {
            if (input.eq(i).prop("checked")) {
                let tmp = input.eq(i).parents(".cols1").parent().find(".cols5 span").text();
                add += Number(tmp);
                num++;
            }
        }
        $(".allmoney").text(add.toFixed(2));
        $(".allnum").text(num);
    }

    $(window).scroll(function () {
        let tmptop = $(this).scrollTop() + $(window).height();
        if (tmptop <= heights + $(".pv_cart_balance").height()) {
            $(".pv_cart_balance").css({ "position": "fixed", "bottom": 0, "width": 1190 })
        } else {
            $(".pv_cart_balance").css({ "position": "static" });
        }
    })

    $.ajax({
        url: "./api/getuser",
        type: "post"
    }).then((res) => {
        if (res.data != undefined && res.data != null) {
            $(".inlogin").find("a").text(res.data);
            $(".login_tip").html(`<i style="font-style: normal;font-weight:bold;color:red">${res.data}</i>的购物车`);
            $(".nologin").hide();
            $(".inlogin").show().on("mouseenter", function () {
                $(this).find("a").addClass("hover");
                $(this).find("div").show();
            }).on("mouseleave", function () {
                $(this).find("a").removeClass("hover");
                $(this).find("div").hide();
            })
            $(".inlogin button").on("click", function () {
                $.get("./api/quit").then((res) => {
                    layer.msg(res.msg);
                    if (res.status == 1) {
                        $(".nologin").show();
                        $(".inlogin").hide();
                        $(".login_tip").html(`如您需要查看账户信息,请<a href="./login.html">登录</a>`)
                        setTimeout(() => {
                            window.location.assign("./login.html");
                        }, 1000);
                    }
                })
            })
        }
    })
})