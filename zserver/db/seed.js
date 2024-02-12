const { PrismaClient } = require("@prisma/client");
const { getPrismaClient } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding the database.");
  try {
    // Clear the database.
  
    await prisma.cartItems.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    
    const product = await prisma.product.create({
      data: {
        productName: "Jersey",
        description: "J.K. Dobbins",
        size: "Medium",
        price: 55.0,
        quantity: 100,
        image:
          "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const cart = await prisma.cart.create({
      data: {
        userId: null,
        status: "active",
        
        totalAmount: 0, //add sum function to add total of cart items
      },
    });

    const cartItem = await prisma.cartItems.create({
      data: {
        product: {
          connect: {
            id: product.id,
          },
        },
        quantity: 1,
        cart: {
          connect: {
            id: cart.id,
          },
        },
      },
    });

    const user = await prisma.user.create({
      data: {
        email: "bob@gmail.com",
        password: "password",
        firstName: "Bob",
        lastName: "Job",
        address: "123 s street",
        cartItems: {
          connect: {
            id: cartItem.id,
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
        isAdmin: false,
      },
    });

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;