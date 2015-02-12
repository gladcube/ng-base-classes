module.exports = (gulp, plugins)->
  gulp.task "clean", (cb)->
    require! "del"
    del ["build/**/*", "tmp/**/*"], cb