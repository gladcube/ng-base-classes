app.factory "Resource", ["connection", "AppModel", "DataStorage", "utility-functions", (connection, AppModel, DataStorage, _)->
  {props-to-str} = _
  class Resource extends AppModel
    # Private Methods
    src_and_params_from = (src, params, subject)->
      required_keys = if src.match /:[^/]+/g then that |> map ( .slice 1) else []
      # , ~> params[&1] or @[&1] or ""
      src: src.replace /:([^/]+)/g, -> params[&1] or subject?[&1] or ""
      params: params |> keys |> reject ( in required_keys) |> map (-> [it, params[it]]) |> pairs-to-obj

    # Class Methods
    @fetched_bools = -> @_fetched_bools ?= (@ |> unenumerate "_fetched_bools"; {})
    @instance_groups = -> @_instance_groups ?= (@ |> unenumerate "_instance_groups"; {})
    @params_for_fetch = -> @_params_for_fetch ?= (@ |> unenumerate "_params_for_fetch"; [])
    @param_keys_for_fetch = -> @params_for_fetch! |> last |> keys
    @src = -> "/#{@plural_snake_name!}/:id"
    @fetch = (params = {}, cb)->
      if @params_for_fetch! |> all (-> not it `equals` params)
        @params_for_fetch!.push params
        {src, params: query_params} = src_and_params_from @src!, params
        connection.get(src, params: query_params, (res)~>
          @fetched_bools![params |> props-to-str] = yes
          instances = @instance_groups!.[params |> props-to-str] = new DataStorage (res.data |> map ~> @new it)
          cb? instances, res
          @fire_cbs_of "after", "fetch"
        )
    @fire_cbs_of = (timing, action)->
      [@] ++ @superclasses til: "Model"
      |> each ~> it.cbs!.{}[timing].[][action] |> each ~> it.call @
    @instance_group = (params = {})->
      if @instance_groups![str = params |> props-to-str]? then that
      else @instance_groups![str] = new DataStorage
    @find = (params = {})->
      parts = params |> keys |> partition (~> it in @param_keys_for_fetch!)
      group_params = parts.0 |> map (-> [it, params[it]]) |> pairs-to-obj
      params = parts.1 |> map (-> [it, params[it]]) |> pairs-to-obj
      @instance_group(group_params).find params
    @find_all = (params = {})->
      parts = params |> keys |> partition (~> it in @param_keys_for_fetch!)
      group_params = parts.0 |> map (-> [it, params[it]]) |> pairs-to-obj
      params = parts.1 |> map (-> [it, params[it]]) |> pairs-to-obj
      @instance_group(group_params).find_all params
    @add = (instance)->
      (groups = @instance_groups!)
      |> keys |> filter (-> instance |> props-match (it |> str-to-props))
      |> each -> groups.(it).add instance; groups.(it).reidentify!
    @remove = (instance)->
      (groups = @instance_groups!)
      |> keys |> filter (-> instance |> props-match (it |> str-to-props))
      |> each -> groups.(it).remove instance; groups.(it).reidentify!
    @is_fetched = (params = {})-> @fetched_bools![params |> props-to-str]
    @new = ->
      instance = super ...
       ..fire_cbs_of "after", "new"

    # Instance Methods
    # 問題が発生したら下記に変更
    # src: -> @_src ?= (@ |> unenumerate "_src"; src_and_params_from @class!.src!, {}, @ .src)
    src: -> @_src ?= (src_and_params_from @class!.src!, {}, @ .src)
    persist: (success_cb, error_cb)->
      @fire_cbs_of "before", "persistence"
      connection.post(@src!, @data!, (res)~>
        @ <<< res.data
        @participate!
        @fire_cbs_of "after", "persistence"
        if res.is_ok then success_cb? res else error_cb? res
      )
    update: (success_cb, error_cb)->
      @fire_cbs_of "before", "update"
      if @is_dirty!
        connection.put(@src!, @data!, (res)~>
          @fire_cbs_of "after", "update"
          if res.is_ok then success_cb? res else error_cb? res
        )
      else @fire_cbs_of "after", "update"; success_cb?!
    delete: (success_cb, error_cb)->
      @fire_cbs_of "before", "delete"
      connection.delete(@src!, (res)~>
        @secede!
        @fire_cbs_of "after", "delete"
        if res.is_ok then success_cb? res else error_cb? res
      )
]
