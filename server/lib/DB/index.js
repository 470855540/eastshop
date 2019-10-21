import mysql from "mysql";

const conn = mysql.createConnection(require("./../Configs").dbconfig);

conn.connect((err) => {
    if (err) {
        console.log("连接失败");
    }
});
function exec(sql, patams, callback) {
    conn.query(sql, patams, (err, result, fildes) => {
        callback(err, result, fildes);
    })
}

function execAsync(sql, patams) {
    return new Promise((resolve, reject) => {
        conn.query(sql, patams, (err, result, fildes) => {
            if (err) {
                reject(err.massage);
                return;
            }
            resolve(result, fildes);
        })
    })
}

module.exports = {
    exec,
    execAsync
}