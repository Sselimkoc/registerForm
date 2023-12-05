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
    origin: ["http://localhost:5173"], // Frontend URL
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

// Token doğrulama middleware'i
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

// Kullanıcı girişi işlemini gerçekleştiren endpoint
app.post("/login", async (req, res) => {
  const sqlQuery = "SELECT * FROM sys.userdata WHERE uMail = ?";
  db.query(sqlQuery, [req.body.email], async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server error during login." });
    }

    if (data.length > 0) {
      try {
        const hashedPassword = data[0].uPassword;
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          hashedPassword
        );

        if (passwordMatch) {
          const { uFullname, uMail } = data[0];
          const token = jwt.sign({ uFullname, uMail }, JWT_SECRET, {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          console.log("Data response:", data);
          return res.json({ Message: "SuccessLog", token: token });
        } else {
          console.log("Incorrect password");
          return res.status(401).json({ Message: "Incorrect password." });
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        return res.status(500).json({ Message: "Server error during login." });
      }
    } else {
      console.log("No matching record found. Data:", data);
      return res.status(404).json({ Message: "User not found." });
    }
  });
});

// Yeni kullanıcı kaydını gerçekleştiren endpoint
app.post("/signup", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const sqlQuery =
      "INSERT INTO sys.userdata (uFullname, uMail, uPassword) VALUES (?, ?, ?)";

    db.query(
      sqlQuery,
      [req.body.fullName, req.body.email, hash],
      (err, data) => {
        if (err) {
          console.error(err);

          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ Message: "This email address is already registered." });
          } else {
            return res
              .status(500)
              .json({ Message: "Server Side error during signup." });
          }
        }

        console.log("Inserted data:", data);
        return res.json({ Message: "SuccessSign" });
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    return res
      .status(500)
      .json({ Message: "Server Side error during signup." });
  }
});



// Korumalı bir route ekleyebiilirsiniz, sadece token ile erişilebilir
// app.get("/protected", verifyToken, (req, res) => {
//   res.json({ Message: "This is a protected route", user: req.user });
// });

// Uygulama belirtilen port üzerinden dinleniyor
app.listen(5174, () => console.log("listening"));
