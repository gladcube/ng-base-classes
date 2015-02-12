module.exports = (gulp, plugins)->
  gulp.task "uglify", ->
    gulp
      .src "tmp/*.js"
      .pipe plugins.uglify!
      .pipe plugins.rename !-> it.basename += ".min"
      .pipe gulp.dest "tmp/"

