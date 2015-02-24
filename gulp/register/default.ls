module.exports = (gulp, plugins)->
  gulp.task "default", (cb)->
    plugins.sequence "compile", "watch", cb