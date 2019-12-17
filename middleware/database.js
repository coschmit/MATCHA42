conn.query('CREATE DATABASE IF NOT EXISTS `matcha`', function (err) { if (err) throw err })
conn.query('USE `matcha`', function (err) { if (err) throw err })
var users = `CREATE TABLE IF NOT EXISTS users ( \
    id INT AUTO_INCREMENT PRIMARY KEY, \
    username VARCHAR(255), \
    name VARCHAR(255), \
    email VARCHAR(255), \
    password VARCHAR(255), \
    confirmkey VARCHAR(10), \
    confirm INT DEFAULT 0, \
    gender VARCHAR(255), \
    age INT DEFAULT 0, \
    bio TEXT, \
    score INT DEFAULT 0 ,\
    longitude DOUBLE, \
    latitude DOUBLE, \
    location TEXT, \
    orientation VARCHAR(255), \
    checklocation INT DEFAULT 1,\
    active DATETIME,\
    fakelocation TEXT, \ 
    img1 VARCHAR(255) DEFAULT '/img/empty.jpg', \
    img2 VARCHAR(255) DEFAULT '/img/empty.jpg', \
    img3 VARCHAR(255) DEFAULT '/img/empty.jpg', \
    img4 VARCHAR(255) DEFAULT '/img/empty.jpg')`
conn.query(users, function (err, res) { if (err) throw err })


var tags = `CREATE TABLE IF NOT EXISTS tags ( \
    id INT AUTO_INCREMENT PRIMARY KEY, \
    user_id INT, \
    tag VARCHAR(255))`
conn.query(tags, function (err) { if (err) throw err }) 

var likes = `CREATE TABLE IF NOT EXISTS likes (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    user_id INT NOT NULL, \ 
    his_id INT NOT NULL)`
conn.query(likes, function (err) { if (err) throw err }) 

var chat = `CREATE TABLE IF NOT EXISTS chat (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    message TEXT, \
    user_id INT NOT NULL, \ 
    his_id INT NOT NULL, \
    date DATETIME DEFAULT CURRENT_TIMESTAMP)`
conn.query(chat, function (err) { if (err) throw err })

var notifs = `CREATE TABLE IF NOT EXISTS notifs (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    user_id INT NOT NULL, \ 
    his_id INT NOT NULL, \
    notif TEXT, \
    seen INT NOT NULL DEFAULT 0, \
    date DATETIME DEFAULT CURRENT_TIMESTAMP)
`
 conn.query(notifs, function (err) { if (err) throw err })

 var visits = `CREATE TABLE IF NOT EXISTS visits (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    user_id INT NOT NULL, \ 
    his_id INT NOT NULL, \
    date DATETIME DEFAULT CURRENT_TIMESTAMP)`
 conn.query(visits, function (err) { if (err) throw err })

 var block = `CREATE TABLE IF NOT EXISTS block (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    user_id INT NOT NULL, \ 
    his_id INT NOT NULL)`
conn.query(block, function (err) { if (err) throw err }) 

var report = `CREATE TABLE IF NOT EXISTS report (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    user_id INT NOT NULL, \ 
    his_id INT NOT NULL)`
conn.query(report, function (err) { if (err) throw err }) 