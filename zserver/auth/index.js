const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const axios = require("axios");

// Register a new admin account
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, address, isAdmin } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        address,
        isAdmin
    },
    });

    // Create a token with the user id
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(201).send( "new  account created" );
  } catch (error) {
    next(error);
  }
});

// Login to an existing user account
router.post("/login", async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,  
      },
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid login credentials.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
