module.exports = (gulp, plugins)->
  gulp.task "a-fujiwara", (cb)->
    plugins.sequence "compile:a-fujiwara", "watch:a-fujiwara", cb