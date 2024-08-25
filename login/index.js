// import cleanRowDataPacket from "../cleanRDP/index.js"
// import db from "../db-connection/connection.js"
// import bcrypt from "bcrypt"

// const Login = (req, res) => {
//     const { username, password } = req.body
//     console.log(username, password)
//     const sql = "select * from user where username = ? and password = ?"
//     db.query(sql, [username, password], async (err, result) => {
//       const data = await cleanRowDataPacket(result)
//       const compareResults = result.map(row => {
//         return {
//           username: row.username,
//           isPasswordMatch: bcrypt.compareSync(password, row.password)

//         };
//       });
//         return res.status("Hasil: " + JSON.stringify(compareResults))
//     })
// }

// export default Login

import cleanRowDataPacket from "../cleanRDP/index.js";
import db from "../db-connection/connection.js";
import bcrypt from "bcrypt";

const Login = (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM user WHERE username = ?";
    
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("Error fetching user from database:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
        if (result.length === 0) {
            console.log("User not found");
            return res.status(404).json(
                { 
                    status: false,
                    message: "Invalid username or password"
                }
            );
        }

        const user = result[0];
        const isPasswordMatch = bcrypt.compareSync(password, user.password);

        if (isPasswordMatch) {
            const cleanedData = cleanRowDataPacket(user);
            console.log("Login successful");
            return res.status(200).json(
                { 
                    status: true,
                    username: username,
                    message: "Login successful",
                }
            );
        } else {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Incorrect password" });
        }
    });
};

export default Login;
