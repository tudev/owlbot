// Description
//  Find mentors for specific technology

var _ = require('underscore');

module.exports = function(robot){
    function getMentors() {
        return robot.brain.get("tudev_mentors") || [];
    }

    function getJavaMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.java > 0
        }), function(m){
            return m.java;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    robot.respond(/ i need help with/i, function(msg){
        console.log(msg.envelope.message.text);
        var messageText = msg.envelope.message.text;
        var messageTextArray = messageText.split(' ');
        var subject = messageTextArray[messageTextArray.length-1];
        switch (subject) {
            case 'java':
                console.log(getJavaMentors(4));
                break;
            case 'c':
                console.log("coming soon");
                break;
            default:
                if (subject === 'with'){
                    console.log('what do you need?');
                }else {

                    console.log('we do not have'  + subject);
                }

                break;
        }
        
    });
}
