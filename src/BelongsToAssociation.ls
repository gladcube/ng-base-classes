app.factory "BelongsToAssociation", ["Association", "ParentAssociationEntity", (Association, ParentAssociationEntity)->
  class BelongsToAssociation extends Association
    ({@me, parent})->
      @parent = ParentAssociationEntity.new parent
      @create_methods!
    create_methods: ->
      parent = @parent
      @me::[parent.snake_name!] ?= ->
        parent.model subject: @ .find id: @[parent.foreign_key_name!]
  ]