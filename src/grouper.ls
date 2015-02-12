app.factory "grouper", ["memorizer", "$rootScope", (memorizer, $rootScope)->
  grouper = ->

  window.grouper = grouper

  grouper <<<
    elm_in: (arr, {where: params, with: requirements})->
      if not params? then return arr.0
      param_pairs = params |> obj-to-pairs |> sort-by ( .0)
      dividers = param_pairs |> map ( .0)
      key = param_pairs |> map ( .1) |> join "-"
      @groups_of(arr, by: dividers, with: requirements)[key]?.0
    group_in: (arr, {where: params, with: requirements})->
      if not params? then return arr
      param_pairs = params |> obj-to-pairs |> sort-by ( .0)
      dividers = param_pairs |> map ( .0)
      key = param_pairs |> map ( .1) |> join "-"
      @groups_of(arr, by: dividers, with: requirements)[][key]
    groups_of: (arr, {by: dividers, with: requirements})->
      dividers = dividers |> sort
      if memorizer.memoried_("groups", with: (reminders = [arr] ++ dividers), in: @)? then that
      else memorizer.memorize (
        arr |> group-by (elm)-> dividers |> map (-> $rootScope.$eval "it.#{it}", (it: elm <<< requirements) ) |> join "-"
      ), as: "groups", with: reminders, in: @

  return grouper
]
