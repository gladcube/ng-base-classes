app.factory "AssociationEntity", ["Entity", (Entity)->
  class AssociationEntity extends Entity
    snake_name: -> @_snake_name ?= @name |> underscorize
    plural_snake_name: -> @_plural_snake_name ?= @snake_name! |> pluralize
]