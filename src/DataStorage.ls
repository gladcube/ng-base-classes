app.factory "DataStorage", ["Class", "memorizer", "grouper", (Class, memorizer, grouper)->
  class DataStorage extends Class
    (@storage = [])-> 
    data: -> @storage
    find_all: (params = {})-> 
      grouper.group_in @storage, where: params
    find: (params = {})-> 
      grouper.elm_in @storage, where: params
    add: (datum)-> @storage.push datum
    remove: (datum)-> @storage |> remove datum
    reidentify: (datum)-> @storage |> reidentify
    memorize: (value, {as: name, with: reminders}?)->
      memorizer.memorize value, as: name, with: reminders, in: @
    memoried_: (name, {with: reminders}?)->
      memorizer.memoried_ name, with: reminders, in: @
]