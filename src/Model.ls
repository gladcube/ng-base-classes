app.factory "Model", ["Entity", "DataStorage", "BelongsToAssociation", "HasManyAssociation", "HasOneAssociation", "memorizer", (Entity, DataStorage, BelongsToAssociation, HasManyAssociation, HasOneAssociation, memorizer)->
  class Model extends Entity
    @instances = -> @_instances ?= (@ |> unenumerate "_instances";  new DataStorage)
    @cbs = -> @_cbs ?= (@ |> unenumerate "_cbs";  after: {}, before: {})
    @belongs_to = (name, {class_name, polymorphic, foreign_type}:options?)->
      @[]associations.push BelongsToAssociation.new me: @, parent: (name: name) <<< options
    @has_many = (name, {class_name, as: parent_alias, through: mediator_name, foreign_key, strongly: strong}:options?)->
      @[]associations.push HasManyAssociation.new me: @, strong: strong, child: (name: name, parent_name: @name, parent_alias: parent_alias, mediator_name: mediator_name) <<< options
    @has_one = (name, {class_name, as: parent_alias, through: mediator_name, foreign_key, strongly: strong}:options?)->
      @[]associations.push HasOneAssociation.new me: @, strong: strong, child: (name: name, parent_name: @name, parent_alias: parent_alias, mediator_name: mediator_name) <<< options
    @find = (params)-> @instances!.find params
    @find_all = (params)-> @instances!.find_all params
    @add = (instance)-> @instances!.add instance
    @remove = (instance)-> @instances!.remove instance
    @after = (...action_names, cb)-> action_names |> each ~> @cbs!.after.[][it].push cb
    @before = (...action_names, cb)-> action_names |> each ~> @cbs!.before.[][it].push cb
    @new = ->
      super ...
        ..fire_cbs_of "after", "new"
    @build = (props, {parent: parent_instance, by: parent_name}?)->
      @new props
        ..parent_to parent_instance, as: parent_name if parent_instance?
        ..fire_cbs_of "after", "build"
    @memorize = (value, {as: name, with: reminders}?)->
      memorizer.memorize value, as: name, with: reminders, in: @
    @memoried_ = (name, {with: reminders}?)->
      memorizer.memoried_ name, with: reminders, in: @
    @index_by = (...keys)->
      keys
      |> each (key)~>
        @keys_for_index!.push key
        @.("instances_for_#{key}") = -> @.("_instances_for_#{key}") ?= (@ |> unenumerate "_instances_for_#{key}"; {})
        @.("find_by_#{key}") = -> @.("instances_for_#{key}")!.(it)
        @after "new", "persistence", -> @class!.("instances_for_#{key}")!.(@.(key)) = @
    @keys_for_index = -> @_keys_for_index ?= (@ |> unenumerate "_keys_for_index"; <[id]>)
    @index_by "id"
    fire_cbs_of: (timing, action)->
      [@class!] ++ @class!.superclasses til: "Model"
      |> map ( .cbs!)
      |> each ~> it[timing].[][action] |> each ~> it.call @
    parent_to: (parent_instance, {as: parent_name}?)->
      parent = @class!.associations |> filter ( .parent?) |> map ( .parent) |> find ~>
        if parent_name? then it.name is that
        else it.model!?.name is parent_instance.class!.name
      if parent?
        @[parent.foreign_key_name!] = parent_instance.id
        if parent.polymorphic then @[parent.foreign_type_name!] = parent_instance.class!.name
    clear_cache: ->
      @ |> own-keys |> filter ( .0 is "_") |> each ~> delete @[it]
    participate: -> @class!.add @
    secede: -> @class!.remove @
    stash_props: -> @_stashed_props = @data!
    stashed_props: -> @_stashed_props
    retrieve_stashed_props: -> @ <<< @stashed_props!
    stash_children: ->
      @class!.associations |> filter ( .strong) |> each ~>
        @[children_name = it.child.plural_snake_name!]! |> each ( .stash_props!)
        @{}_stashed_children[children_name] = @[children_name]!.slice!
    retrieve_stashed_children: ->
      @class!.associations |> filter ( .strong) |> each ~>
        @[children_name = it.child.plural_snake_name!]!
          ..replace_with @_stashed_children[children_name]
          ..each ( .retrieve_stashed_props!)
    data: -> @ |> own-keys |> reject ( .char-at(0) is "_") |> map (~> [it, @[it]]) |> pairs-to-obj
    is_new: -> not @id?
    is_pristine: -> @stashed_props! |> keys |> all ~> @stashed_props![it] is @[it]
    is_dirty: -> not @is_pristine!
    type_is: (type_name)-> @type is type_name
    type_in: (...type_names)-> @type in type_names
    memorize: (value, {as: name, with: reminders}?)->
      memorizer.memorize value, as: name, with: reminders, in: @
    memoried_: (name, {with: reminders}?)->
      memorizer.memoried_ name, with: reminders, in: @
  window.Model = Model
]
