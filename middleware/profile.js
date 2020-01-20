function updateuser(column, change) {
        var sql = 'UPDATE users SET ' + column + ' = ? WHERE id = ?'
        conn.query(sql, [change, req.session.profile.id], function (err) { if (err) throw err })
        req.session.profile[column] = change
        var success = 'Your ' + column + ' was successfully changed'
        tool.getlikes(conn, req.session.profile.id, function (like) {
                tool.getvisits(conn, req.session.profile.id, function (visit) {
                        res.render("pages/profile", { success: success, profile: req.session.profile, geopoint: geopoint, notif: notifs, like: like, visit: visit })
                })
        })
}


if (req.session.profile.api == 2) {
        conn.query('SELECT * FROM `tags` WHERE user_id = ?', [req.session.profile.id], function (err, result) {
                if (err) throw err
                req.session.profile.tag = result;
        })
}


function fokXSS(text) {
        var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function checklocation(set) {
        sql = 'UPDATE users SET checklocation = ? WHERE id = ?'
        conn.query(sql, [set, req.session.profile.id], function (err, result) {
                if (err) throw err
        })
        req.session.profile.checklocation = set;
        tool.getlikes(conn, req.session.profile.id, function (like) {
                tool.getvisits(conn, req.session.profile.id, function (visit) {
                        res.render("pages/profile", { profile: req.session.profile, notif: notifs, like: like, visit: visit })
                })
        })
}

function settags(i, msg) {
        sql = 'SELECT * FROM `tags` WHERE user_id = ?'
        conn.query(sql, [req.session.profile.id], function (err, result) {
                if (err) throw err
                req.session.profile.tag = result;
                tool.getlikes(conn, req.session.profile.id, function (like) {
                        tool.getvisits(conn, req.session.profile.id, function (visit) {
                                if (i == 1) {
                                        res.render('pages/profile', { success: msg, visit: visit, like: like, profile: req.session.profile, geopoint: geopoint, notif: notifs })
                                }
                                else if (i == 0) {
                                        res.render('pages/profile', { error: msg, visit: visit, like: like, profile: req.session.profile, geopoint: geopoint, notif: notifs })
                                }
                        })
                })

        })
}

if (req.body.table) {
        var table = JSON.parse(req.body.table)

        location = table.city + ' ' + table.country_name
        conn.query('UPDATE users SET longitude = ?, latitude = ?, location = ? WHERE id = ?', [table.longitude, table.latitude, location, req.session.profile.id], function (err) { if (err) throw err })
        req.session.profile.location = location
        req.session.profile.longitude = table.longitude
        req.session.profile.latitude = table.latitude
        //user[req.session.profile.id].emit('locationset', {})
}

if (req.session.profile == undefined) {
        res.render('pages/login')
}

else if (req.body.edit && req.body.general === 'Modify') {
        var change = eschtml(req.body.changement);

        if (req.body.edit === '1') {
                sql = 'SELECT * FROM `users` WHERE username = ?'
                conn.query(sql, [change], function (err, result) {
                        if (err) throw err
                        if (result.length === 0)
                                updateuser('username', change)
                        else
                                msg = "Sorry, this username already exists"
                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                        res.render('pages/profile', { like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs, error: msg })
                                })
                        })
                })
        }
        else if (req.body.edit === '2')
                updateuser('firstname', change)
        else if (req.body.edit === '3')
                updateuser('name', change)
        else if (req.body.edit === '4') {
                if (validator.isEmail(change)) {
                        sql = 'SELECT * FROM `users` WHERE email = ?'
                        conn.query(sql, [change], function (err, result) {
                                if (err) throw err
                                if (result.length === 0)
                                        updateuser('email', change)
                                else {
                                        msg = "Sorry, this email already exists"
                                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                                        res.render('pages/profile', { like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs, error: msg })
                                                })
                                        })
                                }

                        })
                }
        }
        else if (req.body.edit === '5') {
                regLow = /[a-z]/
                regUp = /[A-Z]/
                if (change.length < 5)
                {
                        msg = "Your password is too short"
                                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                                        res.render('pages/profile', { like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs, error: msg })
                                                })
                                        })
                }
                else if (change.search(regLow) === -1)
                {
                        msg = "Password must contain a lowercase"
                                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                                        res.render('pages/profile', { like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs, error: msg })
                                                })
                                        })
                }
                else if (change.search(regUp) === -1)
                {
                        msg = "Password must contain an uppercase"
                                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                                        res.render('pages/profile', { like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs, error: msg })
                                                })
                                        })
                }
                else {
                        bcrypt.hash(change, 10, function (erroo, hash) {
                                if (erroo) throw erroo
                                updateuser('password', hash)
                        })
                }
        }
}
else if (req.body.gender && req.body.sub_gender === 'Modify') {
        if (req.body.gender == 'Man' || 'Woman')
                updateuser('gender', req.body.gender)
}

else if (req.body.orientation && req.body.sub_orientation === 'Modify') {
        if (req.body.orientation == "Heterosexual" || "Homosexual" || "Bisexual") {
                updateuser('orientation', req.body.orientation)
        }
}

else if (req.body.age && req.body.sub_age === 'Modify') {
        if (!(req.body.age < 1)) {
                updateuser('age', req.body.age)
        }
        else {
                res.render('pages/profile', { profile: req.session.profile, geopoint: geopoint, notif: notifs })
        }
}

else if (req.body.fakelocation && req.body.fake_loc_btn === 'Modify') {
        updateuser('fakelocation', req.body.fakelocation)
}

else if (req.body.bio && req.body.sub_bio === 'Modify') {
        bio = fokXSS(req.body.bio)
        updateuser('bio', bio)
}

else if (req.body.newtag) {


        if (!req.body.newtag.trim())
                res.render('pages/profile', { profile: req.session.profile, geopoint: geopoint, notif: notifs })
        else {
                var newtag = eschtml(req.body.newtag)
                if (newtag.length < 41) {
                        sql = 'SELECT * FROM `tags` WHERE user_id = ? AND tag = ?'
                        conn.query(sql, [req.session.profile.id, newtag], function (err, result) {
                                if (err) throw err
                                if (result.length === 0) {
                                        sql = 'INSERT INTO tags (tag, user_id) VALUES (?,?)'
                                        conn.query(sql, [newtag, req.session.profile.id], function (err, result) { if (err) throw err })
                                        settags(1, "Your tag is successfully added !");

                                }
                                else {
                                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                                        var msg = "Your tag is not added !"
                                                        res.render('pages/profile', { error: msg, like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs })
                                                })
                                        })
                                }
                        })
                }
                else
                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                        var msg = "Error"
                                        res.render('pages/profile', { like: like, visit: visit, profile: req.session.profile, geopoint: geopoint, notif: notifs, error: msg })
                                })
                        })
        }
}


else if (req.body.deltag) {

        sql = 'DELETE FROM `tags` WHERE user_id = ? AND id = ?'
        conn.query(sql, [req.session.profile.id, req.body.deltag], function (err, result) {
                if (err) throw err
                if (result.length !== 0) {
                        settags(1, 'Your tag is successful deleted');
                }
                else
                        tool.getlikes(conn, req.session.profile.id, function (like) {
                                tool.getvisits(conn, req.session.profile.id, function (visit) {
                                        var msg = "Error"
                                        res.render('pages/profile', { profile: req.session.profile, geopoint: geopoint, notif: notifs, visit: visit, like: like, error: msg })
                                })
                        })

        })
}

else if (req.body.switch) {
        if (req.body.switch === 'false') {
                checklocation(0);
        }
        else if (req.body.switch === 'true') {
                checklocation(1);
        }
}
else {
        tool.getlikes(conn, req.session.profile.id, function (like) {
                tool.getvisits(conn, req.session.profile.id, function (visit) {
                        res.render('pages/profile', { profile: req.session.profile, geopoint: geopoint, notif: notifs, like: like, visit: visit })
                })
        })
}


