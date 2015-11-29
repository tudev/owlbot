module.export = function(robot){
    robot.respond(/killemwithfire/i, function(msg){
        robot.brain.remove("last_survey_repsonse")
        robot.brain.remove("tudev_mentors")
        robot.brain.remove("sent")
        console.log('working')
    }
}
