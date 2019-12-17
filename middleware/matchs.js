function checkmatchs(user_id, callback){
    conn.query('SELECT * FROM likes WHERE user_id = ?', [user_id], function (err, row1) { if (err) throw err 
    conn.query('SELECT * FROM likes WHERE his_id = ?', [user_id], function (err, row2){ if (err) throw err
    if (row1.length == 0 || row2.length == 0)
        return callback('none');
    var    a = 0; i = 0;
    id = new Array();
    while (row1[a]){
        var b = 0;
        while (row2[b]){
            if (row1[a].his_id == row2[b].user_id){
                id[i] = row1[a].his_id;
                i++;
            }
            b++;
        }
        a++;
    }
    if (!id[0])
        return callback('none')
    var i = 0; id_2 = '('
    while (id[i]){
        id_2 += id[i];
        i++;
        if (id[i])
            id_2 += ', ';
        
    } id_2 += ')'
    return callback(id_2)
    })
    })
}

function checkonline(){
	
	if (user[req.params.id])
		online = 1;
	else 
		online = 0
	return (online)
	
}

checkmatchs(req.session.profile.id, function(ids) {
    if (ids == 'none')
    res.render('pages/matchs', {req: req, match: 'none', notif: notifs})
    else
    {
        conn.query( "SELECT * from `users` where `id` IN "+ ids, function( err, matchs ) { if (err) throw err
        online = checkonline()
        res.render('pages/matchs', {req: req, match: matchs, notif: notifs, online: online}) }) 
    }
})

