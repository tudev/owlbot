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
    		userString.push(user.name + ' ' + user.id  );
    		return user;
    	});
    	console.log(topActive);
    	console.log(userString);
    	
    	return userString;
	}


	robot.respond(/message active/i, function(msg){
		msg.send("i have to message " + getUsers());
		_.each(getUsers(), function(user){
			var userInfo = user.split(' ');
			console.log("messaging "+userInfo[0]);
			robot.send({
			  room: userInfo[0]
			}, "Hello! Can you take a survey for us? https://docs.google.com/a/temple.edu/forms/d/1c6SUzjE4VUpiVNQMDtrm1-opT7EzZCxh90wdGZxhVEQ/alreadyresponded?entry.2032465319=" + userInfo[1]);
		});
		/*robot.send({
		  room: message.envelope.user.name
		}, message);*/
	});
}