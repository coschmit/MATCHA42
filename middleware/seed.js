function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function chooseimg(gender, i) {

    if (gender == 'Man'){
        if (i % 4 == 0) {
            var img1 = '/img/man_profile/man-profile01.jpg',
                img2 = '/img/man_profile/old_tv.jpg',
                img3 = '/img/man_profile/westminster.jpg',
                img4 = '/img/empty.jpg'
        }
        else if (i % 4 == 1){
            var img1 = '/img/man_profile/man_profile02.jpg',
                img2 = '/img/man_profile/landscape_la_defense.jpg',
                img3 = '/img/man_profile/novotel_challenge.jpg',
                img4 = '/img/man_profile/novotel_challenge02.jpg'
        }
        else if (i % 4 == 2){
            var img1 = '/img/man_profile/man_profile03.jpg',
                img2 = '/img/man_profile/man_la_defense_blue.jpg',
                img3 = '/img/man_profile/gare_de_lyon_road.jpg',
                img4 = '/img/man_profile/roof_sunset.jpg'
        }
        else {
            var img1 = '/img/man_profile/man_profile04.jpg',
            img2 = '/img/man_profile/metro_passy.jpg',
            img3 = '/img/man_profile/metro_passy_long.jpg',
            img4 = '/img/man_profile/eiffel_tower_from_bridge.jpg'
        }
        var array = [img1,img2,img3,img4];
    return array;
    }
    else {
        if (i % 4 == 0) {
            var img1 = '/img/girl_profile/girl_profile.jpg',
                img2 = '/img/girl_profile/girl_sitting.jpg',
                img3 = '/img/girl_profile/nature_girl.jpg',
                img4 = '/img/empty.jpg'
        }
        else if (i % 4 == 1){
            var img1 = '/img/girl_profile/girl_profile02.jpg',
                img2 = '/img/girl_profile/girl_kings_cross_station.jpg',
                img3 = '/img/girl_profile/picadilly_circus.jpg',
                img4 = '/img/empty.jpg'
        }
        else if (i % 4 == 2){
            var img1 = '/img/girl_profile/kylie-jenner01.jpg',
                img2 = '/img/girl_profile/kylie-jenner02.jpg',
                img3 = '/img/girl_profile/kylie-jenner03.png',
                img4 = '/img/girl_profile/kylie-jenner04.jpg'
        }
        else  {
            var img1 = '/img/girl_profile/megan-fox01.jpg',
                img2 = '/img/girl_profile/megan-fox02.jpg',
                img3 = '/img/girl_profile/megan-fox03.jpg',
                img4 = '/img/girl_profile/megan-fox04.jpg'
        }
        var array = [img1,img2,img3,img4];
    return array;
       
    }
    

}


  function makename() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    var possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    for (var i = 0; i < 5; i++)
    {
        if (i == 0)
          text += possible1.charAt(Math.floor(Math.random() * possible.length));
      else
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  function maketag() {
    var text = "";
    var possible = "abcdef";
  
    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  conn.query('SELECT username FROM users where username = ?', ['Random42'], function (err, result) { if (err) throw err;
      if (result.length == 0) {
  
  var i = 0
      password = '$2a$10$fXJ03NwABaEi4HLQhWiGpOhdbpcTEo93DvY0UBAJlbyhpdvPkXnzu' // Fakeuser42
      confirm = 1
      
  while (i < 30) {
      var username = 'Random' + i
          email = 'random' + i + '@gmail.com'
          bio = 'Me signale pas stpppp je suis un fake et je l\'assume'
          score = 5 * getRandomInt(200)
          fakelocation = 'BizounoursLand'
          key = 'Key'+ i
          age = getRandomInt(60) + 18;
          longitude = i % 90
          latitude = i % 90
          quelgenre = getRandomInt(2)
          quelorientation = getRandomInt(3)
          name = makename();
          firstname = makename();
          checklocation = 0;
  
          
      if (quelgenre == 0)
          gender = 'Man'
      else
          gender = 'Woman'
      
      if (quelorientation == 0) {
              orientation = 'Heterosexual'
      }
      else if (quelorientation == 1) {
              orientation = 'Bisexual'
      }
      else {
              orientation = 'Homosexual'
      }
  
      var img1 = chooseimg(gender, i)[0]
      var img2 = chooseimg(gender, i)[1]
      var img3 = chooseimg(gender, i)[2]
      var img4 = chooseimg(gender, i)[3]
      sql = 'INSERT INTO `users` (`username`, `firstname` , `name`, `password`, `email`, `confirmkey`, `confirm`, `gender`,\
       `orientation`, `bio`, `age`, `score`, `fakelocation`, `checklocation`, `img1`, `img2`, `img3`, `img4`, `longitude`, `latitude`)\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      conn.query(sql, [username, firstname, name, password, email, key, confirm, gender, orientation, bio, age,
       score, fakelocation, checklocation, img1, img2, img3, img4, longitude, latitude], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
      sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
      conn.query(sql, [maketag(), i], function (err, result) { if (err) throw err })

      sql = 'INSERT INTO `visits` (user_id, his_id) VALUES (?,?)'
      conn.query(sql, [getRandomInt(600), getRandomInt(600)], function (err, result) { if (err) throw err })
  
      sql = 'INSERT INTO `likes` (user_id, his_id) VALUES (?,?)'
      conn.query(sql, [getRandomInt(600), getRandomInt(600)], function (err, result) { if (err) throw err })
      i++
  } } });
  res.render('pages/index', {req: req})