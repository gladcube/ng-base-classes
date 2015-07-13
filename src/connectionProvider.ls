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
          get: (url, options, success_cb, error_cb)->
            if &1 |> is-a "function" then [url, success_cb, error_cb] = &; options = {}
            $http.get(url, options).then do
              -> success_cb? it
              -> error_cb? it
          post: (url, data, success_cb, error_cb)->
            $http.post(url, data).then do
              -> success_cb? it
              -> error_cb? it
          put: (url, data, success_cb, error_cb)->
            $http.put(url, data).then do
              -> success_cb? it
              -> error_cb? it
          delete: (url, success_cb, error_cb)->
            $http.delete(url).then do
              -> success_cb? it
              -> error_cb? it
        | "sailsSocket"
          get: (url, options, success_cb, error_cb)->
            if &1 |> is-a "function" then [url, success_cb, error_cb] = &; options = {}
            sails-socket.get url, options.params, (data, res)->
              if res.status-code is 200 then $root-scope.$apply success_cb? res <<< data: data
              else $root-scope.$apply error_cb? res <<< data: data
          post: (url, data, success_cb, error_cb)->
            sails-socket.post url, data, (data, res)->
              if res.status-code is 200 then $root-scope.$apply success_cb? res <<< data: data
              else $root-scope.$apply error_cb? res <<< data: data
          put: (url, data, success_cb, error_cb)->
            sails-socket.put url, data, (data, res)->
              if res.status-code is 200 then $root-scope.$apply success_cb? res <<< data: data
              else $root-scope.$apply error_cb? res <<<  data: data
          delete: (url, success_cb, error_cb)->
            sails-socket.delete url, (data, res)->
              if res.status-code is 200 then $root-scope.$apply success_cb? res <<< data: data
              else $root-scope.$apply error_cb? res <<<  data: data
    ]
)