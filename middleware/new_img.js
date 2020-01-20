newImg()

function updateuser(column, change)
{
    var sql = 'UPDATE users SET ' + column + ' = ? WHERE id = ?'
    conn.query(sql, [change, req.session.profile.id], function (err) { if (err) throw err })
    req.session.profile[column] = change
    tool.getlikes(conn, req.session.profile.id, function (like) {
        tool.getvisits(conn, req.session.profile.id, function (visit) {
            var success = 'Your image was successfully changed';
    res.render('pages/profile',{success: success,profile: req.session.profile, notif: notifs, visit: visit, like: like})})})
}

function newImg(){
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, field, files) { if (err) throw err;
        if (field.img1 !== 'Upload Image' && field.img2 !== 'Upload Image' && field.img3 !== 'Upload Image' && field.img4 !== 'Upload Image')
        {
            console.log('A server error occured');
            return ;
        }
        if (files.file.type !== 'image/png' && files.file.type !== 'image/jpeg' && files.file.type !== 'image/jpg')
        {
            tool.getlikes(conn, req.session.profile.id, function (like) {
                tool.getvisits(conn, req.session.profile.id, function (visit) {
                    var error = 'Only jpeg and png image types aloud';
            res.render('pages/profile',{error: error,profile: req.session.profile, notif: notifs, visit: visit, like: like})})})
            return ;
        }
        if (files.file.size > 5000000)
        {
            tool.getlikes(conn, req.session.profile.id, function (like) {
                tool.getvisits(conn, req.session.profile.id, function (visit) {
                    var error = "Your image is too big !";
            res.render('pages/profile',{error: error,profile: req.session.profile, notif: notifs, visit: visit, like: like})})})
            return ;
        }
        
        var i = 1
        while (i <= 4)
        {
            var tmp = 'img' + i
            if (field[tmp] == 'Upload Image')
                var name = tmp;
            i++;
        }
        var dir =  __dirname + '/public/img/users/' + req.session.profile.id;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var oldpath = files.file.path;
            newpath = dir + '/' + name;
            fs.readFile(oldpath, function (err, data) { if (err) throw err; 
            fs.writeFile(newpath, data, function (err) { if (err) throw err; }); });
            updateuser(name, '/img/users/' + req.session.profile.id + '/' + name);
    })
}