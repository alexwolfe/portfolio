(function (window, App) {

  ///////////////////////////////////////////
  // CONTROLLERS ////////////////////////////
  ///////////////////////////////////////////
  App.AdminController = Ember.ArrayController.extend({
    actions: {
      logout: function() {
        var client = this.get('auth.client');
        client.logout();

        this.transitionToRoute('index');
      }
    }
  });

  App.LoginController = Ember.Controller.extend({
    init: function() {
      console.log(this.get('session'));
    },

    reset: function() {
      this.setProperties({
        username: '',
        password: '',
        errorMessage: ''
      });
    },

    error: Ember.computed.alias('auth.error'),

    authStatusChanged: function() {
      if(this.get('auth.authenticated')) {
        this.transitionToRoute('admin');
      }
      else {
        console.log('not authed');
      }
    }.observes('auth.authenticated'),

    actions: {
      login: function() {
        var data = this.getProperties('email', 'password');
        var client = this.get('auth.client');



        client.login('password', {
          email: data.email,
          password: data.password,
          rememberMe: true
        });

        console.log(this.get('error'));

        //RESET ERROR MESSAGE
        this.set('errorMessage', null);
      }
    }
  });


  App.CreateuserController = Ember.Controller.extend({

    actions: {
      create: function() {
        var info = this.getProperties('email', 'password');
        var client = this.get('auth.client');

        client.createUser(info.email, info.password, function(error, user) {
          if (!error) {
            console.log('User Id: ' + user.id + ', Email: ' + user.email);
          }
        });
        console.log(info);
      }
    }
  });
})(window, window.App);
