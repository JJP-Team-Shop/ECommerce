const express = require("express");
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cartsRouter = express.Router();

// Get all carts
cartsRouter.get("/", async (req, res, next) => {
  const userId = req.userId; // Extracted from the authentication token
  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId: userId, // Fetch only carts belonging to the logged-in user
      },
      include: {
        cartItems: true, // Optionally include related cart items
      },
    });
    res.json(carts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching carts", error: error.message });
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