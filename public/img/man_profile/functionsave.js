function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function makename() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    var possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 5; i++) {
        if (i == 0)
            text += possible1.charAt(Math.floor(Math.random() * possible.length));
        else
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function choosePics(gender, i) {
    if (gender == 'Man') {
        if (i % 4 == 0) {
            var img1 = '/img/man_profile/man-profile01.jpg'
            var img2 = '/img/man_profile/.jpg'
            var img3 = '/img/nature_girl_profile.jpg'
            var img4 = '/img/empty.jpg'
        }
        
        else if (i % 4 == 1) {
            var img1 = '/seed/6.jpg'
            img2 = '/seed/7.jpg'
            img3 = '/seed/8.png'
            img4 = '/seed/9.jpg'
            img5 = '/seed/10.jpg'
        }
        else if (i % 4 == 2) {
            var img1 = '/seed/11.jpg'
            img2 = '/seed/12.png'
            img3 = '/seed/13.jpg'
            img4 = '/seed/14.jpg'
            img5 = '/seed/15.png'
        }
        else {
            var img1 = '/seed/16.jpg'
            img2 = '/seed/17.jpg'
            img3 = '/seed/18.jpg'
            img4 = '/seed/19.jpg'
            img5 = '/seed/20.jpg'
        }
        return(img1,img2,img3,img4)

    }

    else {
        if (i % 4 == 0) {
            var img1 = '/img/girl_profile/girl_profile.jpg'
            var img2 = '/img/girl_profile/girl_sitting.jpg.jpg'
            var img3 = '/img/girl_profile/nature_girl_profile.jpg'
            var img4 = '/img/empty.jpg'
        }
        
        else if (i % 4 == 1) {
            var img1 = '/seed/6.jpg'
            var img2 = '/seed/7.jpg'
            var img3 = '/seed/8.png'
            var img4 = '/seed/9.jpg'
        }
        else if (i % 4 == 2) {
            var img1 = '/seed/11.jpg'
            var img2 = '/seed/12.png'
            var img3 = '/seed/13.jpg'
            var img4 = '/seed/14.jpg'
        }
        else {
            var img1 = '/seed/16.jpg'
            var img2 = '/seed/17.jpg'
            var img3 = '/seed/18.jpg'
            var img4 = '/seed/19.jpg'
        }
        return(img1,img2,img3,img4)

    }
}

function maketag() {
    var text = "";
    var possible = "abcdef";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

conn.query('SELECT username FROM users where username = ?', ['Random'], function (err, result) {
    if (err) throw err;
    if (result.length == 0) {

        var i = 0
        pass = '$2a$10$fXJ03NwABaEi4HLQhWiGpOhdbpcTEo93DvY0UBAJlbyhpdvPkXnzu' // Fakeuser42
        confirm = 1

        while (i < 4) {
            var username = 'Random' + i
            email = 'Random' + i + '@gmail.com'
            bio = 'Me signale pas stppp je suis un fake et je l\'assume'
            score = 5 * getRandomInt(200)
            fakelocation = 'BizounoursLand'
            key = i
            age = getRandomInt(60) + 18;
            longitude = i % 90
            latitude = i % 90
            quelgenre = getRandomInt(2)
            quelorientation = getRandomInt(3)
            name = makename();
            showlocation = 0;


            if (quelgenre == 0) {
                gender = 'Man'
                var img1, img2, img3, img4 = choosePics(gender, i)
            }
            else {
                gender = 'Woman'
                var img1, img2, img3, img4 = choosePics(gender, i)
            }

            if (quelorientation == 0) {
                orientation = 'Heterosexual'
            }
            else if (quelorientation == 1) {
                orientation = 'Bisexual'
            }
            else {
                orientation = 'Homosexual'
            }



            sql = 'INSERT INTO `users` (`username`, `name`, `pass`, `email`, `confirmkey`, `confirm`, `gender`,\
       `orientation`, `bio`, `age`, `score`, `fakelocation`, `showlocation`, `img1`, `img2`, `img3`, `img4` `longitude`, `latitude`)\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            conn.query(sql, [username, name, pass, email, key, confirm, gender, orientation, bio, age,
                score, fakelocation, showlocation, img1, img2, img3, img4, longitude, latitude], function (err, result) { if (err) throw err })

            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
            sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
            conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })

            sql = 'INSERT INTO `visits` (user_id, his_id) VALUES (?,?)'
            conn.query(sql, [getRandomInt(600), getRandomInt(600)], function (err, result) { if (err) throw err })

            sql = 'INSERT INTO `likes` (user_id, his_id) VALUES (?,?)'
            conn.query(sql, [getRandomInt(600), getRandomInt(600)], function (err, result) { if (err) throw err })
            i++
        }
    }
});
res.render('pages/index', { req: req })