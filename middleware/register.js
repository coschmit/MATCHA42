


if (req.body.username && req.body.firstname && req.body.name && req.body.email && req.body.password){
    var username = eschtml(req.body.username)
    var firstname = eschtml(req.body.firstname)
    var name = eschtml(req.body.name)
    var email = eschtml(req.body.email)
    var password = eschtml(req.body.password)
    var lowerC = /[a-z]/
    var upperC = /[A-Z]/
    if (password.length > 5)
    {
        if (password.search(lowerC) !== -1){
            if (password.search(upperC) !== -1){
                if (validator.isEmail(email)){
                        
                    sql = 'SELECT username FROM users WHERE username = ? OR email = ?'
                    conn.query(sql,[username,email],
                        function (error, result)
                        {
                            if (error) throw error
                            if (result.length == 0)
                            {
                                console.log("--------------------\nFIRST STEP\n------------------------")
                                let smtpTransport = mailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'colinschmitt472@gmail.com',
                                        pass: 'mypassword'
                                    }
                                 }); 
                                   
                                key = rand.generateDigits(5)
                                mail = 
                                {
                                    from: "colinschmitt47@gmail.com", to: email, subject: "Confirmation de votre compte",
                                    text: "Hello world",
                                    html: '<html><body><div align=center> \
                                    TIENS SALE TCHOIN KEPOURTOA <BR />CLICK ON THE FOLLOWING LINK TO VALIDATE YOUR ACCOUNT: <BR />\
                                    <a href=http://localhost:8888/confirm?username='+ username + '&key=' + key + '>Confirm your account</a>\
                                    </div></body></html>'
                                }
                                console.log("--------------------\nSECOND STEP\n------------------------")


                                smtpTransport.sendMail(mail,function(error, response){
                                    console.log("--------------------\nTHIRTH STEP\n------------------------")
                                    if (error){
                                        var msg = "Confirm email has been not sent!!!"
                                        res.render('pages/register',{error: msg})
                                    }
                                    else {
                                        
                                        var msg = "Confirm email has been sent :)"
                                        res.render('pages/login',{success: msg})
                                    }
                                    

                                    smtpTransport.close()})
                                    bcrypt.hash(password,10,function(err, hash){if (err) throw err
                                    sql = 'INSERT INTO `users` (`username`, `firstname`, `name`, `email`, `password`,`confirmkey`, `api`) VALUES (?, ?, ?, ?, ?, ?, 1)'
                                    variables = [username, firstname, name, email, hash, key]
                                    var promise1 = new Promise(function(resolve, reject) { conn.query(sql, variables, function (err, res) { if (err) throw err }) }) 
                                        
                                        promise1.then(conn.query('SELECT * FROM users WHERE username = ?', [username], function (err, res) { if (err) throw err
                                            fs.mkdir(__dirname + '/public/img/users/' + res[0].id, function(err) {
                                            if (err) { if (err.code == 'EEXIST') { return ; } else { throw err; } }})})) });
                                    
                            }
                            else {
                                msg = 'username or email already exist'
                                res.render('pages/register',{error: msg}) 
                                }
                        })
                }
            }
            else {
                var msg ="Your password need uppercase character !"
                res.render('pages/register',{error: msg})
            }
        }
        else {
            var msg ="Your password need lowercase characters"
            res.render('pages/register',{error: msg})
        }
    }
    else {
        var msg = "Your password is too short !"
        res.render('pages/register',{error: msg})
    }

    


}
else {
    var msg = "Filling in Every field is required !"
    res.render('pages/register',{error: msg})
}








/*

//console.log("username : "+username+"\nname : "+ name + "\nemail : "+email +"\npassword : "+ password+ "\n\n")

    /*sql = 'SELECT username FROM users WHERE username = ? OR email = ?'
    conn.query(sql, [username, email], function (error, result){
        sql = 'INSERT INTO `users` (`username`, `name`, `email`, `password`) VALUES (?, ?, ?, ?)'
        variables = [username, name, email, password]
        conn.query(sql, variables, function (err, res) { if (err) throw err }) 


    })*/