module.exports = function(robot){
  robot.router.get('/express/:channel/:expression', function(req, res){
    var channel = req.params.channel
    var expression = req.params.expression
    robot.messageRoom('#'+channel, 'Anyone else feeling a little ' + expression + '?');
    res.send('You got it!')
  })
}
