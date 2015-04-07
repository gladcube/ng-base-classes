app.constant("utility-functions",
  # Type
  is-a: (type, obj)--> obj |> is-type (type |> camelize |> capitalize)
  is-an: (type, obj)--> obj |> is-type (type |> camelize |> capitalize)
  # Array
  have: (obj, xs)--> xs.index-of(obj) > -1
  sum-by: (f, xs)--> xs |> map f |> sum
  prev-of: (obj, xs)--> if (index = xs.index-of obj) > -1 then xs[index - 1]
  next-of: (obj, xs)--> if (index = xs.index-of obj) > -1 then xs[index + 1]
  have-prev-of: (obj, xs)--> xs.index-of(obj) > 1
  have-next-of: (obj, xs)--> -1 < xs.index-of(obj) < xs.length
  add: (obj, xs)--> xs.push obj; return xs
  remove: (obj, xs)--> if (index = xs.index-of obj) > -1 then xs.splice index, 1
  count: (xs)-> xs.length
  is-same-contents-with: (xs, ys)--> (xs |> all -> it in ys) and (ys |> all -> it in xs)
  unpack: (xs)->
    rs = []
    xs |> each -> it |> each -> rs.push it
    return rs
  multiply-with: (xs, ys)--> xs |> map ((x)-> ys |> map (y)-> [x, y]) |> unpack
  split-with: (x, xs)--> xs |> split-at xs.index-of x
  pure: (x)-> [x]
  unpure: (xs)-> xs.0
  # Object
  own-keys: (subject)-> subject |> keys |> filter ->　subject.has-own-property it
  own-values: (subject)-> subject |> own-keys |> map (subject. )
  identify: do ->
    count = 0
    (obj)->
      if not obj.id?
        Object.define-property obj, "id", enumerable: no, configurable: yes, value: count++
      return obj
  reidentify: (obj)-> delete obj.id; obj |> identify
  equals: (obj, sub)--> angular.equals sub, obj
  define: Object.define-property
  unenumerate: (prop, obj)--> define obj, prop, enumerable: no, configurable: yes, writable: yes
  props-to-str: (obj)->
    if obj |> is-an "object" then obj |> obj-to-pairs |> sort-by ( .0) |> pairs-to-obj |> JSON.stringify
    else obj |> JSON.stringify
  str-to-props: (str)-> str |> JSON.parse
  props-match: (x, y)--> x |> keys |> all -> x.(it) ~= y.(it)
  except: (key, obj)--> obj |> obj-to-pairs |> reject ( .0 is key) |> pairs-to-obj

  # String
  underscorize: (str)-> str |> dasherize |> replace /-/g, "_"
  tableize: (str)-> str |> underscorize |> pluralize
  classify: (str)-> str |> camelize |> capitalize
  replace: (old, new_str, str)--> str.replace old, new_str
  trim: (str)-> str.replace /\s/g, ""
  # pluralize: (str)-> str |> owl.pluralize
  # Other
  unimplemented: do ->
    caller_names = []
    -> if (name = traces!.2) not in caller_names then caller_names.push name; console.warn "#name is unimplemented."
  trace-str: ->
    if Error.capture-stack-trace?
      that(obj = {}, trace-str); obj.stack
    else ""
  traces: -> trace-str!.split "\n" |> tail |> map ( .match /at\s+(\S+)/ .1)
  arrayify: -> [].slice.call it
  match-to-any: (searched_strs, word)--> searched_strs |> any ( ?.match word)
  non-empty: -> not empty it
  now: -> new Date!
  binding-import: (src, obj)-->
    for key of src
      if src.has-own-property key then obj[key] = src[key]
    return obj
  identity: (obj)->
    | (obj |> is-an "object") or (obj |> is-an "array") => obj.name or obj.name?! or obj.id or obj.id or (obj |> identify).id
    | _ => obj

  # number
  round-precision: (precision, number) --> ((number * point = (precision |> pow 10 )) |> round) / point

  # String
  starts-with: (s, str) -> str.slice(0, s.length) is s
)
