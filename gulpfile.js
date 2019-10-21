const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");

gulp.task("htmlmin",()=>{
    gulp.src(["./src/**/*.html","./src/**/*.html"])
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments:true,
        }))
        .pipe(gulp.dest("./dist/"));
})


var sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("sass",function(){
    return gulp.src("./src/sass/**/*.scss")
        .pipe(sass({
            outputStyle:"compressed"
        }).on("error",sass.logError))
        .pipe(gulp.dest("./src/css/"));
})

//3. css压缩
const minCss = require("gulp-clean-css");
gulp.task("mincss", () => {
    gulp.src(["./src/**/*.css"])
        .pipe(minCss())
        .pipe(gulp.dest("./dist/"));
})


//4. css的私有前缀,在css压缩之前就需要加私有前缀
const autoprefixer = require('gulp-autoprefixer');
gulp.task('testAutoFx', function() {
    gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});

//5.js压缩
const babel = require("gulp-babel");
const minjs = require("gulp-uglify"); // 不对es6的支持不是很友好
gulp.task("minjs", () => {
    gulp.src(["./src/js/**/*.js"])
        .pipe(babel()) //压缩之前,把es6转换成es5
        .pipe(minjs())
        .pipe(gulp.dest("./dist/js/"))
})


// 6. 压缩img
const imagemin = require("gulp-imagemin");
gulp.task("imagemin", function() {
    // （**匹配src/js的0个或多个子文件夹）
    gulp.src(['./src/images/*.{png,jpg,gif,svg,jpeg}'])
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"))

});


gulp.task('sass:watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass', "mincss"]);
    gulp.watch(['./src/css/**/*.css'], ["mincss"]);

    // gulp.watch(['./src/**/*.html', './src/**/*.htm'], ["htmlmin"]);
    // gulp.watch(['./src/**/*.js'], ["minjs"]);
});

//统一运行
// gulp.task("default", ["htmlmin", "sass", "imagemin", 'mincss', "sass:watch", "minjs"]);
gulp.task("default", ["sass", "sass:watch", ]);