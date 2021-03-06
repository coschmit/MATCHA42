function adduser(body) {
    conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], function (err, result) {
        if (err) throw err
        if (err) res.redirect('/error/SQL error ' + err);

        if (result.length === 0) {


            sql = 'INSERT INTO `users` (`username`, `name`, `img1`, `api`) VALUES (?, ?, ?, 2)'
            conn.query(sql, [body.login, body.first_name, body.image_url], (err) => { if (err) res.redirect('/'); })
            
        }
    })

}


request.post({
    url: 'https://api.intra.42.fr/oauth/token',
    json: true,
    body: {
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: '6447f1319d883740e394f0305924ccd1a418d9cee86e1f33cd89196e672812c5',
        client_secret: 'a221708f71a49329a4dddf56f84c73bdf0f2c901c03c0bf757e4380dc42d0525',
        redirect_uri: 'http://localhost:8888/oauth42'
    }
}, function (error, response, body) {
    if (error)
        res.redirect('/');
    else if (response.body.error || response.statusCode != 200)
        res.redirect('/');
    else {
        token = response.body.access_token;
        request.get({
            url: 'https://api.intra.42.fr/v2/me?access_token=' + token,
            json: true
        }, (error, response, body) => {
            if (error)
                res.redirect('/');
            else if (response.body.error || response.statusCode != 200)
                res.redirect('/');
            else {
                adduser(body)

                setTimeout(function () {
                    conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], function (err, result) {
                        if (err) throw err
                        req.session.profile = result[0]

                        setTimeout(function () {
                            conn.query('SELECT * FROM `tags` WHERE user_id = ?', [req.session.profile.id], function (err, result) {
                                if (err) throw err
                                req.session.profile.tag = result;
                            })
                            res.redirect('/profile')
                        }, 2000);

                    })
                }, 1000);
                
            }
        })
    }
});