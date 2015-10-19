// Description
//  who to pm
//
//  Author:
//  Ramanjit Khakh person@temple.edu

var _ = require('underscore');

module.exports = function(robot){

	function getActiveUsers() {
    	return robot.brain.get("active_users") || [];
  	}

	function getUsers(){
		var userString = [];
		var topActive = _.sortBy(getActiveUsers(), function(user){
    		console.log(user.name);
    		userString.push(user.name);
    		return user;
    	});
    	console.log(topActive);
    	console.log(userString);
    	
    	return userString;
	}

	robot.respond(/message active/i, function(msg){
		msg.send("i have to message " + getUsers());
		_.each(getUsers(), function(user){
			console.log("messaging "+user);
			robot.send({
			  room: user
			}, "Hello! Can you take a survey for us?");
		});
		/*robot.send({
		  room: message.envelope.user.name
		}, message);*/
	});
}