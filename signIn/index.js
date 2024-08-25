import db from "../db-connection/connection.js";
import hashPwd from "../hashPassword/index.js";

const SignIn = async (req, res) => {
  const { username, password } = req.body;
  const hashPswd = await hashPwd(password)
  
  const sql = `insert into user (username, password)
                values
              (?, ?)`

  db.query(sql, [username, hashPswd], (err, result) => {
    if (err) throw err
  })
  // Kirim respons ke klien
  res.status(200).json(
    { 
      message: "Data received successfully",
      data: {
        username,
        password,
        hashPswd
      }
    }
  );
}

export default SignIn