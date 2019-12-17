module.exports = {
    getnotifs: function (conn, id, callback) {
        conn.query('SELECT * FROM notifs WHERE user_id = ? ORDER BY date DESC LIMIT 20', [id], function (err, notifs) {
            if (err) throw err
            if (notifs.length == 0)
                return callback(id);
            else
                return callback(notifs);
        })
    },

    getlikes: function (conn, user_id, callback) {
        conn.query('SELECT * FROM likes WHERE his_id = ?', [user_id], function (err, row) {
            if (err) throw err
            if (row.length == 0)
                return callback('none')
            var i = 0; ids = '(';
            while (row[i]) {
                ids += row[i].user_id;
                i++;
                if (row[i])
                    ids += ', ';
            } ids += ')'
            conn.query("SELECT * from `users` where `id` IN " + ids, function (err, like) {
                if (err) throw err
                return callback(like);
            })
        })
    },

    getvisits: function (conn, user_id, callback){
        conn.query('SELECT * FROM `visits` WHERE his_id = ? ',[user_id], function (err, row) {
            if (err) throw err
            if (row.length == 0)
                return callback('none')
            var i = 0; ids = '(';
            while (row[i]){
                ids += row[i].user_id
                i++;
                if (row[i])
                    ids += ', '
            } 
            ids += ')'
            conn.query("SELECT * FROM `users` WHERE `id` IN" + ids, function (err, visit){
                if (err) throw err
                return callback(visit);
            })
            })
        }

    }

