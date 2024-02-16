const express = require("express");
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cartsRouter = express.Router();

// Deny access if user is not logged in
// cartsRouter.use((req, res, next) => {
//   if (!req.user) {
//     return res.status(401).send("You must be logged in to do that.");
//   }
//   next();
// });

// Get all carts
cartsRouter.get("/", async (req, res, next) => {
  try {
    const carts = await prisma.cart.findMany();
    res.send(carts);
  } catch (error) {
    next(error);
  }
});

// Get a cart by id
cartsRouter.get("/:id", async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        id: parseInt(req.params.id),
        // userId: req.user.id,
      },
    });

    if (!cart) {
      return res.status(404).send("Cart not found.");
    }

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Create a new cart
cartsRouter.post("/", async (req, res, next) => {
  try {
    const cart = await prisma.cart.create({
      data: {
        userId: req.body.userId,
        // cartItems,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
      },
    });
    res.status(201).send(cart);
  } catch (error) {
    next(error);
  }
});

// Update a cart
cartsRouter.put("/:id", async (req, res, next) => {
  try {
    const cart = await prisma.cart.update({
      data: {
        userId: req.body.userId,
        // cartItems,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!cart) {
      return res.status(404).send("Cart not found.");
    }

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Delete a cart by id
cartsRouter.delete("/:id", async (req, res, next) => {
  try {
    const cart = await prisma.cart.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!cart) {
      return res.status(404).send("Cart not found.");
    }

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = cartsRouter;