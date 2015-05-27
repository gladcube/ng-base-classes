app.factory "HasOneAssociation", ["Association", "ChildAssociationEntity", (Association, ChildAssociationEntity)->
  class HasOneAssociation extends Association
    ({@me, child, @strong})->
      @child = ChildAssociationEntity.new child
      @create_methods!
      @register_cbs! if @strong
    create_methods: ->
      @create_get_method!
      @create_build_method!
    create_get_method: ->
      child = @child
      @me::[child.snake_name!] ?= (params = {})->
        params = params <<< (child.foreign_key_name!): @id
        if child.parent_alias? then params.(child.foreign_type_name!) = @class!.name
        child.model!.find params
    create_build_method: ->
      child = @child
      @me::["new_#{child.snake_name!}"] = (props)->
        child.model!.build props, parent: @, by: child.parent_alias
    register_cbs: ->
      me = @me
      child = @child
      @me.after "persistence", ->
        while (new_children = me::[child.plural_snake_name!]!).length > 0
          it = new_children.pop!
          it.("#{me.snake_name!}_id") = @id
          it.persist!

  ]