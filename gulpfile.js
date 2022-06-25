var gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  minify = require("gulp-minify-css"),
  imagemin = require("gulp-imagemin"),
  sourcemaps = require("gulp-sourcemaps"),
  mode = require("gulp-mode")();

gulp.task("pack-vendors-js", function () {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/lightbox2/dist/js/lightbox-plus-jquery.min.js",
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
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
});

gulp.task("pack-vendors-css", function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/css/bootstrap.css",
      "node_modules/lightbox2/dist/css/lightbox.min.css",
    ])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("vendors.min.css"))
    .pipe(mode.production(minify()))
    .pipe(gulp.dest("build/css"));
});

gulp.task("pack-css", function () {
  return gulp
    .src(["src/scss/style.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("bundle.min.css"))
    .pipe(mode.production(minify({ processImport: false })))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task("pack-images", async function () {
  gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("build/img"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./",
  });

  gulp.watch("src/scss/**/*", gulp.series("pack-css"));
  gulp.watch("src/img/**/*", gulp.series("pack-images"));
  gulp.watch("src/js/*.js", gulp.series("pack-js"));
  gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series(
    "pack-vendors-js",
    "pack-js",
    "pack-vendors-css",
    "pack-css",
    "pack-images"
  )
);
