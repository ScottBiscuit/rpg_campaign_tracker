import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import {
  User,
  Review,
  WishlistItem,
  WishlistReview,
  Like,
} from "./src/model.js";
import { Op, Sequelize } from "sequelize";

const app = express();
const port = 8000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extend: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

ViteExpress.config({ printViteDevServerHost: true });

function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

//*********************************START API Endpoints*********************************//

//__________login, logout, register, and user info__________//

//login
app.post("/api/auth", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user && user.password === password) {
      req.session.userId = user.userId;
      console.log(req.session);
  
      res.json({ success: true, userId: req.session.userId });
    } else {
      res.json({ success: false });
    }
  });
  
  //session user
  app.get("/api/auth", async (req, res) => {
    const { userId } = req.session;
    const user = await User.findByPk(userId);
    console.log(user);
    res.json({ user: user });
  });
  
  //view user data
  app.get("/api/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    console.log(user);
    res.json({ user: user });
  });
  
  //logout
  app.post("/api/logout", loginRequired, (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  });
  
  //create new user
  app.post("/api/user", async (req, res) => {
    const { username, email, password } = req.body;
  
    const userEmail = await User.findOne({
      where: { email: email },
    });
  
    const userUsername = await User.findOne({
      where: { username: username },
    });
  
    if (!userEmail && !userUsername) {
      const user = await User.create({
        username: username,
        email: email,
        password: password,
      });
      res.json(user);
    } else if (userEmail) {
      res.json({ error: "Email already in use." });
    } else {
      res.json({ error: "Username already in use." });
    }
  });
  
  //edit user bio
  app.put("/api/user/editBio", async (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    const user = await User.findByPk(userId);
    user.bio = bio || user.bio;
    await user.save();
    res.json({ success: true });
  });
  
  //change password
  app.put("/api/user/editPassword", async (req, res) => {
    const { password, password2, currentPassword } = req.body;
    const { userId } = req.session;
    const user = await User.findByPk(userId);
    if (currentPassword === user.password) {
      if (currentPassword !== password) {
        if (password === password2) {
          user.password = password || user.password;
          await user.save();
          console.log("success");
          res.json({ success: true });
        } else {
          res.json({
            success: false,
            error: "New password doesn't match in both fields",
          });
        }
      } else {
        res.json({
          success: false,
          error:
            "New password is the same as your current password. Please pick a different password.",
        });
      }
    } else {
      res.json({
        success: false,
        error:
          "Password entered doesn't match current password, check your spelling and try again. If you continue to have problems, please contact an administator to reset your password.",
      });
    }
  });

//*********************************END API Endpoints*********************************//

ViteExpress.listen(app, port, () =>
    console.log(`Server is listening on http://localhost:${port}`)
  );
  