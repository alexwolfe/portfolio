window.App = null;

(function (window) {
  var App;

  ////////////////////////////////////////////////////////////
  // App
  ////////////////////////////////////////////////////////////

  window.App = App = Ember.Application.create({
    LOG_TRANSITIONS: true, // basic logging of successful transitions
    LOG_TRANSITIONS_INTERNAL: true, // detailed logging of all routing steps

    ready: function() {
      this.register('auth:main', App.Auth, {singleton: true});

      ['controller', 'route', 'component', 'model'].forEach(function(type) {
        this.inject(type, 'auth', 'auth:main');
      }, this);
    }
  });


  // FIREBASE AUTH CLASS //////////////////
  App.Auth = Ember.Object.extend({
    ref: null,
    client: null,
    authenticated: false,
    user: null,
    didLoad: null,
    error: null,

    init: function() {
      var loaded = Ember.RSVP.defer();
      var auth = this;
      this.set('didLoad', loaded.promise);
      this.set('ref', new Firebase('https://airwolfe.firebaseio.com'));

      this.set('client', new FirebaseSimpleLogin(this.get('ref'), function(error, user) {

        if(user) {
          auth.setProperties({
            user: user,
            authenticated: true,
            error: null
          });
        }
        else if(error) {
          auth.setProperties({
            user: null,
            authenticated: false,
            error: error
          });
        }
        else {
          auth.setProperties({
            user: null,
            authenticated: false,
            error: null
          });
        }

        loaded.resolve();
      }));
    }
  });


  ////////////////////////////////////////////////////////////
  // EmberData
  ////////////////////////////////////////////////////////////
  App.ApplicationAdapter = DS.FirebaseAdapter.extend({firebase: new Firebase('https://airwolfe.firebaseio.com/')});

  ////////////////////////////////////////////////////////////
  // Routes
  ////////////////////////////////////////////////////////////

  App.Router.map(function() {
    this.resource('projects');
    this.resource('project', {path: 'project/:name'});


    this.resource('admin', function() {
      this.route('profile');
      this.route('work');
    });

    this.route('login');
    this.route('createuser');
    this.route('contact');
  });


})(window);