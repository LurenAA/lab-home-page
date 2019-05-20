let mysql = require('mysql')
let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: "lab"
})

if(pool.better_query === undefined && pool.better_getConnection === undefined) {
  pool.better_query =function (connection ,sen) {
    if(!sen) {
      sen = connection
      connection = pool
    }
    return new Promise(function (resolve, reject) {
      connection.query(sen, function (error, results, fields){
        connection !== pool && connection.release()
        if(error) return reject(error)
        return resolve(results)
      })
    })
  }

  pool.better_getConnection = function () {
    return new Promise(function (resolve, reject) {
      pool.getConnection(function (error, connection){
        if(error){
          return reject(error)
        }
        return resolve(connection)
      })
    })
  }
}

module.exports = pool