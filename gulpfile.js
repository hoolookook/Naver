//npm install gulp -g
//npm install gulp --save-dev
//npm init
//npm install del dateformat gulp-util gulp-banner gulp-beautify gulp-cache gulp-clean-css gulp-concat gulp-concat-css gulp-file-include gulp-if gulp-html-beautify gulp-imagemin gulp-load-plugins gulp-print gulp-rename gulp-require gulp-strip-debug sass gulp-sass gulp-sourcemaps gulp-uglify gulp-useref gulp-watch gulp-autoprefixer --save -dev
// npm install gulp-postcss --save-dev
//postcss 8.1.0
//devDependencies { gulp-postcss:9.0.0}
//sass = require("gulp-sass")(require("sass"))
// 패키지 변수
const gulp = require("gulp"),
  del = require("del"),
  banner = require("gulp-banner"),
  beautify = require("gulp-beautify"), // html, css, js 코드정리
  cache = require("gulp-cache"),
  cleanCSS = require("gulp-clean-css"), // CSS 파일 압축
  concat = require("gulp-concat"), // JS 파일 병합
  concatCss = require("gulp-concat-css"), // css 파일 병합
  fileinclude = require("gulp-file-include"), // HTML 인클루드
  gulpif = require("gulp-if"),
  imagemin = require("gulp-imagemin"), // 이미지 최적화
  print = require("gulp-print").default,
  rename = require("gulp-rename"), // 파일이름 변경
  stripDebug = require("gulp-strip-debug"), //
  sourcemaps = require("gulp-sourcemaps"), // SASS sourcemap
  uglify = require("gulp-uglify"), // JS 파일 압축
  useref = require("gulp-useref"), // 폴더 경로대로 생성
  autoprefixer = require("gulp-autoprefixer"); //vendor prefix

const src = "public/src/",
  resources = "resources/",
  prefix = "",
  suffix = ".min",
  version = "",
  charset = "";
const paths = {
  html: {
    src: [
      `${src}**/*.html`,
      `!${src}**/include/*.html`,
      `!${src}**/unit/*.html`,
      `!${src}**/pop/*.html`,
    ],
    dist: [`${src}**/*.html`, `!${src}**/include/*.html`],
  },
  css: {
    src: `${src}**/css/**/*.css`,
  },
  js: {
    src: [`${src}**/js/*.js`, `!${src}**/js/lib/*.js`],
    lib: `${src}**/js/lib/*.js`,
    temp: `${src}**/js/temp/*.js`,
  },
  img: {
    src: `${src}**/images/**/*.+(png|jpg|jpeg|gif|svg)`,
  },
  font: {
    src: `${src}**/css/fonts/*`,
  },
};

var buildType = false, // build : false / dist : true
  distPath = "public/build/", //distributable
  htmlSrc = paths.html.src,
  imgSrc = paths.img.src;

function clean() {
  return del(`${distPath}*`);
}
function cleanD() {
  buildType = true;
  distPath = "public/dist/";
  htmlSrc = paths.html.dist;
  return del(`${distPath}*`);
}
async function html() {
  var option = {
    indent_with_tabs: true,
  };
  gulp
    .src(htmlSrc)
    .pipe(useref())
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
        context: {
          resources: resources,
          version: version,
          prefix: prefix,
          suffix: suffix,
          buildType: buildType,
        },
      })
    )
    .pipe(gulpif(buildType, beautify.html(option))) // 배포파일은 html 들여쓰기
    .pipe(gulp.dest(distPath));
}
async function css() {
  gulp
    .src(paths.css.src)
    .pipe(useref())
    .pipe(gulpif(buildType, cleanCSS({ compatibiliy: "ie8" })))
    .pipe(gulpif(buildType, concat("all.css")))
    .pipe(gulp.dest(`${distPath}`));
}
async function js() {
  // js
  gulp
    .src(paths.js.src)
    .pipe(gulpif(buildType, stripDebug())) // 모든 console.log들과 alert 제거
    .pipe(useref())
    .pipe(
      rename({
        prefix: prefix,
      })
    )
    .pipe(gulp.dest(`${distPath}`));
  //js min
  if (buildType) {
    gulp
      .src(paths.js.src)
      .pipe(gulpif(buildType, stripDebug())) // 모든 console.log들과 alert 제거
      .pipe(gulpif(buildType, uglify()))
      // .pipe(concat("main.min.js"))
      .pipe(useref())
      .pipe(
        rename({
          prefix: prefix,
          suffix: suffix,
        })
      )
      .pipe(gulp.dest(`${distPath}`));
  }
  // js lib
  gulp.src(paths.js.lib).pipe(gulp.dest(`${distPath}`));
  if (buildType) {
    gulp
      .src(paths.js.lib)
      .pipe(gulpif(buildType, stripDebug())) // 모든 console.log들과 alert 제거
      .pipe(gulpif(buildType, uglify()))
      // .pipe(concat("main.min.js"))
      .pipe(useref())
      .pipe(
        rename({
          prefix: prefix,
          suffix: suffix,
        })
      )
      .pipe(gulp.dest(`${distPath}`));
  }
  // js temp
  gulp
    .src(paths.js.temp)
    .pipe(gulpif(buildType, stripDebug())) // 모든 console.log들과 alert 제거
    .pipe(gulpif(buildType, uglify()))
    .pipe(useref())
    .pipe(
      rename({
        prefix: prefix,
        suffix: suffix,
      })
    )
    .pipe(gulp.dest(`${distPath}`));
}
async function img() {
  gulp
    .src(paths.img.src)
    .pipe(
      cache(
        imagemin({
          optimizationLevel: 5,
          progressive: true,
          interlaced: true,
        })
      )
    )
    //.pipe(gulpif('**/*.{gif,jpg,jpeg,png,svg}', print()))
    .pipe(gulp.dest(`${distPath}`));
}
async function font() {
  gulp.src(paths.font.src).pipe(gulp.dest(`${distPath}`));
}
// html 코드정리
async function bfh() {
  var option = {
    indent_with_tabs: true,
  };
  gulp
    .src(`${distPath}**/*.html`)
    .pipe(beautify.html(option))
    .pipe(gulp.dest(`${distPath}`));
}
// css 코드정리
async function bfc() {
  gulp
    .src(`${distPath}**/*.css`)
    .pipe(beautify.css())
    .pipe(gulp.dest(`${distPath}`));
}
// js 코드정리
async function bfj() {
  var option = {
    indent_with_tabs: true,
  };
  gulp
    .src([`${distPath}**/*.js`, `!${distPath}**/js/lib/*.js`])
    .pipe(beautify(option))
    .pipe(gulp.dest(`${distPath}`));
}
gulp.task("clean", clean);
gulp.task("cleanD", cleanD);
gulp.task("html", html);
gulp.task("css", css);
gulp.task("js", js);
gulp.task("img", img);
gulp.task("font", font);
gulp.task("bfh", bfh);
gulp.task("bfc", bfc);
gulp.task("bfj", bfj);
function watch() {
  buildType = false;
  gulp.watch(`${src}**/**/*.html`, html);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.img.src, img);
}
gulp.task("watch", watch);
const build = gulp.series(clean, gulp.parallel(html, css, js, img, font));
const dist = gulp.series(cleanD, gulp.parallel(html, css, js, img, font));
gulp.task("build", build);
gulp.task("dist", dist);
gulp.task("default", watch);
