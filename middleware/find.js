function userprofilevalidate(result) {
    var i = 0;
    while (result[i]) {
        if (result[i].confirm !== 1)
            result[i].valid = 0;
        else if (!result[i].gender || !result[i].bio || result[i].img1 == 'img/empty.jpg' || result[i].age <= 0 || !result[i].orientation)
            result[i].valid = 0;
        else
            result[i].valid = 1;
        i++;
    }
    result = result.filter(function (val, a, result) { return (val.valid == 1) })
    return (result);
}

function profilevalidate(req, res, profile) {

    if (profile.confirm !== 1 && (profile.api == null || profile.api == 1) )
    {
        res.render('pages/login', {req: req, error: 'Please confirm your accont by email'})
        return false
    }

    if (!profile.gender || !profile.bio || !profile.orientation || profile.age <= 0 || profile.img1 == 'img/empty.jpg') {
        res.render('pages/profile', { notif: notifs, error: 'Please complete your profile before choosing your peer', profile: profile, like: 'none', visit: 'none' })
        return false
    }
    else
        return true
}
function    blocked(result, myid, callback)
{
    conn.query('SELECT * FROM `block` WHERE user_id = ?', [myid], function(err, block) { if (err) throw err;
        var i = 0;
        if (block.length > 0)
        {
            while (block[i])
            {
                result = result.filter(function(val, a, result){return (val.id != block[i].his_id)})
                i++;
            }
        }
        return callback(result)
    })
}
function finder(gender, orientation1, orientation2, myid, callback) {
    sql = 'SELECT * FROM users WHERE orientation = ? AND gender = ? AND id <> ?';
    vars = [orientation1, gender, myid]
    conn.query(sql, vars, function (err, result) {
        if (err) throw err
        sql = 'SELECT * FROM users WHERE orientation = ? AND gender = ? AND id <> ?';
        vars = [orientation2, gender, myid]
        conn.query(sql, vars, function (err, result2) {
            if (err) throw err
            result = result.concat(result2)
            blocked(result, myid, function(result){ return callback(result); });
        })
    })
}

function orientation(orientation, gender, callback) {
    if (orientation == "Heterosexual") {
        if (gender == "Man"){
            finder('Woman', 'Heterosexual', 'Bisexual', req.session.profile.id, function (result) { return callback(result) })
        }
        else if (gender == "Woman"){
            finder('Man', 'Heterosexual', 'Bisexual', req.session.profile.id, function (result) { return callback(result) })}
    }

    else if (orientation == 'Bisexual') {
        if (gender == 'Man') {
            finder('Man', 'Homosexual', 'Bisexual', req.session.profile.id, function (result1) {
                finder('Woman', 'Heterosexual', 'Bisexual', req.session.profile.id, function (result2) {
                    result = result1.concat(result2)
                    return callback(result);
                })
            })
        }
        else if (gender == 'Woman') {
            finder('Woman', 'Homosexual', 'Bisexual', req.session.profile.id, function (result1) {
                finder('Man', 'Heterosexual', 'Bisexual', req.session.profile.id, function (result2) {
                    result = result1.concat(result2)
                    return callback(result);
                })
            })
        }
    }

    else if (orientation == 'Homosexual') {
        if (gender == 'Man') {
            finder('Man', 'Homosexual', 'Bisexual', req.session.profile.id, function (result) { return callback(result); })
        }
        else if (gender == 'Woman') {
            finder('Woman', 'Homosexual', 'Bisexual', req.session.profile.id, function (result) { return callback(result); })
        }
    }
}

function descendingtags(first, second) {
    if (first.scoretag == second.scoretag)
        return 0;
    if (first.scoretag > second.scoretag)
        return -1;
    else
        return 1;
}
function ascendingdist(first, second) {
    if (first.distance == second.distance)
        return 0;
    if (first.distance < second.distance)
        return -1;
    else
        return 1;
}
function ascendingscore(first, second) {
    if (first.score == second.score)
        return 0;
    if (first.score > second.score)
        return -1;
    else
        return 1;
}

function tritags(profile, result) {
    i = 0
    while (result[i]) {
        result[i].scoretag = 0
        var a = 0;
        while (profile.tag[a]) {
            var e = 0;
            while (result[i].tags[e]) {
                if (result[i].tags[e].tag == profile.tag[a].tag)
                    result[i].scoretag++;
                e++;
            }
            a++;
        }
        i++;
    }
    result = result.sort(descendingtags)

    return (result);
}

function settags(result, callback) {
    conn.query('SELECT * FROM tags', function (err, tag) {
        if (err) throw err;
        var i = 0;
        tags = new Array();
        while (result[i]) {
            var onetag = tag.filter(function (val, a, tag) { return (val.user_id == result[i].id) })
            result[i].tags = onetag
            i++;
        }
        return (callback(result))
    })
}

function triage(first, second)
{
    if (first.age == second.age)
        return 0;
    if (first.age < second.age)
        return -1;
    else
        return 1; 
}


function sortdistance(result) {
    var mypoint = new geopoint(req.session.profile.latitude, req.session.profile.longitude)
    i = 0;
    while (result[i]) {
        point2 = new geopoint(result[i].latitude, result[i].longitude)
        result[i].distance = parseInt(mypoint.distanceTo(point2, true), 10)

        i++;
    }
    return (result.sort(ascendingdist))

}

if (req.session.profile == undefined)
    res.redirect('/')

else if (profilevalidate(req, res, req.session.profile) == false) {
    console.log("bop")
}



else {

    orientation(req.session.profile.orientation, req.session.profile.gender, function (result1) {


        result1 = userprofilevalidate(result1)
        settags(result1, function (result) {
            tritags(req.session.profile, result)
            sortdistance(result)

            if (req.body.agemax) {
                if (!isNaN(req.body.agemax)) {
                    result = result.filter(function (val, i, result) {
                        return (val.age <= req.body.agemax);
                    })
                };
            }
            if (req.body.agemin) {
                if (!isNaN(req.body.agemin)) {
                    result = result.filter(function (val, i, result) {
                        return (val.age >= req.body.agemin);
                    })
                };
            }
            if (req.body.tri == "Age"){
                result = result.sort(triage)
            }
            else if (req.body.tri == "Location"){
                console.log("It is");
            }
            else if (req.body.tri == "Score"){
                result = result.sort(ascendingscore)
            }
            else if (req.body.tri == "Tags"){
            tritags(req.session.profile, result)
            }
            if (req.body.scoremin) {
                if (!isNaN(req.body.scoremin)) {
                    result = result.filter(function (val, i, result) {
                        return (val.score >= req.body.scoremin);
                    })
                };
            }
            if (req.body.scoremax) {
                if (!isNaN(req.body.scoremax)) {
                    result = result.filter(function (val, i, result) {
                        return (val.score <= req.body.scoremax);
                    })
                };
            }
            if (req.body.distance) {
                if (!isNaN(req.body.distance)) {
                    result = result.filter(function (val, i, result) {
                        return (val.distance <= req.body.distance);
                    })
                };
                console.log(result)

            }
            if (req.body.tags) {
                console.log("Check poulette")
                var tags = eschtml(req.body.tags)


                tabtags = tags.split(";")
                result = result.filter(function (val, i, result) {
                    var nbtagmatch = 0
                    j = 0
                    while (tabtags[j]) {
                        var e = 0
                        while (val.tags[e]) {
                            if (tabtags[j] == val.tags[e].tag)
                                nbtagmatch++
                            e++
                        }
                        j++
                    }
                    if (nbtagmatch >= j)
                        return (true)
                    else
                        return (false)
                });
            }

            res.render('pages/find', { geopoint: geopoint, profile: req.session.profile, peer: result, notif: notifs })
        })
    })
}

