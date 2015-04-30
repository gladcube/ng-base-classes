(function(){
  var app, ConnectionProvider, slice$ = [].slice;
  app = angular.module("ng-base-classes", []);
  app.factory("AppModel", [
    "Model", function(Model){
      var AppModel;
      return AppModel = (function(superclass){
        var prototype = extend$((import$(AppModel, superclass).displayName = 'AppModel', AppModel), superclass).prototype, constructor = AppModel;
        function AppModel(){
          AppModel.superclass.apply(this, arguments);
        }
        return AppModel;
      }(Model));
    }
  ]);
  app.factory("AppResource", [
    "Resource", "$rootScope", function(Resource, $rootScope){
      var AppResource;
      return AppResource = (function(superclass){
        var prototype = extend$((import$(AppResource, superclass).displayName = 'AppResource', AppResource), superclass).prototype, constructor = AppResource;
        function AppResource(){
          AppResource.superclass.apply(this, arguments);
        }
        return AppResource;
      }(Resource));
    }
  ]);
  app.factory("Association", [
    "Class", function(Class){
      var Association;
      return Association = (function(superclass){
        var prototype = extend$((import$(Association, superclass).displayName = 'Association', Association), superclass).prototype, constructor = Association;
        function Association(){
          Association.superclass.apply(this, arguments);
        }
        return Association;
      }(Class));
    }
  ]);
  app.factory("AssociationEntity", [
    "Entity", function(Entity){
      var AssociationEntity;
      return AssociationEntity = (function(superclass){
        var prototype = extend$((import$(AssociationEntity, superclass).displayName = 'AssociationEntity', AssociationEntity), superclass).prototype, constructor = AssociationEntity;
        prototype.snake_name = function(){
          var ref$;
          return (ref$ = this._snake_name) != null
            ? ref$
            : this._snake_name = underscorize(
            this.name);
        };
        prototype.plural_snake_name = function(){
          var ref$;
          return (ref$ = this._plural_snake_name) != null
            ? ref$
            : this._plural_snake_name = pluralize(
            this.snake_name());
        };
        function AssociationEntity(){
          AssociationEntity.superclass.apply(this, arguments);
        }
        return AssociationEntity;
      }(Entity));
    }
  ]);
  app.factory("BelongsToAssociation", [
    "Association", "ParentAssociationEntity", function(Association, ParentAssociationEntity){
      var BelongsToAssociation;
      return BelongsToAssociation = (function(superclass){
        var prototype = extend$((import$(BelongsToAssociation, superclass).displayName = 'BelongsToAssociation', BelongsToAssociation), superclass).prototype, constructor = BelongsToAssociation;
        function BelongsToAssociation(arg$){
          var parent;
          this.me = arg$.me, parent = arg$.parent;
          this.parent = ParentAssociationEntity['new'](parent);
          this.create_methods();
        }
        prototype.create_methods = function(){
          var parent, ref$, key$, ref1$;
          parent = this.parent;
          return (ref1$ = (ref$ = this.me.prototype)[key$ = parent.snake_name()]) != null
            ? ref1$
            : ref$[key$] = function(){
              return parent.model({
                subject: this
              }).find_by_id(this[parent.foreign_key_name()]);
            };
        };
        return BelongsToAssociation;
      }(Association));
    }
  ]);
  app.factory("ChildAssociationEntity", [
    "AssociationEntity", function(AssociationEntity){
      var ChildAssociationEntity;
      return ChildAssociationEntity = (function(superclass){
        var prototype = extend$((import$(ChildAssociationEntity, superclass).displayName = 'ChildAssociationEntity', ChildAssociationEntity), superclass).prototype, constructor = ChildAssociationEntity;
        prototype.snake_parent_alias = function(){
          var ref$, that;
          return (ref$ = this._snake_parent_alias) != null
            ? ref$
            : this._snake_parent_alias = (that = this.parent_alias) != null ? underscorize(
            that) : "";
        };
        prototype.snake_parent_name = function(){
          var ref$;
          return (ref$ = this._snake_parent_name) != null
            ? ref$
            : this._snake_parent_name = underscorize(
            this.parent_name);
        };
        prototype.foreign_type_name = function(){
          var ref$;
          return (ref$ = this._foreign_type_name) != null
            ? ref$
            : this._foreign_type_name = this.snake_parent_alias() + "_type";
        };
        prototype.foreign_key_name = function(){
          var ref$;
          return (ref$ = this._foreign_key_name) != null
            ? ref$
            : this._foreign_key_name = this.foreign_key || (this.snake_parent_alias() || this.snake_parent_name()) + "_id";
        };
        prototype.foreign_params = function(arg$){
          var subject;
          if (arg$ != null) {
            subject = arg$.subject;
          }
        };
        prototype.model = function(){
          var ref$;
          return (ref$ = this._model) != null
            ? ref$
            : this._model = constructor.of(this.class_name || this.name);
        };
        function ChildAssociationEntity(){
          ChildAssociationEntity.superclass.apply(this, arguments);
        }
        return ChildAssociationEntity;
      }(AssociationEntity));
    }
  ]);
  app.factory("Class", [
    "$injector", function($injector){
      var Class;
      Class = (function(){
        Class.displayName = 'Class';
        var prototype = Class.prototype, constructor = Class;
        Class['new'] = function(){
          return new (this.bind.apply(this, [this].concat(arrayify(
          arguments))))();
        };
        Class.of = function(it){
          return $injector.get(it);
        };
        Class.snake_name = function(){
          var ref$;
          return (ref$ = this._snake_name) != null
            ? ref$
            : this._snake_name = (unenumerate("_snake_name")(
            this), underscorize(
            this.displayName));
        };
        Class.plural_snake_name = function(){
          var ref$;
          return (ref$ = this._plural_snake_name) != null
            ? ref$
            : this._plural_snake_name = (unenumerate("_plural_snake_name")(
            this), pluralize(
            this.snake_name()));
        };
        Class.superclasses = function(arg$){
          var limit;
          if (arg$ != null) {
            limit = arg$.til;
          }
          if (this.superclass == null) {
            return [];
          } else if (this.superclass.displayName === limit) {
            return [this.superclass];
          } else {
            return [this.superclass].concat(bind$(this.superclass, 'superclasses').apply(this, arguments));
          }
        };
        prototype.is_an_instance_of = function(class_){
          return this['class']() === class_ || in$(class_, this['class']().superclasses());
        };
        prototype['class'] = function(){
          return this.constructor;
        };
        function Class(){}
        return Class;
      }());
      return window.Class = Class;
    }
  ]);
  app.factory("DataStorage", [
    "Class", "memorizer", "grouper", function(Class, memorizer, grouper){
      var DataStorage;
      return DataStorage = (function(superclass){
        var prototype = extend$((import$(DataStorage, superclass).displayName = 'DataStorage', DataStorage), superclass).prototype, constructor = DataStorage;
        function DataStorage(storage){
          this.storage = storage != null
            ? storage
            : [];
        }
        prototype.data = function(){
          return this.storage;
        };
        prototype.find_all = function(params){
          params == null && (params = {});
          return grouper.group_in(this.storage, {
            where: params
          });
        };
        prototype.find = function(params){
          params == null && (params = {});
          return grouper.elm_in(this.storage, {
            where: params
          });
        };
        prototype.add = function(datum){
          return this.storage.push(datum);
        };
        prototype.remove = function(datum){
          return remove(datum)(
          this.storage);
        };
        prototype.reidentify = function(datum){
          return reidentify(
          this.storage);
        };
        prototype.memorize = function(value, arg$){
          var name, reminders;
          if (arg$ != null) {
            name = arg$.as, reminders = arg$['with'];
          }
          return memorizer.memorize(value, {
            as: name,
            'with': reminders,
            'in': this
          });
        };
        prototype.memoried_ = function(name, arg$){
          var reminders;
          if (arg$ != null) {
            reminders = arg$['with'];
          }
          return memorizer.memoried_(name, {
            'with': reminders,
            'in': this
          });
        };
        return DataStorage;
      }(Class));
    }
  ]);
  app.factory("Entity", [
    "Class", function(Class){
      var Entity;
      return Entity = (function(superclass){
        var prototype = extend$((import$(Entity, superclass).displayName = 'Entity', Entity), superclass).prototype, constructor = Entity;
        function Entity(seed){
          var this$ = this;
          each(function(it){
            return this$[it] = seed[it];
          })(
          keys(
          seed));
        }
        return Entity;
      }(Class));
    }
  ]);
  app.factory("HasManyAssociation", [
    "Association", "ChildAssociationEntity", function(Association, ChildAssociationEntity){
      var HasManyAssociation;
      return HasManyAssociation = (function(superclass){
        var prototype = extend$((import$(HasManyAssociation, superclass).displayName = 'HasManyAssociation', HasManyAssociation), superclass).prototype, constructor = HasManyAssociation;
        function HasManyAssociation(arg$){
          var child;
          this.me = arg$.me, child = arg$.child, this.strong = arg$.strong;
          this.child = ChildAssociationEntity['new'](child);
          this.create_methods();
          if (this.strong) {
            this.register_cbs();
          }
        }
        prototype.create_methods = function(){
          this.create_get_method();
          return this.create_build_method();
        };
        prototype.create_get_method = function(){
          var child, ref$, key$, ref1$;
          child = this.child;
          return (ref1$ = (ref$ = this.me.prototype)[key$ = child.plural_snake_name()]) != null
            ? ref1$
            : ref$[key$] = function(params){
              params == null && (params = {});
              params = (params[child.foreign_key_name()] = this.id, params);
              if (child.parent_alias != null) {
                params[child.foreign_type_name()] = this['class']().name;
              }
              return child.model().find_all(params);
            };
        };
        prototype.create_build_method = function(){
          var child;
          child = this.child;
          return this.me.prototype["new_" + child.snake_name()] = function(props){
            return child.model().build(props, {
              parent: this,
              by: child.parent_alias
            });
          };
        };
        prototype.register_cbs = function(){
          var me, child;
          me = this.me;
          child = this.child;
          return this.me.after("persistence", function(it){
            var new_children, results$ = [];
            while ((new_children = me.prototype[child.plural_snake_name()]()).length > 0) {
              it = new_children.pop();
              it[me.snake_name() + "_id"] = this.id;
              results$.push(it.persist());
            }
            return results$;
          });
        };
        return HasManyAssociation;
      }(Association));
    }
  ]);
  app.factory("Model", [
    "Entity", "DataStorage", "BelongsToAssociation", "HasManyAssociation", "memorizer", function(Entity, DataStorage, BelongsToAssociation, HasManyAssociation, memorizer){
      var Model;
      Model = (function(superclass){
        var prototype = extend$((import$(Model, superclass).displayName = 'Model', Model), superclass).prototype, constructor = Model;
        Model.instances = function(){
          var ref$;
          return (ref$ = this._instances) != null
            ? ref$
            : this._instances = (unenumerate("_instances")(
            this), new DataStorage);
        };
        Model.cbs = function(){
          var ref$;
          return (ref$ = this._cbs) != null
            ? ref$
            : this._cbs = (unenumerate("_cbs")(
            this), {
              after: {},
              before: {}
            });
        };
        Model.belongs_to = function(name, options){
          var class_name, polymorphic, foreign_type;
          if (options != null) {
            class_name = options.class_name, polymorphic = options.polymorphic, foreign_type = options.foreign_type;
          }
          return (this.associations || (this.associations = [])).push(BelongsToAssociation['new']({
            me: this,
            parent: import$({
              name: name
            }, options)
          }));
        };
        Model.has_many = function(name, options){
          var class_name, parent_alias, mediator_name, foreign_key, strong;
          if (options != null) {
            class_name = options.class_name, parent_alias = options.as, mediator_name = options.through, foreign_key = options.foreign_key, strong = options.strongly;
          }
          return (this.associations || (this.associations = [])).push(HasManyAssociation['new']({
            me: this,
            strong: strong,
            child: import$({
              name: name,
              parent_name: this.name,
              parent_alias: parent_alias,
              mediator_name: mediator_name
            }, options)
          }));
        };
        Model.find = function(params){
          return this.instances().find(params);
        };
        Model.find_all = function(params){
          return this.instances().find_all(params);
        };
        Model.add = function(instance){
          return this.instances().add(instance);
        };
        Model.remove = function(instance){
          return this.instances().remove(instance);
        };
        Model.after = function(){
          var i$, action_names, cb, this$ = this;
          action_names = 0 < (i$ = arguments.length - 1) ? slice$.call(arguments, 0, i$) : (i$ = 0, []), cb = arguments[i$];
          return each(function(it){
            var ref$;
            return ((ref$ = this$.cbs().after)[it] || (ref$[it] = [])).push(cb);
          })(
          action_names);
        };
        Model.before = function(){
          var i$, action_names, cb, this$ = this;
          action_names = 0 < (i$ = arguments.length - 1) ? slice$.call(arguments, 0, i$) : (i$ = 0, []), cb = arguments[i$];
          return each(function(it){
            var ref$;
            return ((ref$ = this$.cbs().before)[it] || (ref$[it] = [])).push(cb);
          })(
          action_names);
        };
        Model['new'] = function(){
          var x$;
          x$ = superclass['new'].apply(this, arguments);
          x$.fire_cbs_of("after", "new");
          return x$;
        };
        Model.build = function(props, arg$){
          var parent_instance, parent_name, x$;
          if (arg$ != null) {
            parent_instance = arg$.parent, parent_name = arg$.by;
          }
          x$ = this['new'](props);
          if (parent_instance != null) {
            x$.parent_to(parent_instance, {
              as: parent_name
            });
          }
          x$.fire_cbs_of("after", "build");
          return x$;
        };
        Model.memorize = function(value, arg$){
          var name, reminders;
          if (arg$ != null) {
            name = arg$.as, reminders = arg$['with'];
          }
          return memorizer.memorize(value, {
            as: name,
            'with': reminders,
            'in': this
          });
        };
        Model.memoried_ = function(name, arg$){
          var reminders;
          if (arg$ != null) {
            reminders = arg$['with'];
          }
          return memorizer.memoried_(name, {
            'with': reminders,
            'in': this
          });
        };
        Model.index_by = function(){
          var keys, this$ = this;
          keys = slice$.call(arguments);
          return each(function(key){
            this$.keys_for_index().push(key);
            this$["instances_for_" + key] = function(){
              var key$, ref$;
              return (ref$ = this[key$ = "_instances_for_" + key]) != null
                ? ref$
                : this[key$] = (unenumerate("_instances_for_" + key)(
                this), {});
            };
            this$["find_by_" + key] = function(it){
              return this["instances_for_" + key]()[it];
            };
            return this$.after("new", "persistence", function(){
              return this['class']()["instances_for_" + key]()[this[key]] = this;
            });
          })(
          keys);
        };
        Model.keys_for_index = function(){
          var ref$;
          return (ref$ = this._keys_for_index) != null
            ? ref$
            : this._keys_for_index = (unenumerate("_keys_for_index")(
            this), ['id']);
        };
        Model.index_by("id");
        prototype.fire_cbs_of = function(timing, action){
          var this$ = this;
          return each(function(it){
            var ref$;
            return each(function(it){
              return it.call(this$);
            })(
            (ref$ = it[timing])[action] || (ref$[action] = []));
          })(
          map(function(it){
            return it.cbs();
          })(
          [this['class']()].concat(this['class']().superclasses({
            til: "Model"
          }))));
        };
        prototype.parent_to = function(parent_instance, arg$){
          var parent_name, parent, this$ = this;
          if (arg$ != null) {
            parent_name = arg$.as;
          }
          parent = find(function(it){
            var that, ref$;
            if ((that = parent_name) != null) {
              return it.name === that;
            } else {
              return ((ref$ = it.model()) != null ? ref$.name : void 8) === parent_instance['class']().name;
            }
          })(
          map(function(it){
            return it.parent;
          })(
          filter(function(it){
            return it.parent != null;
          })(
          this['class']().associations)));
          if (parent != null) {
            this[parent.foreign_key_name()] = parent_instance.id;
            if (parent.polymorphic) {
              return this[parent.foreign_type_name()] = parent_instance['class']().name;
            }
          }
        };
        prototype.clear_cache = function(){
          var this$ = this;
          return each(function(it){
            var ref$;
            return ref$ = this$[it], delete this$[it], ref$;
          })(
          filter(function(it){
            return it[0] === "_";
          })(
          ownKeys(
          this)));
        };
        prototype.participate = function(){
          return this['class']().add(this);
        };
        prototype.secede = function(){
          return this['class']().remove(this);
        };
        prototype.stash_props = function(){
          return this._stashed_props = this.data();
        };
        prototype.stashed_props = function(){
          return this._stashed_props;
        };
        prototype.retrieve_stashed_props = function(){
          return import$(this, this.stashed_props());
        };
        prototype.stash_children = function(){
          var this$ = this;
          return each(function(it){
            var children_name;
            each(function(it){
              return it.stash_props();
            })(
            this$[children_name = it.child.plural_snake_name()]());
            return (this$._stashed_children || (this$._stashed_children = {}))[children_name] = this$[children_name]().slice();
          })(
          filter(function(it){
            return it.strong;
          })(
          this['class']().associations));
        };
        prototype.retrieve_stashed_children = function(){
          var this$ = this;
          return each(function(it){
            var x$, children_name;
            x$ = this$[children_name = it.child.plural_snake_name()]();
            x$.replace_with(this$._stashed_children[children_name]);
            x$.each(function(it){
              return it.retrieve_stashed_props();
            });
            return x$;
          })(
          filter(function(it){
            return it.strong;
          })(
          this['class']().associations));
        };
        prototype.data = function(){
          var this$ = this;
          return pairsToObj(
          map(function(it){
            return [it, this$[it]];
          })(
          reject(function(it){
            return it.charAt(0) === "_";
          })(
          ownKeys(
          this))));
        };
        prototype.is_new = function(){
          return this.id == null;
        };
        prototype.is_pristine = function(){
          var this$ = this;
          return all(function(it){
            return this$.stashed_props()[it] === this$[it];
          })(
          keys(
          this.stashed_props()));
        };
        prototype.is_dirty = function(){
          return !this.is_pristine();
        };
        prototype.type_is = function(type_name){
          return this.type === type_name;
        };
        prototype.type_in = function(){
          var type_names;
          type_names = slice$.call(arguments);
          return in$(this.type, type_names);
        };
        prototype.memorize = function(value, arg$){
          var name, reminders;
          if (arg$ != null) {
            name = arg$.as, reminders = arg$['with'];
          }
          return memorizer.memorize(value, {
            as: name,
            'with': reminders,
            'in': this
          });
        };
        prototype.memoried_ = function(name, arg$){
          var reminders;
          if (arg$ != null) {
            reminders = arg$['with'];
          }
          return memorizer.memoried_(name, {
            'with': reminders,
            'in': this
          });
        };
        function Model(){
          Model.superclass.apply(this, arguments);
        }
        return Model;
      }(Entity));
      return window.Model = Model;
    }
  ]);
  app.factory("ParentAssociationEntity", [
    "AssociationEntity", function(AssociationEntity){
      var ParentAssociationEntity;
      return ParentAssociationEntity = (function(superclass){
        var prototype = extend$((import$(ParentAssociationEntity, superclass).displayName = 'ParentAssociationEntity', ParentAssociationEntity), superclass).prototype, constructor = ParentAssociationEntity;
        prototype.foreign_type_name = function(){
          var ref$;
          return (ref$ = this._foreign_type_name) != null
            ? ref$
            : this._foreign_type_name = this.foreign_type || this.snake_name() + "_type";
        };
        prototype.foreign_key_name = function(){
          var ref$;
          return (ref$ = this._foreign_key_name) != null
            ? ref$
            : this._foreign_key_name = this.foreign_key || this.snake_name() + "_id";
        };
        prototype.model = function(arg$){
          var subject, that;
          if (arg$ != null) {
            subject = arg$.subject;
          }
          switch (false) {
          case !this.polymorphic:
            if ((that = subject) != null) {
              return constructor.of(that[this.foreign_type_name()]);
            }
            break;
          default:
            return constructor.of(this.class_name || this.name);
          }
        };
        function ParentAssociationEntity(){
          ParentAssociationEntity.superclass.apply(this, arguments);
        }
        return ParentAssociationEntity;
      }(AssociationEntity));
    }
  ]);
  app.factory("Resource", [
    "connection", "AppModel", "DataStorage", "utility-functions", function(connection, AppModel, DataStorage, _){
      var propsToStr, Resource;
      propsToStr = _.propsToStr;
      return Resource = (function(superclass){
        var src_and_params_from, prototype = extend$((import$(Resource, superclass).displayName = 'Resource', Resource), superclass).prototype, constructor = Resource;
        src_and_params_from = function(src, params, subject){
          var required_keys, that;
          required_keys = (that = src.match(/:[^/]+/g))
            ? map(function(it){
              return it.slice(1);
            })(
            that)
            : [];
          return {
            src: src.replace(/:([^/]+)/g, function(){
              return params[arguments[1]] || (subject != null ? subject[arguments[1]] : void 8) || "";
            }),
            params: pairsToObj(
            map(function(it){
              return [it, params[it]];
            })(
            reject((function(it){
              return in$(it, required_keys);
            }))(
            keys(
            params))))
          };
        };
        Resource.fetched_bools = function(){
          var ref$;
          return (ref$ = this._fetched_bools) != null
            ? ref$
            : this._fetched_bools = (unenumerate("_fetched_bools")(
            this), {});
        };
        Resource.instance_groups = function(){
          var ref$;
          return (ref$ = this._instance_groups) != null
            ? ref$
            : this._instance_groups = (unenumerate("_instance_groups")(
            this), {});
        };
        Resource.params_for_fetch = function(){
          var ref$;
          return (ref$ = this._params_for_fetch) != null
            ? ref$
            : this._params_for_fetch = (unenumerate("_params_for_fetch")(
            this), []);
        };
        Resource.param_keys_for_fetch = function(){
          return this.keys_for_fetch || keys(
          last(
          this.params_for_fetch()));
        };
        Resource.src = function(){
          return "/" + this.plural_snake_name() + "/:id";
        };
        Resource.fetch = function(params, cb){
          var ref$, src, query_params, this$ = this;
          params == null && (params = {});
          if (all(function(it){
            return !equals(it, params);
          })(
          this.params_for_fetch())) {
            this.params_for_fetch().push(params);
            ref$ = src_and_params_from(this.src(), params), src = ref$.src, query_params = ref$.params;
            return connection.get(src, {
              params: query_params
            }, function(res){
              var instances;
              this$.fetched_bools()[propsToStr(
              params)] = true;
              this$.instance_groups()[propsToStr(
              params)] = new DataStorage(instances = map(function(it){
                return this$['new'](it);
              })(
              res.data));
              if (typeof cb == 'function') {
                cb(instances, res);
              }
              return this$.fire_cbs_of("after", "fetch");
            });
          }
        };
        Resource.refetch_all = function(){
          var this$ = this;
          each(function(it){
            remove(it)(
            this$.params_for_fetch());
            return this$.fetch(it);
          })(
          map(function(it){
            return it;
          })(
          this.params_for_fetch()));
        };
        Resource.fire_cbs_of = function(timing, action){
          var this$ = this;
          return each(function(it){
            var ref$, ref1$;
            return each(function(it){
              return it.call(this$);
            })(
            (ref$ = (ref1$ = it.cbs())[timing] || (ref1$[timing] = {}))[action] || (ref$[action] = []));
          })(
          [this].concat(this.superclasses({
            til: "Model"
          })));
        };
        Resource.instance_group = function(params){
          var that, str;
          params == null && (params = {});
          if ((that = this.instance_groups()[str = propsToStr(
          params)]) != null) {
            return that;
          } else {
            return this.instance_groups()[str] = new DataStorage;
          }
        };
        Resource.find = function(params){
          var parts, group_params, other_params, this$ = this;
          params == null && (params = {});
          parts = partition(function(it){
            return in$(it, this$.param_keys_for_fetch());
          })(
          keys(
          params));
          group_params = pairsToObj(
          map(function(it){
            return [it, params[it]];
          })(
          parts[0]));
          other_params = pairsToObj(
          map(function(it){
            return [it, params[it]];
          })(
          parts[1]));
          if (all(function(it){
            return !equals(it, group_params);
          })(
          this.params_for_fetch())) {
            this.fetch(group_params);
          }
          return this.instance_group(group_params).find(other_params);
        };
        Resource.find_all = function(params){
          var parts, group_params, other_params, this$ = this;
          params == null && (params = {});
          parts = partition(function(it){
            return in$(it, this$.param_keys_for_fetch());
          })(
          keys(
          params));
          group_params = pairsToObj(
          map(function(it){
            return [it, params[it]];
          })(
          parts[0]));
          other_params = pairsToObj(
          map(function(it){
            return [it, params[it]];
          })(
          parts[1]));
          if (all(function(it){
            return !equals(it, group_params);
          })(
          this.params_for_fetch())) {
            this.fetch(group_params);
          }
          return this.instance_group(group_params).find_all(other_params);
        };
        Resource.add = function(instance){
          var groups;
          return each(function(it){
            groups[it].add(instance);
            return groups[it].reidentify();
          })(
          filter(function(it){
            return propsMatch(strToProps(
            it))(
            instance);
          })(
          keys(
          groups = this.instance_groups())));
        };
        Resource.remove = function(instance){
          var groups;
          return each(function(it){
            groups[it].remove(instance);
            return groups[it].reidentify();
          })(
          filter(function(it){
            return propsMatch(strToProps(
            it))(
            instance);
          })(
          keys(
          groups = this.instance_groups())));
        };
        Resource.is_fetched = function(params){
          params == null && (params = {});
          return this.fetched_bools()[propsToStr(
          params)];
        };
        Resource['new'] = function(){
          var x$, instance;
          x$ = instance = superclass['new'].apply(this, arguments);
          x$.fire_cbs_of("after", "new");
          return x$;
        };
        prototype.src = function(){
          var ref$;
          return (ref$ = this._src) != null
            ? ref$
            : this._src = src_and_params_from(this['class']().src(), {}, this).src;
        };
        prototype.persist = function(success_cb, error_cb){
          var this$ = this;
          this.fire_cbs_of("before", "persistence");
          return connection.post(this.src(), this.data(), function(res){
            import$(this$, res.data);
            this$.participate();
            this$.fire_cbs_of("after", "persistence");
            if (res.is_ok) {
              return typeof success_cb == 'function' ? success_cb(res) : void 8;
            } else {
              return typeof error_cb == 'function' ? error_cb(res) : void 8;
            }
          });
        };
        prototype.update = function(success_cb, error_cb){
          var this$ = this;
          this.fire_cbs_of("before", "update");
          if (this.is_dirty()) {
            return connection.put(this.src(), this.data(), function(res){
              this$.fire_cbs_of("after", "update");
              if (res.is_ok) {
                return typeof success_cb == 'function' ? success_cb(res) : void 8;
              } else {
                return typeof error_cb == 'function' ? error_cb(res) : void 8;
              }
            });
          } else {
            this.fire_cbs_of("after", "update");
            return typeof success_cb == 'function' ? success_cb() : void 8;
          }
        };
        prototype['delete'] = function(success_cb, error_cb){
          var this$ = this;
          this.fire_cbs_of("before", "delete");
          return connection['delete'](this.src(), function(res){
            this$.secede();
            this$.fire_cbs_of("after", "delete");
            if (res.is_ok) {
              return typeof success_cb == 'function' ? success_cb(res) : void 8;
            } else {
              return typeof error_cb == 'function' ? error_cb(res) : void 8;
            }
          });
        };
        function Resource(){
          Resource.superclass.apply(this, arguments);
        }
        return Resource;
      }(AppModel));
    }
  ]);
  app.provider("connection", ConnectionProvider = (function(){
    ConnectionProvider.displayName = 'ConnectionProvider';
    var prototype = ConnectionProvider.prototype, constructor = ConnectionProvider;
    prototype.type = "$http";
    prototype.$get = [
      "$http", "$rootScope", "sailsSocket", function($http, $rootScope, sailsSocket){
        switch (this.type) {
        case "$http":
          return {
            get: function(url, options, cb){
              if (isA("function")(
              arguments[1])) {
                url = arguments[0], cb = arguments[1];
                options = {};
              }
              return $http.get(url, options).then(function(it){
                return typeof cb == 'function' ? cb((it.is_ok = it.status === 200, it)) : void 8;
              });
            },
            post: function(url, data, cb){
              return $http.post(url, data).then(function(it){
                return typeof cb == 'function' ? cb((it.is_ok = it.status === 200, it)) : void 8;
              });
            },
            put: function(url, data, cb){
              return $http.put(url, data).then(function(it){
                return typeof cb == 'function' ? cb((it.is_ok = it.status === 200, it)) : void 8;
              });
            },
            'delete': function(url, cb){
              return $http['delete'](url).then(function(it){
                return typeof cb == 'function' ? cb((it.is_ok = it.status === 200, it)) : void 8;
              });
            }
          };
        case "sailsSocket":
          return {
            get: function(url, options, cb){
              if (isA("function")(
              arguments[1])) {
                url = arguments[0], cb = arguments[1];
                options = {};
              }
              return sailsSocket.get(url, options.params, function(data, res){
                return $rootScope.$apply(typeof cb == 'function' ? cb((res.is_ok = res.statusCode === 200, res.data = data, res)) : void 8);
              });
            },
            post: function(url, data, cb){
              return sailsSocket.post(url, data, function(data, res){
                return $rootScope.$apply(typeof cb == 'function' ? cb((res.is_ok = res.statusCode === 200, res.data = data, res)) : void 8);
              });
            },
            put: function(url, data, cb){
              return sailsSocket.put(url, data, function(data, res){
                return $rootScope.$apply(typeof cb == 'function' ? cb((res.is_ok = res.statusCode === 200, res.data = data, res)) : void 8);
              });
            },
            'delete': function(url, cb){
              return sailsSocket['delete'](url, function(data, res){
                return $rootScope.$apply(typeof cb == 'function' ? cb((res.is_ok = res.statusCode === 200, res.data = data, res)) : void 8);
              });
            }
          };
        }
      }
    ];
    function ConnectionProvider(){}
    return ConnectionProvider;
  }()));
  app.factory("grouper", [
    "memorizer", "$rootScope", function(memorizer, $rootScope){
      var grouper;
      grouper = function(){};
      window.grouper = grouper;
      grouper.elm_in = function(arr, arg$){
        var params, requirements;
        params = arg$.where, requirements = arg$['with'];
        if (params == null) {
          return arr[0];
        }
        return this.group_in.apply(this, arguments)[0];
      };
      grouper.group_in = function(arr, arg$){
        var params, requirements, groups, param_keys, key$;
        params = arg$.where, requirements = arg$['with'];
        if (params == null) {
          return arr;
        }
        groups = this.groups_of(arr, {
          by: keys(
          params),
          'with': requirements
        });
        if (any(function(it){
          return isAn("array")(
          it);
        })(
        values(
        params))) {
          param_keys = keys(
          params);
          groups[key$ = propsToStr(
          params)] == null && (groups[key$] = concat(
          compact(
          map(function(it){
            return groups[it];
          })(
          map(function(it){
            return propsToStr(
            listsToObj(param_keys, it));
          })(
          map(function(it){
            return flatten(
            [it]);
          })(
          fold1(curry$(function(ys, xs){
            return multiplyWith(ys)(
            xs);
          }))(
          map(function(it){
            if (!isAn("array")(
            it)) {
              return [it];
            } else {
              return it;
            }
          })(
          values(
          params)))))))));
        }
        return groups[key$ = propsToStr(
        params)] || (groups[key$] = []);
      };
      grouper.groups_of = function(arr, arg$){
        var dividers, requirements, that, reminders;
        dividers = arg$.by, requirements = arg$['with'];
        if ((that = memorizer.memoried_("groups", {
          'with': reminders = [arr].concat(dividers),
          'in': this
        })) != null) {
          return that;
        } else {
          return memorizer.memorize(groupBy(function(elm){
            return propsToStr(
            pairsToObj(
            map(function(it){
              return [
                it, $rootScope.$eval("it." + it, {
                  it: import$(elm, requirements)
                })
              ];
            })(
            dividers)));
          })(
          arr), {
            as: "groups",
            'with': reminders,
            'in': this
          });
        }
      };
      return grouper;
    }
  ]);
  app.factory("memorizer", [function(){
    var memorizer;
    memorizer = function(){};
    memorizer.memorize = function(value, arg$){
      var name, reminders, storage, prefix, key, ref$, key$;
      if (arg$ != null) {
        name = arg$.as, reminders = arg$['with'], storage = arg$['in'], prefix = arg$.prefix;
      }
      key = join("_")(
      map(function(it){
        return identity(
        it);
      })(
      reminders));
      return ((ref$ = storage != null
        ? storage
        : storage = this)[key$ = (prefix || "_") + "" + name] || (ref$[key$] = {}))[key] = value;
    };
    memorizer.memoried_ = function(name, arg$){
      var reminders, storage, prefix, key, ref$;
      if (arg$ != null) {
        reminders = arg$['with'], storage = arg$['in'], prefix = arg$.prefix;
      }
      key = join("_")(
      map(function(it){
        return identity(
        it);
      })(
      reminders));
      return (ref$ = (storage != null
        ? storage
        : storage = this)[(prefix || "_") + "" + name]) != null ? ref$[key] : void 8;
    };
    memorizer.all_memoried_ = function(name, arg$){
      var storage, prefix;
      if (arg$ != null) {
        storage = arg$['in'], prefix = arg$.prefix;
      }
      return values(
      (storage != null
        ? storage
        : storage = this)[(prefix || "_") + "" + name] != null);
    };
    return memorizer;
  }]);
  app.constant("sailsSocket", typeof io != 'undefined' && io !== null ? io.socket : void 8);
  app.constant("utility-functions", {
    isA: curry$(function(type, obj){
      return isType(capitalize(
      camelize(
      type)))(
      obj);
    }),
    isAn: curry$(function(type, obj){
      return isType(capitalize(
      camelize(
      type)))(
      obj);
    }),
    have: curry$(function(obj, xs){
      return xs.indexOf(obj) > -1;
    }),
    sumBy: curry$(function(f, xs){
      return sum(
      map(f)(
      xs));
    }),
    prevOf: curry$(function(obj, xs){
      var index;
      if ((index = xs.indexOf(obj)) > -1) {
        return xs[index - 1];
      }
    }),
    nextOf: curry$(function(obj, xs){
      var index;
      if ((index = xs.indexOf(obj)) > -1) {
        return xs[index + 1];
      }
    }),
    havePrevOf: curry$(function(obj, xs){
      return xs.indexOf(obj) > 1;
    }),
    haveNextOf: curry$(function(obj, xs){
      var ref$;
      return -1 < (ref$ = xs.indexOf(obj)) && ref$ < xs.length;
    }),
    add: curry$(function(obj, xs){
      xs.push(obj);
      return xs;
    }),
    remove: curry$(function(obj, xs){
      var index;
      if ((index = xs.indexOf(obj)) > -1) {
        return xs.splice(index, 1);
      }
    }),
    count: function(xs){
      return xs.length;
    },
    isSameContentsWith: curry$(function(xs, ys){
      return all(function(it){
        return in$(it, ys);
      })(
      xs) && all(function(it){
        return in$(it, xs);
      })(
      ys);
    }),
    unpack: function(xs){
      var rs;
      rs = [];
      each(function(it){
        return each(function(it){
          return rs.push(it);
        })(
        it);
      })(
      xs);
      return rs;
    },
    multiplyWith: curry$(function(xs, ys){
      return unpack(
      map(function(x){
        return map(function(y){
          return [x, y];
        })(
        ys);
      })(
      xs));
    }),
    splitWith: curry$(function(x, xs){
      return splitAt(xs.indexOf(x))(
      xs);
    }),
    pure: function(x){
      return [x];
    },
    unpure: function(xs){
      return xs[0];
    },
    ownKeys: function(subject){
      return filter(function(it){
        return subject.hasOwnProperty(it);
      })(
      keys(
      subject));
    },
    ownValues: function(subject){
      return map(function(it){
        return subject[it];
      })(
      ownKeys(
      subject));
    },
    identify: function(){
      var count;
      count = 0;
      return function(obj){
        if (obj.id == null) {
          Object.defineProperty(obj, "id", {
            enumerable: false,
            configurable: true,
            value: count++
          });
        }
        return obj;
      };
    }(),
    reidentify: function(obj){
      delete obj.id;
      return identify(
      obj);
    },
    equals: curry$(function(obj, sub){
      return angular.equals(sub, obj);
    }),
    define: Object.defineProperty,
    unenumerate: curry$(function(prop, obj){
      return define(obj, prop, {
        enumerable: false,
        configurable: true,
        writable: true
      });
    }),
    propsToStr: function(obj){
      if (isAn("object")(
      obj)) {
        return JSON.stringify(
        pairsToObj(
        sortBy(function(it){
          return it[0];
        })(
        objToPairs(
        obj))));
      } else {
        return JSON.stringify(
        obj);
      }
    },
    strToProps: function(str){
      return JSON.parse(
      str);
    },
    propsMatch: curry$(function(x, y){
      return all(function(it){
        return x[it] == y[it];
      })(
      keys(
      x));
    }),
    except: curry$(function(key, obj){
      return pairsToObj(
      reject(function(it){
        return it[0] === key;
      })(
      objToPairs(
      obj)));
    }),
    underscorize: function(str){
      return replace(/-/g, "_")(
      dasherize(
      str));
    },
    tableize: function(str){
      return pluralize(
      underscorize(
      str));
    },
    classify: function(str){
      return capitalize(
      camelize(
      str));
    },
    replace: curry$(function(old, new_str, str){
      return str.replace(old, new_str);
    }),
    trim: function(str){
      return str.replace(/\s/g, "");
    },
    unimplemented: function(){
      var caller_names;
      caller_names = [];
      return function(){
        var name;
        if (!in$(name = traces()[2], caller_names)) {
          caller_names.push(name);
          return console.warn(name + " is unimplemented.");
        }
      };
    }(),
    traceStr: function(){
      var that, obj;
      if ((that = Error.captureStackTrace) != null) {
        that(obj = {}, traceStr);
        return obj.stack;
      } else {
        return "";
      }
    },
    traces: function(){
      return map(function(it){
        return it.match(/at\s+(\S+)/)[1];
      })(
      tail(
      traceStr().split("\n")));
    },
    arrayify: function(it){
      return [].slice.call(it);
    },
    matchToAny: curry$(function(searched_strs, word){
      return any(function(it){
        return it != null ? it.match(word) : void 8;
      })(
      searched_strs);
    }),
    nonEmpty: function(it){
      return !empty(it);
    },
    now: function(){
      return new Date();
    },
    bindingImport: curry$(function(src, obj){
      var key;
      for (key in src) {
        if (src.hasOwnProperty(key)) {
          obj[key] = src[key];
        }
      }
      return obj;
    }),
    identity: function(obj){
      switch (false) {
      case !(isAn("object")(
      obj) || isAn("array")(
      obj)):
        return obj.name || (typeof obj.name == 'function' ? obj.name() : void 8) || obj.id || obj.id || identify(
        obj).id;
      default:
        return obj;
      }
    },
    roundPrecision: curry$(function(precision, number){
      var point;
      return round(
      number * (point = pow(10)(
      precision))) / point;
    }),
    startsWith: function(s, str){
      return str.slice(0, s.length) === s;
    }
  });
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
