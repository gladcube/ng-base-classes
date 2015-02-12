app.factory "Entity", ["Class", (Class)->
  class Entity extends Class
    (seed)-> seed |> keys |> each ~> @[it] = seed[it]
]