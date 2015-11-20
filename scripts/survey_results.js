// Description
//  Scrape gDocs for new results

var _ = require('underscore');
var scheduler = require('node-schedule');
var GoogleSpreadsheet = require('google-spreadsheet');

module.exports = function(robot){
    var survey_results = new GoogleSpreadsheet('1M70dzNBBncMFBYlNLQV1ljoujNRKRWpfNxmr0ulsZtQ');

    var creds = {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1KU69/S++HJwv\nuENu7sYraBjYZ3e4ViGvL9z6tpvbqsaMNAwo36YdxsM1pG1B7Q5XfgMQtXl59khp\nJKlYfcy7BUVTePOS2Kq5Kh8/5OP+X4WK38EPLLvnIJh+kf6JEmDd0LK5KDhVVOvx\npqdDjobRJgx0h9R6zbKrsJnUbI3BDDlTwbeSu4KffdPhJxkHbe7YQ9mneBdLgGza\nwwYm/YKscGCaIcnBtxAran5neDg9fshh4HBATFqGN4L+QAYqgK+6yCImg6ASmci2\nLLLub0Hw9ynCorBFIrgk8jTCQTm5hM28RkPlB+iGCPqEhh8pKm9HUQMk/5unQN6N\nOAm4W8sJAgMBAAECggEAIdIbZDa/UgOvWO1SkYQ8NOBTOxtd62kREs6ht6Cdyk3A\nkW4qEvtl3Ms9qGcRCqzB762TzuvCSPWkoRR6FQ4vSX77aVD8UB7pCHaHrPsDYXrd\nyIZrWXTlg4m/TmndFiP7N439v7l1guC+x7dwJJmYK7Wpv5uYHHEIeSsYHONDN5XL\nMY2WCLzOJUFhD9p8MywgcwFxtMpwd341jj4CVwMSYJdyqaQDMzGoH2mBxQ7zGnpE\ne5e181OpAD7hNVpdOwgwrxy3tFzbTdI9Vqewaz21/P2KzxlPZ1J3+tssaLSiRNmz\nuVvGHkah5ugeVhxlWCfvMLUMIGisKpdmrXS9MVOBLQKBgQDdUZ/fuUB7cS18VWkr\nTA6FhwqSHqThJ2L8gC10DUmXLelmczxa3l24ljle3+5qAPF5IHlzxll26Xma45Nh\nUkZYyWl/Ysl//Q6sM8x/VKFAOVTeKFih0ygd7tah9Y/wAsYNbf4bbsMC5kVKN4Ho\nyVTSOWMoalSAu5GE7G1ewaeTYwKBgQDRjLwO/1BTUg+udSIL/p0/nSMAeRu/htbX\negqgPopmPS/DKbTvhZ1GPFZSTJTe7LMpQtzmcWuMbPnNJlZ36dY0jyAD7pZ1JS7Q\naZStJbfNT1xUwPl4HfPWdueitDtiVK1J9fP49uQ/SpArc8XEVEy5ZHbNfvTpWN+N\narzC0LExowKBgFcoOu6vFL7IPmJ1fFpJtHpPSRFsMgBdM3U+wSevx+hac00eWolq\ngrwbpPJA+7IRNwc9i7bVSQw0O+iMcNDlxsBWaU56R+I4dRvJtmH6oRoaudpXRzhL\nYMQQ98OGYi3h2b8WLvj8sJ2ms2jb3TQgfV/gq7UR0r9znoYbWaL0XpsDAoGAIswv\nEoJ9UUjIR901qS4/6Kdsf5Cc9gIrPR8MEq4wB2hTvSH45OmYQ2iToRkMg7Rk0A5F\nZpMhG/Ggzdt28nTHWHUICP8exxdEneFaiiJAUnzCRWTCSJsYud2G+7LYRazwFd8d\nA5PkNUpphH22MrMZBpRTUi6p9vIGNZKrA+Lp+ecCgYEAs6CuNXjoFCwlaIXfszIp\nGEDf1hb+5/IAPcO0cBG2LlN3Qewhb7MBUtzM0zF4vc9+5Fp/n/OhRIsza7l6M5Z+\ngBEZvmEgWdaXO65tiosqcQa97R+lEXOx3QUlkb56ceVzi555Vb/QXyN8n14OJlil\n63dVUFYgw3J4MVvuL3TJ7KQ\u003d\n-----END PRIVATE KEY-----\n",
        client_email: "662284593490-v3ctohpi33qdddl83309qs0gc45if5sn@developer.gserviceaccount.com"
    }


    function getLast(){
        return robot.brain.get('last_survey_repsonse') || 0;
    }

    function saveLast(n){
        robot.brain.set('last_survey_repsonse', n);
    }

    function getMentors() {
        return robot.brain.get("tudev_mentors") || [];
    }

    function addMentor(payload){
        var mentors = getMentors();

        if(_.isUndefined(_.find(mentors, {id: payload.userid}))){
            var mentor = {
                id: payload.userid,
                added: payload.timestamp,
                year: payload.whatyearofcollegeareyouin,
                java: payload.howcomfortableareyouwithjava,
                python: payload.howcomfortableareyouwithpython,
                c: payload.howcomfortableareyouwithc,
                cpp: payload.howcomfortableareyouwithc_2,
                frontend: payload.howcomfortableareyouwithhtmlcss,
                js: payload.howcomfortableareyouwithjavascript,
                go: payload.howcomfortableareyouwithgo,
                rust: payload.howcomfortableareyouwithrust,
                android: payload.howcomfortableareyouwithandroiddevelopment,
                ios: payload.howcomfortableareyouwithiosdevelopment,
                other: payload.whatotherlanguagesdoyouknow
            }

            mentors.push(mentor);
            updateBrain(mentors);
        }
    }

    /** set the welcome_queue */
    function updateBrain(mentors){
        robot.brain.set('tudev_mentors', mentors)
    }

    function getUpdates(){
        var last = getLast();

        survey_results.useServiceAccountAuth(creds, function(err){
            survey_results.getInfo(function( err, sheet_info ){
                var sheet1 = sheet_info.worksheets[0];

                sheet1.getRows({
                    start: last
                }, function(err, rows){
                    if(rows.length > 0){
                        last += rows.length;
                        _.each(rows, function(row){
                            if(row.userid)
                                addMentor(row);
                        });

                        saveLast(last);
                    }
                });
            });
        });
    }

    var rule =  new scheduler.RecurrenceRule();
    rule.second = new scheduler.Range(0, 59, 20);
    var welcomeSchedule = scheduler.scheduleJob(rule, function() {
        getUpdates();
    });
}
