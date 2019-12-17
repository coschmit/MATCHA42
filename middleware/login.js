if (!req.body.username && !req.body.password)
  res.render('pages/login', {req: req})
else if (req.body.username && req.body.password)
{
    sql = 'SELECT * FROM `users` WHERE username = ?'
    variables = [req.body.username]
    conn.query(sql, variables, function (err, result) { if (err) throw err
        if (result.length > 0)
        {
            
            bcrypt.compare(req.body.password, result[0].password, function(err, reso) {
                if (reso)
               {
                if (result[0].confirm === 1){
                    
                        req.session.profile = result[0]
                        
                        sql = 'SELECT * FROM `tags` WHERE user_id = ?'
                        conn.query(sql, [req.session.profile.id], function (err, result){
                            if (err) throw err
                            i = 0;
                            req.session.profile.tag = result
                            res.redirect('/profile')
                           // console.log(req.session.profile)

                        })
                }
                else {
                    console.log("A confirmation email has been")
                    res.render('pages/login')
                }
            }
                else {
                    res.render('pages/login')
                    console.log('invalid pass')
                    
                }
            
            })
        
        }
        else {
            res.render('pages/login')
            console.log('login inconnu')
        }
    }) 

    
}
else {
    res.render('pages/login')
            console.log('FIlling every field is required')
}











/*
if (!req.body.username && !req.body.password)
  res.render('pages/login.ejs', {req: req, css: css})
else if (req.body.username && req.body.password)
{

if (req.body.username && req.body.password){

    sql = 'SELECT * FROM `users` WHERE username = ?'
    variables = [req.body.username]
    conn.query(sql, variables, function (err, result) { if (err) throw err
        if (result.length > 0)
        {
            session = req.session
            session.profile = result[0]
            if (req.body.password === session.profile.password){
                console.log("BINGOOO")
                res.render('pages/main_page')
            }
            else{
                console.log("Manqué")
                res.render('pages/login')
            }
            
        
        }
    }) 

    
}

}
*/




