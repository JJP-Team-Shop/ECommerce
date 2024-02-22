const express = require("express");
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cartItemsRouter = express.Router();

// Deny access if user is not logged in
// usersRouter.use((req, res, next) => {
//   if (!req.user) {
//     return res.status(401).send("You must be logged in to do that.");
//   }
//   next();
// });

// Get all cartItems
cartItemsRouter.get("/", async (req, res, next) => {
  
  try {
    const cartItems = await prisma.cartItems.findMany({
      include: { product: true },
    });
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

// Get cartItems by id
cartItemsRouter.get("/:id", async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItems.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        product: true,
      },
    });

    if (!cartItems) {
      return res.status(404).send("CartItem not found.");
    }

    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

// Create a new Cart Item
cartItemsRouter.post("/", async (req, res, next) => {
  try {
    const { productId, quantity, cartId, userId } = req.body;
    const cartItems = await prisma.cartItems.create({
      data: {
        productId,
        quantity,
        cartId,
        userId,
      },
    });
    res.status(201).send(cartItems);
  } catch (error) {
    next(error);
  }
});

// Update a Cart Item
cartItemsRouter.put("/:id", async (req, res, next) => {
  try {
    const cartItemUpdate = await prisma.cartItems.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        productId: req.body.productId, // This might not be necessary for an update unless changing the product
        quantity: req.body.quantity,
      },
    });

    if (!cartItemUpdate) {
      return res.status(404).send("Cart Items not found.");
    }

    res.send(cartItemUpdate);
  } catch (error) {
    next(error);
  }
});

// Delete a cart item by id
cartItemsRouter.delete("/:id", async (req, res, next) => {
  try {
    const cartItemId = parseInt(req.params.id);
    const deletedCartItem = await prisma.cartItems.delete({
      where: {
        id: cartItemId,
      },
    });

    if (!deletedCartItem) {
      return res.status(404).send("Cart Items not found.");
    }

    res.send({ message: "Cart item deleted successfully", deletedCartItem });
  } catch (error) {
    next(error);
  }
});

module.exports = cartItemsRouter;
