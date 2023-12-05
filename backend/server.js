import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"], // front end url
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pa$$w0rd2094",
  database: "sys",
});

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ Message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ Message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};


app.post("/login", async (req, res) => {
  const sqlQuery = "SELECT * FROM sys.userdata WHERE userMail = ?";
  db.query(sqlQuery, [req.body.userMail], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Server Side error" });
    }

    if (data.length > 0) {
      const hashedPassword = data[0].userPassword;
      const passwordMatch = await bcrypt.compare(
        req.body.userPassword,
        hashedPassword
      );

      if (passwordMatch) {
        const { userName, userSurname, userMail } = data[0];
        const token = jwt.sign(
          { userName, userSurname, userMail },
          JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token);
        console.log("Data response:", data);
        return res.json({ Message: "Success", token: token });
      } else {
        console.log("Incorrect password");
        return res.json({ Message: "Bilgilerinizi Kontrol Ediniz" });
      }
    } else {
      console.log("No matching record found. Data:", data);
      return res.json({ Message: "Bilgilerinizi Kontrol Ediniz" });
    }
  });
});


app.post("/signup", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.userPassword, 10);
    const sqlQuery =
      "INSERT INTO sys.userdata (userName, userSurname, userMail, userPassword) VALUES (?, ?, ?, ?)";
    db.query(
      sqlQuery,
      [req.body.userName, req.body.userSurname, req.body.userMail, hash],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ Message: "Server Side error" });
        }
        console.log("inserted data", data);
        return res.json({ Message: "Success" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.json({ Message: "Error hashing password" });
  }
});



app.listen(8081, () => console.log("listening"));
