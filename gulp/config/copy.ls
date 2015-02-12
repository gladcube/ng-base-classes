module.exports = (gulp, plugins)->
  gulp.task "copy", (cb)->
    gulp
      .src "tmp/*.js"
      .pipe gulp.dest "build"