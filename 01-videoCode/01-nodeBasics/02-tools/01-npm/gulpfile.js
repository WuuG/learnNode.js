const gulp = require("gulp");

const node_env = process.env.NODE_ENV;

console.log(node_env);
function scripts() {
  return gulp
    .src("./1.script/app.js", { sourcemaps: true })
    .pipe(gulp.dest("./1.script/dist"));
}

var build = gulp.series(scripts);

exports.default = build;
