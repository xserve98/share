var gulp = require('gulp');
var git = require('gulp-git');
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。
var browserSync = require('browser-sync').create();
// 这里reload不加括号，只引用不调用
// var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
gulp.task('server', function() {
    nodemon({
        script: 'server/app.js',
        // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
        ignore: ["gulpfile.js", "node_modules/"],
        env: {
            'NODE_ENV': 'development'
        }
    }).on('start', function() {
        browserSync.init({
            proxy: 'http://localhost:5000',
            files: ["public/**/*.*", "html/**/*.*"],
            port:8080
        }, function() {
            console.log("browser refreshed.");
        });
    });
});

// gulp.task('copy',function(){
//     gulp.src('../**/*')
//         .pipe(git.diff('master', {log: true}))
//         .pipe(gulp.dest('dist/'));
// });
gulp.task('copy',async() => {
    await gulp.src(git.diff('master', {log: true}))
        // .pipe(git.diff('master', {log: true}))
        .pipe(gulp.dest('dist/'));
});
