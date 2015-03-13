app.factory "grouper", ["memorizer", "$rootScope", (memorizer, $rootScope)->
  grouper = ->

  window.grouper = grouper

  grouper <<<
    elm_in: (arr, {where: params, with: requirements})->
      if not params? then return arr.0
      @groups_of(arr, by: (params |> keys), with: requirements)[key]?.0
    group_in: (arr, {where: params, with: requirements})->
      if not params? then return arr
      groups = @groups_of arr, by: (params |> keys), with: requirements
      if params |> values |> any (-> it |> is-an "array") # パラメータに配列指定の場合
        groups[params |> props-to-str] ?= 
          arr |> filter (elm)-> 
            params |> keys |> all ->
              switch (params.(it) |> is-an "array")
              | yes => elm.(it) in params.(it)
              | no => elm.(it) ~= params.(it)
      groups[][params |> props-to-str]
    groups_of: (arr, {by: dividers, with: requirements})->
      if memorizer.memoried_("groups", with: (reminders = [arr] ++ dividers), in: @)? then that
      else memorizer.memorize (
        arr
        |> group-by (elm)->
          dividers
          |> map -> [it, $rootScope.$eval "it.#{it}", (it: elm <<< requirements)]
          |> pairs-to-obj
          |> props-to-str
      ), as: "groups", with: reminders, in: @

  return grouper
]
