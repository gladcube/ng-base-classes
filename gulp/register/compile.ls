module.exports = (gulp, plugins)->
  gulp.task "compile", (cb)->
    plugins.sequence do
      "clean"
      "concat"
      "livescript"
      "uglify"
      "copy"
      cb

  gulp.task "compile:a-fujiwara", (cb)->
    plugins.sequence do
      "clean"
      "concat"
      "livescript"
      "uglify"
      "copy"
      "copy:a-fujiwara"
      cb