module.exports = (gulp, plugins)->
  gulp.task "watch", (cb)->
    gulp.watch "src/**/*", ["compile"]
