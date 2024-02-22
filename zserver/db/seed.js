const { PrismaClient } = require("@prisma/client");
const { getPrismaClient } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding the database.");
  try {
   


    await prisma.cartItems.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    const product = await prisma.product.create({
      data: {
        productName: "J.K. Dobbins Jersey",
        description: "J.K. Dobbins Official Jersey so good, best jersey",
        size: "Medium",
        price: 55.0,
        quantity: 100,
        image:
          "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const product2 = await prisma.product.create({
      data: {
        productName: "Football",
        description: "Official NFL Football, looks like a jersey but is a football",
        size: "Standard",
        price: 25.0,
        quantity: 50,
        image:
        "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const product3 = await prisma.product.create({
      data: {
        productName: "Odell Beckham Jersey",
        description: "Official NFL Jersey, great stitching",
        size: "Standard",
        price: 232.0,
        quantity: 50,
        image:
        "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const product4 = await prisma.product.create({
      data: {
        productName: "Lamar Jackson Jersey",
        description: "Official NFL Jersey, great stitching",
        size: "Standard",
        price: 290.0,
        quantity: 50,
        image:
        "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const product5 = await prisma.product.create({
      data: {
        productName: "Lamar Jackson Jersey",
        description: "Official NFL Jersey, bad stitching",
        size: "Standard",
        price: 30.0,
        quantity: 50,
        image:
        "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const product6 = await prisma.product.create({
      data: {
        productName: "Lamar Jackson Jersey",
        description: "Official NFL Jersey, bad stitching, used by not lamar jackson",
        size: "Standard",
        price: 9.0,
        quantity: 50,
        image:
        "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });

    const product7 = await prisma.product.create({
      data: {
        productName: "Odell Beckham Socks",
        description: "Looks like jersey, is socks, good socks",
        size: "Standard",
        price: 1000.0,
        quantity: 50,
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
        isAdmin: true,
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