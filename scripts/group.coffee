
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

	robot.respond /g:(.*)/i, (res) ->
		gname = res.match[1]
		group = getGroup gname
		if group?
			res.reply group.map (u) -> u.id
		else
			res.reply "group #{gname} is not in my brain"

	robot.respond /gn:(.*)/i, (res) ->
		gname = res.match[1]
		group = getGroup gname
		if not group?
			setGroup gname, []
			res.reply "group #{gname} added"

	robot.respond /ga:(.*) (.*)/i, (res) ->
		gname = res.match[1]
		uname = res.match[2]
		if addUser gname, uname
			res.reply "added #{uname} to #{gname}"
		else
			res.reply "failed to add #{uname} to #{gname}"

	robot.respond /gr:(.*) (.*)/i, (res) ->
		gname = res.match[1]
		uname = res.match[2]
		if remUser gname, uname
			res.reply "removed #{uname} from #{gname}"
		else
			res.reply "failed to remove #{uname} from #{gname}"

