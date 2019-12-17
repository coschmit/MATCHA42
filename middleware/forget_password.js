console.log("WELCOME")
email = eschtml(req.body.email)
sql = 'SELECT * FROM users WHERE email = ?'
    conn.query(sql, [email],
    function (error, result) 
    { 
    if (error) throw error
    if (result.length > 0)
    {
        let smtpTransport = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'colinschmitt472@gmail.com',
                pass: 'mypassword'
            }
         });
         newpass = rand.generate(10)
         mail = 
        {
            from: "colinschmitt47@gmail.com", to: email, subject: "Reinitialisation de votre mot de passe",
            html: '<html><body><div align=center> \
            YOUR LOGIN : <BR />\
            '+result[0].username+'<BR /><BR />\
            YOUR NEW PASSWORD : <BR />\
            '+newpass+'<BR />\
            </div></body></html>'
        }
        smtpTransport.sendMail(mail, function(error, response){
            if (error) { 
                console.log("BAHERROR")
                res.render('pages/login', {req: req}) 
            }
            else {
                bcrypt.hash(newpass, 10, function(err, hash) { 
                    if (err) throw err
                    sql = 'UPDATE users SET password = ? WHERE email = ?'
                    console.log("nickel")
                    conn.query(sql, [hash, email],
                    function (error, result) 
                    { 
                    if (error) throw error }) })
                        var msg = "C'est ok chef ton mdp est envoyé par mail"
                res.render('pages/login', {req: req, success: msg})
             }
             smtpTransport.close()})
    }
    else {
        res.render('pages/login',{req: req})
    }
})