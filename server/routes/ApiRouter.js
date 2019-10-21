import express from "express";
import db from "./../lib/DB";
import md5 from "md5"

const apiRouter = express.Router();


apiRouter.post("/reg1", (req, res, next) => {
    let sql = "INSERT INTO users (`u_tel`,`u_pwd`) VALUE (?,?);";
    let params = [req.body.utel, md5(md5(req.body.upwd) + require("./../lib/Configs").keys)];
    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "注册失败",
                status: -1,
                err: err.massage
            })
            return;
        }
        if (result.affectedRows >= 1) {
            res.json({
                msg: "注册成功",
                status: 1,
                data: result
            })
        }
    })
})

apiRouter.post("/reg2", (req, res, next) => {
    let sql = "INSERT INTO users (`u_name`,`u_tel`,`u_pwd`) VALUE (?,?,?);";
    let params = [req.body.uname, req.body.utel, md5(md5(req.body.upwd) + require("./../lib/Configs").keys)];
    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "注册失败",
                status: -1,
                err: err.massage
            })
            return;
        }
        if (result.affectedRows >= 1) {
            res.json({
                msg: "注册成功",
                status: 1,
                data: result
            })
        }
    })
})

apiRouter.post("/login", (req, res, next) => {
    let sql = "SELECT `u_id`,`u_name`,`u_tel` FROM users WHERE u_status=1 AND u_tel=? AND u_pwd=?;";
    let params = [req.body.utel, md5(md5(req.body.upwd) + require("./../lib/Configs").keys)];

    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "sql语句有误",
                status: -3,
                err: err.message
            })
            return;
        }
        if (result.length >= 1) {
            req.session["user"] = result[0];
            res.json({
                msg: "登录成功",
                status: 2,
                data: result[0]
            })
        } else {
            res.json({
                msg: "登录失败",
                status: -2
            })
        }
    })
})

apiRouter.get("/quit", (req, res, next) => {
    req.session["user"] = null;
    res.json({
        msg: "退出登录成功",
        status: 1
    })
})

apiRouter.get("/commod/:id", (req, res, next) => {
    let sql = "SELECT * FROM commods WHERE c_status=1 AND c_id=?;";
    let params = [req.params.id];
    db.exec(sql, params, (err, result, fildes) => {
        if (err) {
            res.json({
                msg: "sql语句有误",
                status: -4,
                err: err.message
            })
            return;
        }
        if (result.length >= 1) {
            res.json({
                msg: "已找到并返回",
                status: 5,
                data: result[0]
            })
        } else {
            res.json({
                msg: "未找到商品",
                status: -5
            })
        }
    })
})

apiRouter.get("/commods", (req, res, next) => {
    let sql = "SELECT * FROM commods WHERE c_status=1";
    let params = [];
    db.exec(sql, params, (err, result, fildes) => {
        if (err) {
            res.json({
                msg: "sql语句有误",
                status: -4,
                err: err.message
            })
            return;
        }
        if (result.length >= 1) {
            res.json({
                msg: "已找到并返回",
                status: 5,
                data: result
            })
        } else {
            res.json({
                msg: "未找到商品",
                status: -5
            })
        }
    })
})

apiRouter.post("/cart", (req, res, next) => {
    let sql = "SELECT * FROM shopcarts WHERE s_status=1 AND u_id=? AND c_id=?;";
    let params = [req.session["user"].u_id, req.body.c_id];
    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "sql错误1",
                status: -1,
                err: err.message
            })
            return;
        }
        if (result.length >= 1) {
            let querysql = "UPDATE shopcarts SET s_num=s_num+? WHERE s_id=?;";
            let queryparams = [req.body.s_num, result[0].s_id];
            db.exec(querysql, queryparams, (err, result) => {
                if (err) {
                    res.json({
                        msg: "sql错误2",
                        status: -1,
                        err: err.message
                    })
                    return;
                }
                if (result.affectedRows >= 1) {
                    res.json({
                        msg: "添加购物车成功",
                        status: 1
                    })
                }
            })
        } else {
            let nosql = "INSERT INTO shopcarts (`u_id`,`c_id`,`s_name`,`s_img`,`s_num`,`s_money`) VALUES (?,?,?,?,?,?);";
            let noparams = [
                req.session["user"].u_id,
                req.body.c_id,
                req.body.s_name,
                req.body.s_img,
                req.body.s_num,
                req.body.s_money
            ];
            db.exec(nosql, noparams, (err, result) => {
                if (err) {
                    res.json({
                        msg: "sql错误3",
                        status: -1,
                        err: err.message
                    })
                    return;
                }
                if (result.affectedRows >= 1) {
                    res.json({
                        msg: "添加购物车成功",
                        status: 1
                    })
                }
            })
        }
    })
})

apiRouter.post("/getcart", (req, res, next) => {
    let sql = "SELECT * FROM shopcarts WHERE s_status=1 AND u_id=?;";
    let params = [req.session["user"].u_id];
    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "sql语句错误",
                status: -1,
                err: err.message
            })
            return;
        }
        res.json({
            msg: "拉取到结果",
            status: 1,
            data: result
        })
    })
})

apiRouter.post("/delcart", (req, res, next) => {
    let sql = "UPDATE shopcarts SET s_status=0 WHERE s_id=?";
    let params = [req.body.s_id];
    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "sql语句错误",
                status: -1,
                err: err.message
            })
            return;
        }
        if (result.affectedRows >= 1) {
            res.json({
                msg: "删除成功",
                status: 1
            })
        } else {
            res.json({
                msg: "删除失败",
                status: -1
            })
        }
    })
})

apiRouter.post("/changenum", (req, res, next) => {
    let sql = "UPDATE shopcarts SET s_num=? WHERE s_id=?;";
    let params = [req.body.s_num, req.body.s_id];
    db.exec(sql, params, (err, result) => {
        if (err) {
            res.json({
                msg: "添加购物车失败",
                status: -1,
                err: err.message
            })
            return;
        }
        if (result.affectedRows >= 1) {
            res.json({
                msg: "添加购物车成功",
                status: 1
            })
        } else {
            res.json({
                msg: "添加购物车失败",
                status: -1
            })
        }
    })
})

apiRouter.post("/getuser", (req, res, next) => {
    if (req.session["user"] != undefined && req.session["user"] != null) {
        let user = req.session["user"];
        res.json({
            msg: "获取用户名成功",
            status: 1,
            data: user.u_tel
        })
    }else{
        res.json({
            msg: "获取用户名成功",
            status: 1,
            data: null
        })
    }
})

module.exports = {
    apiRouter
}