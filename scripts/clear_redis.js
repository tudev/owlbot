module.exports = function(robot){
    robot.respond(/killemall/i, function(msg){
        robot.brain.remove('log')
        robot.brain.remove('plusPlus')
        console.log('working')
    })
}
