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

    /**
     * ++ - Increment points of target
     * 
     * */
    robot.respond('/(.*)\\+\\+/', function (msg) {
        var target = msg.match[1];
        var user = msg.message.user.name;
        var t;
        if( clearedTimeout( user ) ){
            t = robot.brain.get(plusplus.words.target) || 0;
            robot.brain.set(plusplus.words.target, t+1);
            setTimeout( user );
        }
    });

    /**
     * -- - Decrement points of target
     * 
     * */
    robot.respond('/(.*)\\\-\\\-/', function (msg) {
        var target = msg.match[1];
        var user = msg.message.user.name;
        var t;
        if( clearedTimeout( user ) ){
            t = robot.brain.get(plusplus.words.target) || 0;
            robot.brain.set(plusplus.words.target, t-1);
            setTimeout( user );
        }
    });

    /**
     * points - returns current total points of target
     * 
     * */
    robot.respond('/points (.*)/', function (msg) {
        var target = msg.match[1];
        var p = robot.brain.get(plusplus.words.target) || 0;
        msg.send("points for "+target+": "+p);
    });

    function clearedTimeout(user_name) {
        var TIMEOUT = 5000;
        var usertime = robot.brain.get(plusplus.users.user_name) || 0;
        return (Date.now() - usertime) > TIMEOUT;
    }
    
    function setTimeout(user_name) {
        robot.brain.set( plusplus.users.user_name, Date.now() );
    }
};

