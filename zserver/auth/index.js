const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const axios = require("axios");

// const cartsRouter = require("./cartsRouter");

// router.use("/api/carts", cartsRouter);

// async function createCart({user}) {
//   try {
//     const cartData = {
//       userId: user.id,
//       status: "active",
//       totalAmount: 0.0,
//     };

//     // Make a POST request to create a new cart
//     const response = await axios.post("/api/carts", cartData);

//     // Return the created cart
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// Register a new account
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

    // const cart = await axios.post("/api/carts", cart.data);({
    //   data: {
    //     userId: user.id,
    //     status: "active",
    //     totalAmount: 0.0,
    //   },
    // });

    const userWithId = { ...user, userId: user.id };
    
    console.log("New user created:", userWithId);
   

    res.status(201).json({ user: userWithId }); 
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
        id: req.user?.id || undefined,
        email: req.user?.email,
      },
    });
   
    res.send(user);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
