// Description
//  Get all active users.
//
//  Author:
//  Sam Couch <sam@couch.rocks>

var _ = require('underscore');
var moment = require('moment');

module.exports = function(robot){
  var WATCH_ROOMS = ['general', 'hackers', 'tudev'];
  var START_DATE = new Date("October 18, 2015");

  function getActiveUsers() {
    return robot.brain.get("active_users") || [];
  }

  function getTop(n){
    var topActive = _.sortBy(getActiveUsers(), function(user){
      return user.total_messages;
    });

    topActive.reverse();

    return _.first(topActive, n);
  }

  function addOrUpdate(user){
    var users = getActiveUsers();
    var _user = _.find(users, {id: user.id});

    if(_.isUndefined(_user)){
      users.push({
        id: user.id,
        name: user.name,
        last_seen: new Date(),
        total_messages: 1
      });
    } else {
      _user.name = user.name; // in case they changed their name
      _user.last_seen = new Date();
      _user.total_messages++;

      users = _.reject(users, {id: user.id});
      users.push(_user);
    }

    updateBrain(users);
  }

  function updateBrain(users){
    robot.brain.set('active_users', users);
  }

  robot.hear(/(.*)/i, function(msg){
    if (WATCH_ROOMS.indexOf(msg.envelope.message.room) != -1)
      addOrUpdate(msg.envelope.user);
  });

  robot.respond(/active count/i, function(msg){
    msg.send("Since I started paying attention ("+ moment(START_DATE).format('ll') +"), I've seen " + getActiveUsers().length + " active users.");
  });

  robot.respond(/most active/i, function(msg){
    var top = getTop(10);
    var names = _.map(top, function(user, index){
      return (index+1 + ". " + user.name + ", " + user.total_messages);
    });

    names.unshift("Since " + moment(START_DATE).format('ll') + ":");

    msg.send(names.join('\n'));
  });
}
