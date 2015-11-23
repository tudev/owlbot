// Description
//  Scrape gDocs for new results

var _ = require('underscore');
var scheduler = require('node-schedule');
var GoogleSpreadsheet = require('google-spreadsheet');

module.exports = function(robot){
    var survey_results = new GoogleSpreadsheet('');

    var creds = {}


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
