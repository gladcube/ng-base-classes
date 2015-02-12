app.factory "ParentAssociationEntity", ["AssociationEntity", (AssociationEntity)->
  class ParentAssociationEntity extends AssociationEntity
    foreign_type_name: -> @_foreign_type_name ?= @foreign_type or "#{@snake_name!}_type"
    foreign_key_name: -> @_foreign_key_name ?= @foreign_key or "#{@snake_name!}_id"
    model: ({subject}?)->
      | @polymorphic => (if subject? then @@of that[@foreign_type_name!])
      | _ => @@of (@class_name or @name)
]