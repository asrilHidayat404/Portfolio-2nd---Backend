import mysql from "mysql"

const db = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12736476',
    password: '1ydvNYs33K',
    database: 'sql12736476'
})

db.connect( (err) => {
  if (err) throw err;
  console.log("Connected!");
});

export default db

