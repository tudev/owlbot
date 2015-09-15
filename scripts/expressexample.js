module.exports = function(robot){
  robot.router.get('/express/:channel/:expression', function(req, res){
    var channel = req.params.channel
    var expression = req.params.expression
    robot.messageRoom('#'+channel, 'Anyone else feeling a little ' + expression + '?');
    res.send('You got it!')
  })
  robot.router.get('/say/:channel/:comment', function(req, res){
    var channel = req.params.channel
    var comment = req.params.comment
    robot.messageRoom('#'+channel, comment);
    res.send('You got it!')
  })

}
