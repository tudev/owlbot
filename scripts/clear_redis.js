module.exports = function(robot){
    robot.respond(/killemall/i, function(msg){
        robot.brain.remove('tudev_mentors')
        robot.brain.remove('last_survey_repsonse')
        robot.brain.remove('plusPlus')
        console.log('working')
    })
}
