// Description
//  who to pm
//
//  Author:
//  Ramanjit Khakh person@temple.edu

var _ = require('underscore');

module.exports = function(robot){
	var room_admins = process.env.MENTOR_ADMINS || ''
	var WATCH_ROOMS = room_admins.replace(' ', '').split(',')

	function getActiveUsers() {
    	return robot.brain.get("active_users") || [];
  	}

	function getUsers(){
		var userString = [];
		var topActive = _.sortBy(getActiveUsers(), function(user){
    		userString.push({
		        id: user.id,
		        name: user.name
		      });
    		return user;
    	});

    	return userString;
	}


	robot.respond(/message active/i, function(msg){
		_.each(getUsers(), function(user){


			if( WATCH_ROOMS.indexOf(msg.message.room) != -1 ){
				msg.send("i have to message " + user.name);
				robot.send({
				  	room: user.name
					}, "Hello! Can you take a survey for us? https://docs.google.com/a/temple.edu/forms/d/1c6SUzjE4VUpiVNQMDtrm1-opT7EzZCxh90wdGZxhVEQ/alreadyresponded?entry.2032465319=" + user.id);
				// TODO add function to update sent list
				sentList(user);
			} else {
				robot.send({
				  	room: msg.message.room
					}, "Sorry, you are not allowed too message all active users" );
				throw ExceptionError;//short out of foreach
			}
		});

	});
	robot.respond(/clearAll/i, function(msg){
		robot.brain.set("sent", [] );
	});

	function getDevList(){
		return robot.brain.get("sent") || [];
	}

	function sentList(user){
		var List = getDevList();
		if( _.isUndefined(List ) ){
			//new list

			var users = getActiveUsers();
		    var _user = _.find(users, {id: user.id});

		    if(_.isUndefined(_user)){
		      users.push({
		        id: user.id,
		        name: user.name
		      });
		  	}

			robot.brain.set("sent", users);
		} else {
			var newUser = _.find(List, {id: user.id});
			if( _.isUndefined(newUser) ){
				List.push(user);
				robot.brain.set("sent", List);
			}
		}

	}
}
