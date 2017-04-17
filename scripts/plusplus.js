/* 
 * Custom ++/-- script to handle people ++'ing stuff.
 * 
 * Features
 * 
 *   Per user rate limiting
 *   Tracking totals
 *   
 */

module.exports = function (robot) {
    
    //This initilizes the plusplus object.  So shit is gonna get overridden 
    //everytime we connect to redis.  I think?
    robot.brain.on('loaded', function () {
        robot.brain.plusplus = {
            users: [],
            words: []
        };
    });

    /**
     * ++ - Increment points of target
     * */
    robot.respond('/(.*)\\+\\+/', function (msg) {
        var target = msg.match[1];
        var user = msg.message.user.name;
        var t;
        if (clearedTimeout(user)) {
            t = robot.brain.plusplus.words.target || 0;
            robot.brain.plusplus.words.target = t + 1;
            setTimeout(user);
        }
    });

    /**
     * -- - Decrement points of target
     * */
    robot.respond('/(.*)\\\-\\\-/', function (msg) {
        var target = msg.match[1];
        var user = msg.message.user.name;
        var t;
        if (clearedTimeout(user)) {
            t = robot.brain.plusplus.words.target || 0;
            robot.brain.plusplus.words.target = t - 1;
            setTimeout(user);
        }
    });

    /**
     * points - returns current total points of target
     * */
    robot.respond('/points (.*)/', function (msg) {
        var target = msg.match[1];
        var user = msg.message.user.name;
        if (clearedTimeout(user)) {
            var p = robot.brain.plusplus.words.target || 0;
            msg.send("points for " + target + ": " + p);
            setTimeout(user);
        }
    });

    function clearedTimeout(user_name) {
        var TIMEOUT = 2000;
        var usertime = robot.brain.plusplus.users.user_name || 0;
        return (Date.now() - usertime) > TIMEOUT;
        return true;
    }

    function setTimeout(user_name) {
        robot.brain.plusplus.users.user_name = Date.now();
    }
};

