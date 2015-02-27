module.exports = (gulp, plugins)->
  gulp.task "watch", (cb)->
    gulp.watch "src/**/*", ["compile"]

  gulp.task "watch:a-fujiwara", (cb)->
    gulp.watch "src/**/*", ["compile:a-fujiwara"]
