module.exports = function(robot){
  robot.router.get('/express/:expression', function(req, res){
    var expression = req.params.expression
    robot.messageRoom('#hackers', 'Anyone else feeling a little ' + expression + '?');
    res.send('You got it!')
  })
}
