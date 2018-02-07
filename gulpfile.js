var gulp        = require("gulp"),
    sass        = require("gulp-sass"),
    browserSync = require("browser-sync"),
    del         = require("del"),
    imagemin    = require("gulp-imagemin"),
    pngquant    = require("imagemin-pngquant"),
    autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function () {
    return gulp.src("app/sass/**/*.+(scss|sass)")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task("browser-sync", function () {
   browserSync({
       server:{
           baseDir: "app"
       }
   })
});

gulp.task("img", function () {
    return gulp.src('app/img/**/*')
    .pipe(imagemin([
    	imagemin.gifsicle({interlaced: true}),
    	imagemin.jpegtran({progressive: true}),
    	imagemin.optipng({optimizationLevel: 9}),
    	imagemin.svgo({
    		plugins: [
    			{removeViewBox: true},
    			{cleanupIDs: false}
    		]
    	})
    ]))
    .pipe(gulp.dest("dist/img"));
});

gulp.task("watch", ["browser-sync"], function () {
    gulp.watch("app/sass/**/*.+(scss|sass)", ["sass"]);
    gulp.watch("app/*.html", browserSync.reload)
    gulp.watch("app/js/**/*.js", browserSync.reload)
});

gulp.task("clean", function () {
   return del.sync("dist");
});

gulp.task("build", ['clean', 'img', 'sass'], function () {

   var buildCss = gulp.src([
       'app/css/main.css'
   ])
       .pipe(gulp.dest('dist/css'));

    var buldFonts = gulp.src([
        'app/fonts/**/*'
    ])
        .pipe(gulp.dest('dist/fonts'))

    var buldjs = gulp.src([
        'app/js/**/*'
    ])
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src([
        'app/*.html'
    ])
        .pipe(gulp.dest('dist'))
});
