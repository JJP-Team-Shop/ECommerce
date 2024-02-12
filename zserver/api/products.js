const express = require("express");
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const productsRouter = express.Router();

// Deny access if product is not logged in
productsRouter.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// Get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        productId: req.product.id,
      },
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Get a product by id
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(req.params.id),
        productId: req.product.id,
      },
    });

    if (!product) {
      return res.status(404).send("product not found.");
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});


// model product {
//     id          Int         @id @default(autoincrement())
//     productName String
//     description String
//     size        String
//     price       Float
//     quantity    Int
//     image       String
//     cartItems   cartItems[]
//   }
// Create a new product
productsRouter.post("/", async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        productName: req.body.productName,
        description: req.body.description,
        size:        req.body.size,
        price:       req.body.price,
        quantity:    req.body.price,
        img:         req.body.img,

      },
    });
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

// Update a product
productRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      data: {
          productName: req.body.productName,
        description: req.body.description,
        size:        req.body.size,
        price:       req.body.price,
        quantity:    req.body.price,
        img:         req.body.img,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!product) {
      return res.status(404).send("product not found.");
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Delete a user by id
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!product) {
      return res.status(404).send("product not found.");
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;