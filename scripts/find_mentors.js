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

    robot.respond(/java mentors/i, function(msg){
        console.log(getJavaMentors(4))
    });
}
