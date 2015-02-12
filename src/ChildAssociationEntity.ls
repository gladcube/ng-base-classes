app.factory "ChildAssociationEntity", ["AssociationEntity", (AssociationEntity)->
  class ChildAssociationEntity extends AssociationEntity
    snake_parent_alias: -> @_snake_parent_alias ?= if @parent_alias? then that |> underscorize else ""
    snake_parent_name: -> @_snake_parent_name ?= @parent_name |> underscorize
    foreign_type_name: -> @_foreign_type_name ?= "#{@snake_parent_alias!}_type"
    foreign_key_name: -> @_foreign_key_name ?= @foreign_key or "#{@snake_parent_alias! or @snake_parent_name!}_id"
    foreign_params: ({subject}?)-> 
    model: ->
      @_model ?= @@of (@class_name or @name)
]