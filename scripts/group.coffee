# Description:
#	manages groups of users, mostly for pinging purposes
#
# Commands:
#	hubot g:<gname> - prints out group gname
#	hubot g:<gname> new - creates new group gname
#	hubot g:<gname> add @<uname> - adds user uname to group gname
#	hubot g:<gname> rem @<uname> - removes user uname from group gname
#
# Author:
#	shua


module.exports = (robot) ->

	getGroup = (gname) ->
		robot.brain.get("group_#{gname}")

	setGroup = (gname, mems) ->
		robot.brain.set "group_#{gname}", mems

	addUser = (gname, uname) ->
		group = getGroup gname
		if group?
			user = group.find (u) -> u.id is uname
			if not user?
				group.push { id: uname }
				setGroup gname, group
			true
		else
			false

	remUser = (gname, uname) ->
		group = getGroup gname
		if group?
			user = group.find (u) -> u.id is uname
			if user?
				setGroup gname, group.filter (u) -> u.id isnt uname
			true
		else
			false

	robot.respond /g:([^ ]*)$/i, (res) ->
		gname = res.match[1]
		group = getGroup gname
		if group?
			res.reply group.map (u) -> u.id
		else
			res.reply "group #{gname} is not in my brain"

	robot.hear /@g:([^ ]*)/i, (res) ->
		gname = res.match[1]
		group = getGroup gname
		if group?
			res.reply group.map (u) -> u.id

	robot.respond /g:([^ ]*) new$/i, (res) ->
		gname = res.match[1]
		group = getGroup gname
		if not group?
			setGroup gname, []
			res.reply "group #{gname} added"

	robot.respond /g:([^ ]*) add ([^ ]*)$/i, (res) ->
		gname = res.match[1]
		uname = res.match[2]
		if addUser gname, uname
			res.reply "added #{uname} to #{gname}"
		else
			res.reply "failed to add #{uname} to #{gname}"

	robot.respond /g:([^ ]*) rm ([^ ]*)$/i, (res) ->
		gname = res.match[1]
		uname = res.match[2]
		if remUser gname, uname
			res.reply "removed #{uname} from #{gname}"
		else
			res.reply "failed to remove #{uname} from #{gname}"

