// // Description
// //  Find mentors for specific technology

// var _ = require('underscore');

// module.exports = function(robot){
//     function getMentors() {
//         return robot.brain.get("tudev_mentors") || [];
//     }
//     //function to sort json for user id
//     function getUserList(list){
//         var userList = [];
//         _.each(list, function(user){
//                     //console.log(user.id);
//                     userList.push(user.id);
//                 });
//         return userList;
//     }

//     function getJavaMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.java > 0
//         }), function(m){
//             return m.java;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getPythonMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.python > 0;
//         }), function(m){
//             return m.python;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }


//     function getCMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.c > 0;
//         }), function(m){
//             return m.c;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getCppMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.cpp > 0;
//         }), function(m){
//             return m.cpp;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getFrontEndMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.frontend > 0;
//         }), function(m){
//             return m.frontend;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getJSMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.js > 0;
//         }), function(m){
//             return m.js;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getGoMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.go > 0;
//         }), function(m){
//             return m.go;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getRustMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.rust > 0;
//         }), function(m){
//             return m.rust;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getAndroidMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.android > 0;
//         }), function(m){
//             return m.android;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function getiOSMentors(n){
//         var mentors = _.sortBy(_.filter(getMentors(), function(mentor){
//             return mentor.ios > 0;
//         }), function(m){
//             return m.ios;
//         });

//         mentors.reverse();

//         return getUserList( _.first(mentors, n) );
//     }

//     function printResult(list, msg){
//         _.each(list, function(user){
//             msg.send('<@' + user + '>');
//         });
//     }

//     robot.respond(/ i need help with (.*)/i, function(msg){
//         var subject = msg.match[1];
//         switch (subject) {
//             case 'java':
//                 var list = getJavaMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'python':
//                 var list = getPythonMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'c':
//             case 'C':
//                 var list = getCMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'cpp':
//             case 'c++':
//             case 'C++':
//                 var list = getCppMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'frontend':
//             case 'html':
//             case 'css':
//             case 'HTML':
//             case 'CSS':
//                 var list = getFrontEndMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'js':
//             case 'javascript':
//             case 'JS':
//                 var list = getJSMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'go':
//             case 'GO':
//             case 'Go':
//                 var list = getGoMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'rust':
//             case 'Rust':
//                 var list = getRustMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'Android':
//             case 'android':
//                 var list = getAndroidMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             case 'ios':
//             case 'iOs':
//             case 'iOS':
//                 var list = getiOSMentors(4);
//                 msg.send("The follow people know " + subject);
//                 printResult(list,msg);
//                 break;
//             default:
//                 if (subject === 'with'){
//                 }else {
//                 }

//                 break;
//         }

//     });
// }
