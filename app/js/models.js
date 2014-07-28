(function(window, App){
  /////////////////////////////////////////////////////
  // MODELS ///////////////////////////////////////////
  /////////////////////////////////////////////////////

  App.User = DS.Model.extend({
    name: DS.attr('string'),
    age: DS.attr('number'),
    location: DS.attr('string'),
    tagline: DS.attr('string'),
    bio: DS.attr('string'),
    avatar: DS.attr('string'),
    email: DS.attr('string'),
    twitter: DS.attr('string'),
    facebook: DS.attr('string'),
    dribbble: DS.attr('string'),
    linkedin: DS.attr('string')
  });

  App.Project = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    date: DS.attr('string'),
    inprogress: DS.attr('boolean'),
    hero: DS.belongsTo('hero', {async: true}),
    screenshots: DS.hasMany('screenshot', {async: true}),
    tools: DS.hasMany('tool', {async: true})
  });

  App.Message = DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    message: DS.attr('string')
  });

  App.Tool = DS.Model.extend({
    name: DS.attr('string'),
    version: DS.attr('string')
  });

  App.Hero = DS.Model.extend({
    url: DS.attr('string'),
    name: DS.attr('string')
  });

  App.Screenshot = DS.Model.extend({
    url: DS.attr('string'),
    name: DS.attr('string')
  });
})(window, window.App);