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
                user: 'matchacolin@gmail.com',
                pass: 'Matcha1234'
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
                res.render('pages/login', {req: req, error: "Mail not sending"}) 
            }
            else {
                bcrypt.hash(newpass, 10, function(err, hash) { 
                    if (err) throw err
                    sql = 'UPDATE users SET password = ? WHERE email = ?'
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