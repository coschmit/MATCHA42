function	check(table, user_id, his_id, callback)
{
	conn.query('SELECT * FROM ' + table + ' WHERE user_id = ? AND his_id = ?', [user_id, his_id], function (err, rows) { if (err) throw err 
		if (rows.length == 0)
			return callback(0);
		else
			return callback(1);
	})
}

function	createnotif(table)
{
	var name = req.session.profile.username;
	if (table == 'likes')
	{
		checklike(req.session.profile.id, req.params.id, function (like){
			if (like == 1)
				notif(name +' HAS LIKED YOU!');
			else if (like == 3)
				notif('YOU HAVE MATCHED WITH ' + name + '!');
		})
	}
	else if (table == 'dislike')
	{
		
		checklike(req.session.profile.id, req.params.id, function (like){
			if (like == 2)
				notif('YOU ARE NO LONGER MATCHED WITH ' + name + ' :(');
		})
	}
	else if (table == 'visits')
		notif(name + ' HAS VISITED YOUR PROFILE!');
}
function	notif(msg)
{
	
		conn.query('INSERT INTO notifs (user_id, his_id, notif) VALUES (?, ?, ?) ', [req.params.id, req.session.profile.id, msg], function (err) { if (err) throw err })
		console.log(user[req.params.id])
		if (user[req.params.id])
		{
	    	conn.query('SELECT date FROM notifs WHERE user_id=? AND his_id=? AND notif=?', [req.params.id, req.session.profile.id, msg], function (err, date) { if (err) throw err 
			user[req.params.id].emit('notification', {his_id: req.session.profile.id, not: msg, date: date[0].date.getFullYear()+'-'+date[0].date.getUTCMonth()+'-'+date[0].date.getDate()+'T'+date[0].date.getHours()}); })
			
		}
		else 
		console.log("J'ai PO send")
	
}

function score(val) {
	conn.query('SELECT `score` FROM `users` WHERE id = ?', [req.params.id], function (err, score) {
		if (err) throw err;
		score = score[0].score;
		if (val == 'more')
			score += 5;
		else if (val == 'less')
			score -= 5
		conn.query('UPDATE `users` SET score=?  WHERE id = ?', [score, req.params.id], function (err, score) { if (err) throw err; })
	})
}

function insertinto(table) {
	conn.query('INSERT INTO ' + table + ' (user_id, his_id) VALUES (?,?) ', [req.session.profile.id, req.params.id], function (err) { if (err) throw err })
	createnotif(table);
}
function deletefrom(table) {
	conn.query('DELETE FROM ' + table + ' WHERE user_id = ? AND his_id = ?', [req.session.profile.id, req.params.id], function (err) { if (err) throw err })
	createnotif('dislike');
}

function checkonline(){
	if (req.session.profile.id == req.params.id)
		online = 1;
	else if (user[req.params.id])
		online = 1;
	
		else 
		online = 0
	return (online)
	
}

function checklike(user_id, his_id, callback) {
	var a = 0
	var b = 0
	conn.query('SELECT * FROM likes WHERE user_id = ? AND his_id = ?', [user_id, his_id], function (err, rows) {
		if (err) throw err
		if (rows.length == 1)
			a = 1;

		conn.query('SELECT * FROM likes WHERE user_id = ? AND his_id = ?', [his_id, user_id], function (err, rows) {
			if (err) throw err
			if (rows.length == 1)
				b = 1;
			if (user_id == his_id)
				return callback(-1);
			else if (a == 0 && b == 0)
				return callback(0);
			else if (a == 1 && b == 0)
				return callback(1);
			else if (a == 0 && b == 1)
				return callback(2);
			else if (a == 1 && b == 1)
				return callback(3);
		})
	})
}



if (req.body.like == '') {
	checklike(req.session.profile.id, req.params.id, function (like) {
		if (like == -1 || like == 1 || like == 3)
			return;
		else {
			score('more')
			insertinto('likes')
		}
	})
}
if (req.body.dislike == '') {
	checklike(req.session.profile.id, req.params.id, function (like) {
		if (like == 0 || like == 2)
			return;
		else {

			score('less')
			deletefrom('likes')
		}
	})
}

if (req.body.block)
{
	check('block', req.session.profile.id, req.params.id, function(block){
		if (block == 0)
			insertinto('block')
		else
			deletefrom('block')
	})
}
if (req.body.report)
{
	check('report', req.session.profile.id, req.params.id, function(block){
		if (block == 0)
			insertinto('report')
		else
			deletefrom('report')
	})
}

if ((req.session.profile.id != req.params.id) && !req.body.like && !req.body.dislike)
	insertinto('visits')

conn.query('SELECT * FROM users WHERE id = ?', [req.params.id], function (err, result) {
	if (err) throw err
	if (result.length == 0)
		res.redirect('/')

	else {
		conn.query('SELECT * FROM tags WHERE user_id = ?', [req.params.id], function (err, resultag) {
			if (err) throw err
			checklike(req.session.profile.id, req.params.id, function (like) {
				check('block', req.session.profile.id, req.params.id, function(block){
					check('report', req.session.profile.id, req.params.id, function(report){

				var online = checkonline();
				res.render('pages/public_profile', {notif: notifs,report: report, block: block, geopoint: geopoint, req: req, like: like, profile: result[0], tag: resultag, online: online })
			})})})
		})
	}
})




