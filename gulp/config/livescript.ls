module.exports = (gulp, plugins)->
  gulp.task "livescript", (cb)->
    gulp
      .src "tmp/*.ls"
      .pipe plugins.livescript!
      .pipe gulp.dest "tmp/"
