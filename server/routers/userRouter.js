const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register the user

router.post("/", async (req, res) => {
    try {
        const { fullName, email, userName, password, passwordVerified } = req.body;
  
        // validation
  
        if (!fullName || !email || !userName || !password || !passwordVerified)
        return res
            .status(400)
            .json({ errorMessage: "Please enter all the required details." });
  
        if (password.length < 8)
        return res.status(400).json({
            errorMessage: "Your Password must contain at least 6 characters.",
        });
  
        if (password !== passwordVerified)
            return res.status(400).json({
                errorMessage: "Your need to enter same password twice.",
        });
  
        const existingUser = await User.findOne({ email });
            if (existingUser)
            return res.status(400).json({
                errorMessage: "This email already have a account. Please log in",
            });
        // const existingUser = await User.findOne({ userName });
        //     if (existingUser)
        //         return res.status(400).json({
        //         errorMessage: "This User Namr already taken. Please choose another",
        //     });
  
        // hash the password
    
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
  
        //   save a new user account to the database
    
        const newUser = new User({
            fullName,
            email,
            userName,
            passwordHash,
        });
  
        const savedUser = await newUser.save();
  
      // sign the token
  
      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SURGE_SSECRE_USER
      );
  
      // send the token in a HTTP-only cookie
  
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send();

    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });

    // USER lOGIN

    router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
  
        //LOGIN VALIDATION
  
        if (!email || !password)
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
  
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Username or Password is incorrect." });
  
        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Username or Password is incorrect." });
  
        // sign the token
  
        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SURGE_SSECRE_USER
        );
  
        // send the token in a HTTP-only cookie
    
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
        .send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
  });
  
    router.get("/logout", (req, res) => {
        res
            .cookie("token", "", {
                httpOnly: true,
                expires: new Date(0),
                secure: true,
                sameSite: "none",
            })
            .send();
    });
  
    router.get("/loggedIn", (req, res) => {
        try {
            const token = req.cookies.token;
                if (!token) return res.json(false);
        
                jwt.verify(token, process.env.JWT_SURGE_SSECRE_USER);
        
                res.send(true);
        } catch (err) {
            res.json(false);
        }
    });

    

module.exports = router;