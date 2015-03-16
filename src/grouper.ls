app.factory "grouper", ["memorizer", "$rootScope", (memorizer, $rootScope)->
  grouper = ->

  window.grouper = grouper

  grouper <<<
    elm_in: (arr, {where: params, with: requirements})->
      if not params? then return arr.0
      @group_in(...).0
    group_in: (arr, {where: params, with: requirements})->
      if not params? then return arr
      groups = @groups_of arr, by: (params |> keys), with: requirements
      if params |> values |> any (-> it |> is-an "array") # パラメータに配列指定の場合
        param_keys = params |> keys
        groups[params |> props-to-str] ?= 
          params # => {p_id: 2, u_id: [1, 2], s_id: [3, 4]}
          |> values # => [2, [1, 2], [3, 4]]
          |> map -> if not (it |> is-an "array") then [it] else it # =>[[2], [1, 2], [3, 4]]
          |> fold1 (ys, xs)--> xs |> multiply-with ys
          |> map -> [it] |> flatten # => [[2, 1, 3], [2, 1, 4], [2, 2, 3], [2, 2, 4]]
          |> map -> (lists-to-obj param_keys, it) |> props-to-str # => ["{"p_id":2,"u_id":1,"s_id":3}", "{"p_id":2,"u_id":1,"s_id":4}", "{"p_id":2,"u_id":2,"s_id":3}", "{"p_id":2,"u_id":2,"s_id":4}"]
          |> map (groups. )
          |> compact
          |> concat
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
