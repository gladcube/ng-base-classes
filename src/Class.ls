app.factory "Class", ["$injector", ($injector)->
  class Class
    @new = ->
      new (@bind.apply @, [@] ++ (& |> arrayify) )!
    @of = -> $injector.get it
    @snake_name = -> @_snake_name ?= (@ |> unenumerate "_snake_name"; @display-name |> underscorize)
    @plural_snake_name = -> @_plural_snake_name ?= (@ |> unenumerate "_plural_snake_name"; @snake_name! |> pluralize)
    @superclasses = ({til: limit}?)-> if not @superclass? then [] else if @superclass.display-name is limit then [@superclass] else [@superclass] ++ @superclass~superclasses ...
    is_an_instance_of: (class_)-> (@class! is class_) or (class_ in @class!.superclasses!)
    class: -> @constructor
  window.Class = Class
]

