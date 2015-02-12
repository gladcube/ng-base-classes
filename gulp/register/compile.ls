module.exports = (gulp, plugins)->
  gulp.task "compile", (cb)->
    plugins.sequence do
      "clean"
      "concat"
      "livescript"
      "uglify"
      "copy"
      cb