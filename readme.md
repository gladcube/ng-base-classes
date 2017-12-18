# ng-base-classes
ng-base-classes is an AngularJS module created with Ruby on rails philosophy that supports model extension.

## Overview
主に AngularJS のモデルに当たる部分を拡張しています。
特徴として、一度取得したデータのキャッシュ化とモデル同士のアソシエーションをサポートします。
設計思想として、Ruby on rails を参考にしています。


## Usage
```livescript
// language is livescript
app = angular.module \myApp, <[ng-base-classes]>

// AppModel
app.factory \User, <[AppModel]> ++ (AppModel)->
    class User extends AppModel
        @has_many \Setting

// AppResource
app.factory \Setting, <[AppResource]> ++ (AppResource)->
    class Setting extends AppResource
        @belongs_to \User

// Model usage
app.controller \AppController, <[$scope User Setting]> ++ ($scope, User, Setting)->
    $scope <<<
        set_user: (data)->
            @user = User.build data
            User.current @user
            @user.participate!
            @user.stash_props!
        fetch_settings: -> Setting.fetch! // fetch settings resource
        settings: -> Setting.find_all! // find all settings
        find_user_settings: -> @user.settings! // find user related settings
```

## Suppoet Association
- BelongsTo association
- HasOne association
- HasMany association
- Polymorphic association

## Callback methods
```livescript
app.factory \User, <[AppResource]> ++ (AppResource)->
    class User extends AppResource
        @after \fetch, -> # after fetch cb
```