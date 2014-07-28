(function(window, App){
  /////////////////////////////////////////////
  // ROUTES ///////////////////////////////////
  /////////////////////////////////////////////

  App.IndexRoute = Ember.Route.extend({
    model: function(){
      return this.store.find('user', 'owner');
    }
  });

  App.ProjectsRoute = Ember.Route.extend({
    model: function() {
      return this.store.findAll('project');
    }
  });

  App.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function(transition) {
      var self = this;
      var authed = this.get('auth.didLoad');

      return authed.then(function(){
        return new Ember.RSVP.Promise(function(resolve, reject) {
          if(self.get('auth.authenticated')) {
            resolve();
          }
          else {
            self.redirectToLogin(transition);
            reject();
          }
        });
      });
    },

    redirectToLogin: function(transition) {
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);

      this.transitionTo('login');
    },

    actions: {
      error: function(reason, transition) {
        if(reason.status !== 200) {
          this.redirectToLogin(transition);
        }
        else {
          alert('another auth thing failed');
          console.log(reason.status);
        }
      }
    }
  });

  App.AdminRoute = App.AuthenticatedRoute.extend({
    model: function() {
      return this.store.findAll('message');
    }
  });

  App.LoginRoute = Ember.Route.extend({
    beforeModel: function(transition) {
      if(this.get('auth.authenticated')) {
        this.transitionTo('admin');
      }
    },

    setupController: function(controller, context) {
      controller.reset();
    }
  });
})(window, window.App);