require! "gulp"
plugins = require("gulp-load-plugins")(
  pattern: ["gulp-*", "run-*"]
  replace-string: /\bgulp[\-.]|run[\-.]/
  camelize-plugin-name: yes
  lazy: yes
)
require! "include-all"
require! "path"
growl = no
{each, filter, keys} = require "prelude-ls"

own-keys = (subject)-> subject |> keys |> filter -> subject.has-own-property it

tasks_in = (rel_path)->
  include-all(
    dirname: path.resolve __dirname, rel_path
    filter: /(.+)\.ls$/
  ) or {}

invoke = (tasks)->
  tasks |> own-keys |> each -> tasks.(it) gulp, plugins, growl, path

<[config register]> |> each -> invoke tasks_in "gulp/#it"

