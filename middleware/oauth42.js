function adduser (body) {
    conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], function (err, result) { if (err) throw err 
        if (err) res.redirect('/error/SQL error ' + err);
        console.log("*first state*")
        if (result.length === 0)
        {
        console.log("*second state*")

            sql = 'INSERT INTO `users` (`username`, `name`, `img1`, `api`) VALUES (?, ?, ?, 2)'
            conn.query(sql, [body.login, body.first_name, body.image_url], (err) => { if (err) res.redirect('/'); })
            // conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], function (err, result) { if (err) throw err 
                
            //     req.session.profile = result[0]
            //     console.log("****")
            //     console.log(req.session.profile)
            //     console.log("****")
            // })
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
}, function(error, response, body){
    if (error)
    res.redirect('/');        
    else if (response.body.error || response.statusCode != 200) 
    res.redirect('/');
    else
    {
        token = response.body.access_token;
        request.get({
            url: 'https://api.intra.42.fr/v2/me?access_token=' + token,
            json: true
        }, (error, response, body) => {
            if (error)
                res.redirect('/');
            else if (response.body.error || response.statusCode != 200)
                res.redirect('/');
            else
            {
                console.log("****   AHBONNN    ****")
                adduser(body)

                setTimeout(function() {
                    console.log("%%POWW%%")
                    conn.query('SELECT * FROM users WHERE username = ? AND api = 2', [body.login], function (err, result) { if (err) throw err 
                        req.session.profile = result[0]
                        
                    // req.session.profile = new Array;
                    // req.session.profile.username = body.login
                    // req.session.profile.name = body.first_name
                    // req.session.profile.img1 = body.image_url
                    // req.session.profile.id = '666';
                    // console.log(req.session.profile.img1)
                    //  req.session.profile.api = '2';
    
                    console.log("****")
                    console.log(req.session.profile)
                    console.log("****")
                    res.redirect('/profile')
                    
                    }, 3000);

            })
            }
        })
    } 
});