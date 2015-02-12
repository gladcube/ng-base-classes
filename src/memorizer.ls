app.factory "memorizer", [->
  memorizer = ->

  memorizer <<<
    memorize: (value, {as: name, with: reminders, in: storage, prefix}?)->
      key = reminders |> map (-> it |> identity) |> join "_"
      (storage ?= @){}["#{prefix or "_"}#{name}"][key] = value
    memoried_: (name, {with: reminders, in: storage, prefix}?)->
      key = reminders |> map (-> it |> identity) |> join "_"
      (storage ?= @)["#{prefix or "_"}#{name}"]?[key]
    all_memoried_: (name, {in: storage, prefix}?)->
      (storage ?= @)["#{prefix or "_"}#{name}"]? |> values

  return memorizer
]
