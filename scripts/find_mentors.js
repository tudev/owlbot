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

    function getPythonMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.python > 0;
        }), function(m){
            return m.python;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }


    function getCMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.c > 0;
        }), function(m){
            return m.c;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getCppMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.cpp > 0;
        }), function(m){
            return m.cpp;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getFrontEndMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.frontend > 0;
        }), function(m){
            return m.frontend;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getJSMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.js > 0;
        }), function(m){
            return m.js;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getGoMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.go > 0;
        }), function(m){
            return m.go;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getRustMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.rust > 0;
        }), function(m){
            return m.rust;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getAndroidMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.android > 0;
        }), function(m){
            return m.android;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    function getiOSMentors(n){
        var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
            return mentor.ios > 0;
        }), function(m){
            return m.ios;
        });

        mentors.reverse();

        return _.first(mentors, n);
    }

    robot.respond(/ i need help with (.*)/i, function(msg){
        console.log(msg.envelope.message.text);
        console.log(msg.match[1]);
        var subject = msg.match[1];
        switch (subject) {
            case 'java':
                console.log(getJavaMentors(4));
                break;
            case 'python':
                console.log(getPythonMentors(4));
                break;
            case 'c':
            case 'C':
                console.log(getCMentors(4));
                break;
            case 'cpp':
            case 'c++':
            case 'C++':
                console.log(getCppMentors(4));
                break;
            case 'frontend':
            case 'html':
            case 'css':
            case 'HTML':
            case 'CSS':
                console.log(getFrontEndMentors(4));
                break;
            case 'js':
            case 'javascript':
            case 'JS':
                console.log(getJSMentors(4));
                break;
            case 'go':
            case 'GO':
            case 'Go':
                console.log(getGoMentors(4));
                break;
            case 'rust':
            case 'Rust':
                console.log(getRustMentors(4));
                break;
            case 'Android':
            case 'android':
                console.log(getAndroidMentors(4));
                break;
            case 'ios':
            case 'iOs':
            case 'iOS':
                console.log(getiOSMentors(4));
                break;
            default:
                if (subject === 'with'){
                    console.log('what do you need?');
                }else {

                    console.log('we do not have '  + subject);
                }

                break;
        }
        
    });
}
