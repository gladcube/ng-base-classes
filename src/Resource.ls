app.factory "Resource", ["$http", "AppModel", "DataStorage", ($http, AppModel, DataStorage)->
  class Resource extends AppModel
    # Private Methods
    src_and_params_from = (src, params, subject)->
      required_keys = src.match /:[^/]+/g |> map ( .slice 1)
      # , ~> params[&1] or @[&1] or ""
      src: src.replace /:([^/]+)/g, -> params[&1] or subject?[&1] or ""
      params: params |> keys |> reject ( in required_keys) |> map (-> [it, params[it]]) |> pairs-to-obj

    # Class Methods
    @fetched_bools = -> @_fetched_bools ?= (@ |> unenumerate "_fetched_bools"; {})
    @instance_groups = -> @_instance_groups ?= (@ |> unenumerate "_instance_groups"; {})
    @params_for_fetch = -> @_params_for_fetch ?= (@ |> unenumerate "_params_for_fetch"; [])
    @param_keys_for_fetch = -> @params_for_fetch! |> last |> keys
    @src = -> "/#{@plural_snake_name!}/:id"
    @fetch = (params = {})->
      if @params_for_fetch! |> all (-> not it `equals` params)
        @params_for_fetch!.push params
        {src, params: query_params} = src_and_params_from @src!, params
        $http.get(src, params: query_params).then ~>
          @fetched_bools![params.props_str!] = yes
          instances = @instance_groups!.[params.props_str!] = new DataStorage (it.data |> map ~> @new it)
          @fire_cbs_of "after", "fetch"
    @fire_cbs_of = (timing, action)->
      [@] ++ @superclasses til: "Model"
      |> each ~> @cbs.{}[it.name].{}[timing].[][action] |> each ~> it.call @
    @instance_group = (params = {})->
      if @instance_groups![str = params.props_str!]? then that
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
    @add = (instance, params = {})-> (data = @instance_group(params)).add instance; data.reidentify!
    @remove = (instance, params = {})-> (data = @instance_group(params)).remove instance; data.reidentify!
    @is_fetched = (params = {})-> @fetched_bools![params.props_str!]
    @new = ->
      instance = super ...
       ..fire_cbs_of "after", "new"

    # Instance Methods
    # 問題が発生したら下記に変更
    # src: -> @_src ?= (@ |> unenumerate "_src"; src_and_params_from @class!.src!, {}, @ .src)
    src: -> @_src ?= (src_and_params_from @class!.src!, {}, @ .src)
    persist: (success_cb, error_cb)->
      @fire_cbs_of "before", "persistence"
      $http.post(@src!, @data!).success (res)~>
        @ <<< res
        @participate!
        @fire_cbs_of "after", "persistence"
        success_cb? res
      .error -> error_cb? it
    update: (success_cb, error_cb)->
      @fire_cbs_of "before", "update"
      if @is_dirty!
        $http.put(@src!, @data!).success (res)~>
          @fire_cbs_of "after", "update"
          success_cb? res
        .error -> error_cb? it
      else @fire_cbs_of "after", "update"; cb?!
    delete: (success_cb, error_cb)->
      @fire_cbs_of "before", "delete"
      $http.delete(@src!).success (res)~>
        @secede!
        @fire_cbs_of "after", "delete"
        success_cb? res
      .error -> error_cb? it
]