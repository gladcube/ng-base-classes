module.exports = (gulp, plugins)->
  gulp.task "copy", ->
    gulp
      .src "tmp/*.js"
      .pipe gulp.dest "build"

  gulp.task "copy:a-fujiwara", ->
    gulp
      .src "build/ng-base-classes.js"
      .pipe gulp.dest "../sfa-ui/assets/js/dependencies"
