module.exports = (gulp, plugins)->
  gulp.task "concat", (cb)->
    gulp
      .src require("../pipeline.ls").ls_files_to_inject
      .pipe plugins.concat "ng-base-classes.ls"
      .pipe gulp.dest "tmp"
      