import express from "express";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import cookiesession from "cookie-session"
import session from "express-session";
import multer from "multer";

const server = express();
server.use(bodyparser.urlencoded({
    limit:"500mb",
    extended:false
}))
server.use(bodyparser.json());
// server.use(cookieparser("itchy"));
// server.use(cookiesession({
//     name:"itchy",
//     keys:["aaa","bbb","ccc"],
//     maxAge:1000*60*20,
//     overwrite:true
// }))

server.use(session({
    name:"itchy",
    secret:["aaa","bbb","ccc"],
    cookie:{maxAge:1000*60*20},
    resave:false,
    rolling:true
}))


const upload = multer({
    dest:"./../src/upload/"
});
server.use(upload.any());

server.use(express.static("./../src/"));

server.use("*",(req,res,next)=>{
    req.header("Content-Type","application/json;charset=utf-8");
    if(req.originalUrl.indexOf("/login")!=-1||
    req.originalUrl.indexOf("/css")!=-1||
    req.originalUrl.indexOf("/js")!=-1||
    req.originalUrl.indexOf("/images")!=-1||
    req.originalUrl.indexOf("/register")!=-1||
    req.originalUrl.indexOf("/index")!=-1||
    req.originalUrl.indexOf("/reg")!=-1||
    req.originalUrl.indexOf("/commod")!=-1||
    req.originalUrl.indexOf("/getuser")!=-1){
        next();
    }else{
        if (req.session["user"] == null || req.session["user"] == undefined) {
            res.json({
                msg: "请先登录",
                status: -1
            })
            // 服务器端的重定向 response.redirect("./login.html"); 不能用ajax的请求
        } else {
            req.session["user"]=req.session["user"];//重置cookie的时间
            next();
        }
    }
})

server.use("/api",require("./routes/ApiRouter").apiRouter);


server.listen(8082,()=>{
    console.log("服务启动完毕 http://127.0.0.1:8082");
})