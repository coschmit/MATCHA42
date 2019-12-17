if (req.query.username && req.query.key)
{
    
  	sql = 'SELECT * FROM users WHERE username = ? AND confirmkey = ' + req.query.key
	conn.query(sql, [req.query.username, req.query.key],
    function (error, result)
    { if (error) throw error
    	if (result.length !== 0)
    	{
    		sql = 'UPDATE users SET confirm = 1 WHERE username = ?'
			conn.query(sql, [req.query.username], function (err) { if (err) throw err })
             req.session = req.session
             req.session.username = req.body.username
    		res.render('pages/login')
 		}
		else
        res.render('pages/register',{error: "Error !"})
    })
}
else
    res.render('pages/register',{error: "Error"})