var gulp = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  minify = require("gulp-minify-css"),
  sourcemaps = require("gulp-sourcemaps"),
  mode = require("gulp-mode")();

gulp.task("pack-vendors-js", function () {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.js",
    ])
    .pipe(mode.development(sourcemaps.init()))
    .pipe(concat("vendors.min.js"))
    .pipe(mode.production(uglify()))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest("build/js"));
});

gulp.task("pack-js", function () {
  return gulp
    .src(["src/js/script.js"])
    .pipe(mode.development(sourcemaps.init()))
    .pipe(concat("bundle.min.js"))
    .pipe(mode.production(uglify()))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest("build/js"));
});

gulp.task("pack-css", function () {
  return gulp
    .src(["src/scss/style.scss"])
    .pipe(concat("bundle.min.css"))
    .pipe(mode.production(minify()))
    .pipe(gulp.dest("build/css"));
});

gulp.task("pack-images", function () {
  gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
  gulp.watch("src/css/*.css", gulp.series("pack-css"));
  gulp.watch("src/img/**/*", gulp.series("pack-images"));
  gulp.watch("src/js/*.js", gulp.series("pack-js"));
});

gulp.task(
  "default",
  gulp.series("pack-vendors-js", "pack-js", "pack-css", "pack-images")
);
