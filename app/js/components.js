(function (window, App) {

  App.HeroFullComponent = Ember.Component.extend({
    tagName: 'div',
    classNames: ['hero hero-full'],

    willInsertElement: function() {
      console.log('will insert ');
    },

    didInsertElement: function() {
      var height = $(window).height();
      var width = $(window).width();
      var element = this.get('element');

      $(element).css({
        height: height

      });

    }
  });


  App.BioCardComponent = Ember.Component.extend({
    tagName: 'figure',
    classNames: ['bio']
  });
})(window, window.App);