app.provider("connection",
  class ConnectionProvider
    type: "$http"
    $get: [
      "$http"
      "$rootScope"
      "sailsSocket"
      (
        $http
        $root-scope
        sails-socket
      )->
        switch @type
        | "$http"
          get: (url, options, cb)->
            if &1 |> is-a "function" then [url, cb] = &; options = {}
            $http.get(url, options).then ->
              cb? (it <<< is_ok: it.status is 200)
          post: (url, data, cb)->
            $http.post(url, data).then ->
              cb? (it <<< is_ok: it.status is 200)
          put: (url, data, cb)->
            $http.put(url, data).then ->
              cb? (it <<< is_ok: it.status is 200)
          delete: (url, cb)->
            $http.delete(url).then ->
              cb? (it <<< is_ok: it.status is 200)
        | "sailsSocket"
          get: (url, options, cb)->
            if &1 |> is-a "function" then [url, cb] = &; options = {}
            sails-socket.get url, options.params, (data, res)->
              $root-scope.$apply (cb? (res <<< is_ok: res.status-code is 200, data: data))
          post: (url, data, cb)->
            sails-socket.post url, data, (data, res)->
              $root-scope.$apply (cb? (res <<< is_ok: res.status-code is 200, data: data))
          put: (url, data, cb)->
            sails-socket.put url, data, (data, res)->
              $root-scope.$apply (cb? (res <<< is_ok: res.status-code is 200, data: data))
          delete: (url, cb)->
            sails-socket.delete url, (data, res)->
              $root-scope.$apply (cb? (res <<< is_ok: res.status-code is 200, data: data))
    ]
)