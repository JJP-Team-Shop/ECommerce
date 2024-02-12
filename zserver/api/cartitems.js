const express = require("express");
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const usersRouter = express.Router();

// Deny access if user is not logged in
usersRouter.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// Get all users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// Get a user by id
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.id),
        userid: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Create a new user
usersRouter.post("/", async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

// Update a user
usersRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      data: {
        name: req.body.username,
        password: req.body.password,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Delete a user by id
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;