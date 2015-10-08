/* 
 * Cellular Automata Drawing for SlackBot
 * 
 * @author wkp3
 */
module.exports = function (robot) {
    robot.respond('/draw a ca$/i', function (msg) {
        msg.send("generic call");
        var l = drawCA( 12, "0000000000001000000000000", 30 );
        msg.send(l);
    });

    robot.respond('/draw a ca (.*) (.*) (.*)/', function (msg) {      
        var gens = +msg.match[1];
        var start = msg.match[2];
        var rule = +msg.match[3];
        
        var debug = "```";
        debug += gens+"\n";
        debug += start+"\n";
        debug += rule+"\n";
        debug += "```";
        msg.send(debug);
        
        
        var l = drawCA( gens, start, rule );
        msg.send(l);
        
    });


    function drawCA(gens, start, r) {
        var generations = gens;
        var size = start.length;
        
        var world = [];
        var oldworld = [];

        var rule = r.toString(2);
        rule = "00000000".substr(rule.length)+rule; //Thank you SO. Holy shit.
        
        //Initial values
        for (i = 0; i < size; i++) {
            world[i] = +start.charAt(i);
        }
        
        var line = "```";
        
        for (g = 0; g < generations; g++) {
            for (c = 0; c < size; c++) {
                line += world[c] === 0 ? "\u25A1" : "\u25A0";
                oldworld[c] = world[c];
            }
            line += "\n";
            
            //Calculate new world from oldworld and rule
            for (c = 0; c < size; c++) {
                //Calculate value of parents
                var parents = [];
                parents[1] = oldworld[c];
                if (c == 0) {
                    parents[0] = 0;
                    parents[2] = oldworld[1];
                } else if (c == (size - 1)) {
                    parents[0] = oldworld[size - 2];
                    parents[2] = 0;
                } else {
                    parents[0] = oldworld[c - 1];
                    parents[2] = oldworld[c + 1];
                }
                
                //val = parents[0]*4 + parents[1] * 2 + parents[2];
                val = parents[0] + parents[1] * 2 + parents[2]*4;
                world[c] = +rule.charAt(7-val);
            }
        }
        line += "```";
        return line;
    }

};

