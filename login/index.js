import { use } from "bcrypt/promises.js";
import cleanRowDataPacket from "../cleanRDP/index.js";
import db from "../db-connection/connection.js";
import bcrypt from "bcrypt";

const Login = (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    
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
        // ambil semua hasil query
        const user = result;
        // bandingkan semua password dengan input password
        const userPassword = user.map(user => bcrypt.compareSync(password, user.password));
        // pilih password yang cocok/true
        const isPasswordMatch = userPassword.find(userPassword => userPassword)

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
