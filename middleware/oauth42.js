function adduser (body) {
    conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], (err, result) => {
        if (err) res.redirect('/error/SQL error ' + err);
        if (result.length == 0)
        {
            console.log("ok on test")
            sql = 'INSERT INTO `users` (`username`, `name`, `img1`, `api`) VALUES (?, ?, ?, 2)'
            conn.query(sql, [body.login, body.first_name, body.image_url], (err) => { if (err) console.log("MARCHE POOOOO"); })
            console.log("BAHALORS   ")
        }
        req.session.profile = result[0]
console.log("ok donc c'est");
console.log(result[0]);
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
}, function(error, response, body){
    console.log("TEST2")

    if (error)
        console.log("error1");
    else if (response.body.error || response.statusCode != 200) 
    console.log("error2");
    else
    {
        console.log("ouiiii")
        token = response.body.access_token;
        request.get({
            url: 'https://api.intra.42.fr/v2/me?access_token=' + token,
            json: true
        }, (error, response, body) => {
            if (error)
                res.redirect('error/ oauth42 request error ' + response.statusCode + " : " + error);
            else if (response.body.error || response.statusCode != 200)
                res.redirect('error/ oauth42 request error ' + response.statusCode + " : " + response.body.error);
            else
            {
                console.log("ouiiiiiii")
                adduser(body)
                conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], (err, result) => {
                    req.session.profile = result[0]

                // req.session.profile = new Array;
                // req.session.profile.username = body.login
                // req.session.profile.name = body.first_name
                // req.session.profile.img1 = body.image_url
                // console.log(req.session.profile.img1)
                // req.session.profile.api = '2';
                res.redirect('/profile')
            })
            }
        })
    } 
});