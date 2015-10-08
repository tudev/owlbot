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
        msg.send("++'ing " + msg.match[1] + " from: " + msg.message.user.name);

        var target = msg.match[1];
        var user = msg.message.user.name;
        var t;
        if( clearedTimeout( user ) ){
            t = robot.brain.get("pp_"+target) || 0;
            robot.brain.set("pp_"+target, t+1);
            setTimeout( user );
        }
    });

    /**
     * -- - Decrement points of target
     * 
     * */
    robot.respond('/(.*)\\\-\\\-/', function (msg) {
        msg.send("--'ing " + msg.match[1] + " from: " + msg.message.user.name);
        
        var target = msg.match[1];
        var user = msg.message.user.name;
        var t;
        if( clearedTimeout( user ) ){
            t = robot.brain.get("pp_"+target) || 0;
            robot.brain.set("pp_"+target, t-1);
            setTimeout( user );
        }
    });

    /**
     * points - returns current total points of target
     * 
     * */
    robot.respond('/points (.*)/', function (msg) {
        msg.send("points for " + msg.match[1] + " from: " + msg.message.user.name);
        
        var target = msg.match[1];
        var p = robot.brain.get("pp_"+target) || 0;
        
        msg.send("points for "+target+": "+p);
        
    });

    function clearedTimeout(user_name) {
        var TIMEOUT = 5000;
        var usertime = robot.brain.get("ppto_"+user_name) || 0;
        return (Date.now() - usertime) > TIMEOUT;
    }
    

    function setTimeout(user_name) {
        var fieldname = "ppto_"+user_name;
        robot.brain.set( fieldname, Date.now() );
    }
};

